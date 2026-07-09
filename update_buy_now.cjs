const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'setCart((prevCart) => [...prevCart, newCartItem]);\n    setCheckoutOrigin(currentView);',
  'setCart([newCartItem]);\n    setCheckoutOrigin(currentView);'
);

fs.writeFileSync('src/App.tsx', content);
