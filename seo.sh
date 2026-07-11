#!/bin/bash
for file in src/pages/About.tsx src/pages/Products.tsx src/pages/Blog.tsx src/pages/Contact.tsx; do
  path=$(basename "$file" .tsx | tr '[:upper:]' '[:lower:]')
  if [ "$path" = "home" ]; then
    path=""
  fi
  
  # Insert canonical logic before the cleanup return statement
  sed -i "/return () => {/i \\
    let canonical = document.querySelector('link[rel=\"canonical\"]');\\
    if (canonical) {\\
      canonical.setAttribute('href', window.location.origin + '/$path');\\
    } else {\\
      canonical = document.createElement('link');\\
      canonical.setAttribute('rel', 'canonical');\\
      canonical.setAttribute('href', window.location.origin + '/$path');\\
      document.head.appendChild(canonical);\\
    }\\
" "$file"

  # Insert canonical reset logic in the cleanup function
  sed -i "/};/i \\
        let canonicalDesc = document.querySelector('link[rel=\"canonical\"]');\\
        if (canonicalDesc) {\\
            canonicalDesc.setAttribute('href', window.location.origin + '/');\\
        }\\
" "$file"
done
