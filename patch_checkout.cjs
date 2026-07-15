const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutPage.tsx', 'utf8');

const target = `      // Fire email and sheet updates in background without blocking UI
      Promise.allSettled([emailPromise, sheetPromise]).then(() => {
         console.log("Background order notifications completed.");
      });

      // Track purchase event with GA
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: currentOrderId,
          value: total,
          currency: 'VND',
          items: sanitizedCart.map((item: any) => ({
            item_id: item.product.id,
            item_name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          }))
        });
      }

      // Process inventory (skip for test email hoangphucunknown@gmail.com)
      if (formData.email?.toLowerCase() !== 'hoangphucunknown@gmail.com') {
        try {
          processOrderInventory(sanitizedCart, currentOrderId);
        } catch (err) {
          console.error("Failed to process inventory:", err);
        }
      }`;

const replacement = `      // Fire email and sheet updates in background without blocking UI
      Promise.allSettled([emailPromise, sheetPromise]).then(() => {
         console.log("Background order notifications completed.");
         if (formData.email?.toLowerCase() !== 'hoangphucunknown@gmail.com') {
           fetchInventoryFromFirestore().catch(console.error);
         }
      });

      // Track purchase event with GA
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: currentOrderId,
          value: total,
          currency: 'VND',
          items: sanitizedCart.map((item: any) => ({
            item_id: item.product.id,
            item_name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          }))
        });
      }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/CheckoutPage.tsx', code);
