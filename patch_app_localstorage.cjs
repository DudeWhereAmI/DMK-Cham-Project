const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetCartGet = `  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cham_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
    return [];
  });`;

const replacementCartGet = `  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cham_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
    }
    return [];
  });`;

code = code.replace(targetCartGet, replacementCartGet);

const targetCartSet = `  useEffect(() => {
    localStorage.setItem('cham_cart', JSON.stringify(cart));
  }, [cart]);`;

const replacementCartSet = `  useEffect(() => {
    try {
      localStorage.setItem('cham_cart', JSON.stringify(cart));
    } catch(e) {}
  }, [cart]);`;

code = code.replace(targetCartSet, replacementCartSet);

const targetRecentGet = `  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cham_recently_viewed');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [];
  });`;

const targetRecentSet = `  useEffect(() => {
    localStorage.setItem('cham_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);`;

const replacementRecentSet = `  useEffect(() => {
    try {
      localStorage.setItem('cham_recently_viewed', JSON.stringify(recentlyViewedIds));
    } catch(e) {}
  }, [recentlyViewedIds]);`;

code = code.replace(targetRecentSet, replacementRecentSet);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx localStorage");
