fetch('http://localhost:3000/api/record-preorder-sheet', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: "TEST_ORDER_123",
    userId: "guest",
    customerInfo: { name: "Test User", phone: "123", email: "test@test.com", address: "123 test st", province: "Test Prov", district: "Test Dist", ward: "Test Ward" },
    items: [
      {
        quantity: 1,
        product: { category: "combo" },
        customization: { comboId: "mirror_combo", element: "KIM", partnerElement: "MOC" }
      }
    ],
    subtotal: 100000,
    packagingFee: 0,
    total: 100000,
    discountAmount: 0,
    discountCode: "",
    wrappingOption: "none",
    paymentMethod: "cod",
    deliveryMethod: "standard",
    createdAt: new Date().toISOString()
  })
}).then(res => res.json()).then(console.log).catch(console.error);
