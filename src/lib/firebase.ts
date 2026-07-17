import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productName?: string;
  quantity?: number;
  createdAt: string;
  status: 'Pending' | 'Processed' | 'Shipped' | 'Cancelled';
}

const metaEnv = (import.meta as any).env || {};

// Check if Firebase configuration environment variables are present
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: metaEnv.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let db: any = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log('Firebase initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase SDK:', error);
  }
} else {
  console.log('Firebase credentials not detected. Falling back to local Storage for order database.');
}

/**
 * Returns whether real Firebase database is active.
 */
export function isFirebaseActive(): boolean {
  return db !== null;
}

/**
 * Save an order to Firestore or LocalStorage.
 */
export async function saveOrder(orderInput: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productName?: string;
  quantity?: number;
}): Promise<{ id: string; isLocal: boolean }> {
  const newOrder: Omit<Order, 'id'> = {
    ...orderInput,
    createdAt: new Date().toISOString(),
    status: 'Pending',
  };

  let finalId = '';
  let isLocal = true;

  if (db) {
    try {
      const ordersCol = collection(db, 'orders');
      const docRef = await addDoc(ordersCol, newOrder);
      finalId = docRef.id;
      isLocal = false;
    } catch (err) {
      console.error('Failed to save order to Firebase, falling back to LocalStorage:', err);
    }
  }

  if (isLocal) {
    // Fallback to LocalStorage
    const localOrders = getLocalOrders();
    finalId = 'local_' + Math.random().toString(36).substr(2, 9);
    const orderWithId: Order = { ...newOrder, id: finalId };
    localOrders.unshift(orderWithId);
    localStorage.setItem('sidak_steel_orders', JSON.stringify(localOrders));
  }

  // Trigger email notification to the Admin in background
  try {
    fetch('/api/notify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: finalId,
        ...newOrder,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (data.success) {
        console.log('Admin notified via email successfully');
      } else {
        console.warn('Admin email notification status:', data.error || 'Config pending');
      }
    }).catch(err => {
      console.error('Failed to trigger admin email notification:', err);
    });
  } catch (err) {
    console.error('Error triggering email notifier:', err);
  }

  return { id: finalId, isLocal };
}

/**
 * Retrieve all orders from Firestore or LocalStorage.
 */
export async function getOrders(): Promise<Order[]> {
  if (db) {
    try {
      const ordersCol = collection(db, 'orders');
      // For standard query, we might not have index built for orderBy, so simple get is safer
      const snapshot = await getDocs(ordersCol);
      const orders: Order[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        orders.push({
          id: docSnap.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          productName: data.productName,
          quantity: data.quantity,
          createdAt: data.createdAt || new Date().toISOString(),
          status: data.status || 'Pending',
        });
      });
      // Sort in memory to be reliable
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.error('Failed to fetch orders from Firebase, reading LocalStorage:', err);
    }
  }

  return getLocalOrders();
}

/**
 * Update an order's status in Firestore or LocalStorage.
 */
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
  if (db && !orderId.startsWith('local_')) {
    try {
      const orderDocRef = doc(db, 'orders', orderId);
      await updateDoc(orderDocRef, { status });
      return true;
    } catch (err) {
      console.error('Failed to update order status in Firebase:', err);
    }
  }

  // Update in local storage
  const localOrders = getLocalOrders();
  const orderIdx = localOrders.findIndex((o) => o.id === orderId);
  if (orderIdx > -1) {
    localOrders[orderIdx].status = status;
    localStorage.setItem('sidak_steel_orders', JSON.stringify(localOrders));
    return true;
  }
  return false;
}

// Helper to get local storage orders
function getLocalOrders(): Order[] {
  const stored = localStorage.getItem('sidak_steel_orders');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
}
