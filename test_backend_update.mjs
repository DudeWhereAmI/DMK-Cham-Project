fetch('http://localhost:3000/api/record-preorder-sheet', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: "TEST_ORDER_123",
    items: [
      {
        quantity: 1,
        product: { category: "combo" },
        customization: { comboId: "mirror_combo", element: "KIM", partnerElement: "MOC" }
      }
    ]
  })
}).then(res => res.json()).then(console.log).catch(console.error);
