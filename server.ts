import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Check SMTP connection configuration
app.get('/api/smtp-status', async (req, res) => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || 'ekjotkaur570@gmail.com';

  const isConfigured = !!(host && port && user && pass);

  res.json({
    configured: isConfigured,
    smtpUser: user ? `${user.substring(0, 3)}***@${user.split('@')[1] || 'domain'}` : null,
    adminEmail,
    host,
    port,
  });
});

// API: Send bulk order/query notification to Admin
app.post('/api/notify-admin', async (req, res) => {
  const { id, name, email, phone, subject, message, productName, quantity, createdAt } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required order details' });
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || 'ekjotkaur570@gmail.com';

  const isConfigured = !!(host && port && user && pass);

  if (!isConfigured) {
    console.warn('⚠️ [Nodemailer] SMTP settings are incomplete. Notification logged to console instead:');
    console.log(`[Order Alert] ID: ${id || 'N/A'} | Client: ${name} (${email}) | Subject: ${subject}`);
    return res.json({ 
      success: false, 
      error: 'SMTP credentials not configured. Notification recorded locally.',
      loggedToConsole: true
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || '587'),
      secure: port === '465', // Use SSL for port 465
      auth: {
        user,
        pass,
      },
    });

    const isSpecificItem = !!productName;
    const formattedDate = new Date(createdAt || new Date()).toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // Elegant professional email layout
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #edf2f7;">
          <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.025em;">Sidak Steel</h1>
          <p style="font-size: 14px; font-weight: 600; color: #4f46e5; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.05em;">New Wholesale Order Alert</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 24px 0;">
          <p style="font-size: 16px; line-height: 1.5; color: #334155; margin-top: 0;">
            Hi Admin,
          </p>
          <p style="font-size: 15px; line-height: 1.5; color: #334155;">
            A new wholesale inquiry and potential bulk order has been placed by a client on the Sidak Steel portal. Here are the full specifications:
          </p>

          <!-- Core Order Details Card -->
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0; font-size: 14px; color: #1e293b;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
              <strong style="color: #64748b;">Order / Query ID:</strong>
              <span style="font-family: monospace; font-weight: 700; color: #0f172a;">${id || 'N/A'}</span>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 2px;">Customer Name:</strong>
              <span style="font-size: 15px; font-weight: 700; color: #0f172a;">${name}</span>
            </div>

            <div style="margin-bottom: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 2px;">Email Address:</strong>
              <a href="mailto:${email}" style="color: #4f46e5; font-weight: 600; text-decoration: none;">${email}</a>
            </div>

            ${phone ? `
            <div style="margin-bottom: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 2px;">Phone Number:</strong>
              <a href="tel:${phone}" style="color: #0f172a; font-weight: 600; text-decoration: none;">${phone}</a>
            </div>
            ` : ''}

            <div style="margin-bottom: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 2px;">Received Date:</strong>
              <span style="font-weight: 500; color: #334155;">${formattedDate}</span>
            </div>

            <div style="margin-bottom: 12px; border-top: 1px solid #e2e8f0; pt: 12px; margin-top: 12px;">
              <strong style="color: #64748b; display: block; margin-bottom: 4px;">Subject:</strong>
              <span style="font-weight: 700; color: #0f172a; font-size: 15px;">${subject}</span>
            </div>

            ${isSpecificItem ? `
            <div style="margin-top: 16px; padding: 12px; background-color: #0f172a; border-radius: 8px; color: #ffffff;">
              <strong style="color: #93c5fd; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Requested Utensil Item</strong>
              <span style="font-size: 15px; font-weight: 800; display: block;">${productName}</span>
              ${quantity ? `<span style="font-size: 13px; font-weight: 600; color: #cbd5e1; display: block; margin-top: 4px;">Quantity: ${quantity} Units</span>` : ''}
            </div>
            ` : ''}
          </div>

          <!-- Customer Message -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">Client Message & Requirements:</h3>
            <div style="font-size: 14px; line-height: 1.6; color: #334155; padding: 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin-top: 32px;">
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/orders" style="display: inline-block; padding: 14px 28px; background-color: #0f172a; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              Manage Order on Dashboard
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 24px; border-top: 1px solid #edf2f7; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 4px 0;">This email was automatically generated by the Sidak Steel Wholesale Portal.</p>
          <p style="margin: 0;">Sidak Steel Utensils Supplier Corporation © 2026</p>
        </div>
      </div>
    `;

    const textContent = `
      Sidak Steel - New Wholesale Order Alert!
      
      Hi Admin,
      A new wholesale order/query has been placed by a client on the portal:
      
      Order ID: ${id || 'N/A'}
      Customer Name: ${name}
      Email Address: ${email}
      Phone Number: ${phone || 'N/A'}
      Date: ${formattedDate}
      
      Subject: ${subject}
      ${isSpecificItem ? `Requested Item: ${productName} (Quantity: ${quantity || 'N/A'})` : ''}
      
      Client Message:
      ${message}
      
      Please review and manage this request in your Orders Dashboard.
    `;

    const info = await transporter.sendMail({
      from: `"Sidak Steel Alerts" <${user}>`,
      to: adminEmail,
      subject: `🚨 [New Order] ${subject} from ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('✅ [Nodemailer] Notification email sent successfully:', info.messageId);
    return res.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('❌ [Nodemailer] Failed to send email:', error);
    return res.status(500).json({ success: false, error: error.message || 'SMTP sending failed' });
  }
});

// Setup Vite development server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('⚡ [Server] Running in DEVELOPMENT with active Vite middleware');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('📦 [Server] Running in PRODUCTION serving static build');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Server] Active and listening on port ${PORT}`);
  });
}

startServer();
