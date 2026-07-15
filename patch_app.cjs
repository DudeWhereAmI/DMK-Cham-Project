const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `  const [isInventoryLoaded, setIsInventoryLoaded] = useState(false);

  useEffect(() => {`;

const replacement = `  const [isInventoryLoaded, setIsInventoryLoaded] = useState(false);
  const [inventoryVersion, setInventoryVersion] = useState(0);

  useEffect(() => {
    const handleInvUpdate = () => setInventoryVersion(v => v + 1);
    window.addEventListener('inventory_updated', handleInvUpdate);
    return () => window.removeEventListener('inventory_updated', handleInvUpdate);
  }, []);

  useEffect(() => {`;

code = code.replace(target, replacement);
fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx");
