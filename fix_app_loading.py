import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Add isTransitioning state
content = content.replace(
    '''  const [customizerMode, setCustomizerMode] = useState<'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided'>('full');''',
    '''  const [customizerMode, setCustomizerMode] = useState<'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided'>('full');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingView, setPendingView] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setIsTransitioning(true);
    setPendingView(view);
    setTimeout(() => {
      setCurrentView(view as any);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingView(null);
      }, 500); // Wait a bit for fade-in of new view
    }, 600); // Fade out duration
  };'''
)

# 2. Replace all setCurrentView calls with handleNavigate where appropriate
# Wait, replacing all setCurrentView with handleNavigate might be tricky. Let's just do a regex replace for the ones bound to buttons.
content = re.sub(r"setCurrentView\('([^']+)'\);\s*window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);", r"handleNavigate('\1');", content)

# There's also `setCurrentView(view as any);` etc.
content = content.replace(
    '''              if (view === 'shop') {
                setShopFilter('all');
                setCurrentView('shop');
              } else {
                setCurrentView(view);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''              if (view === 'shop') {
                setShopFilter('all');
                handleNavigate('shop');
              } else {
                handleNavigate(view);
              }'''
)

content = content.replace(
    '''              setCurrentView(view as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''              handleNavigate(view);'''
)

content = content.replace(
    '''              setCurrentView(checkoutOrigin as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''              handleNavigate(checkoutOrigin);'''
)

content = content.replace(
    '''               setCurrentView('return_policy');
               setIsCartOpen(false);
               window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''               setIsCartOpen(false);
               handleNavigate('return_policy');'''
)
content = content.replace(
    '''               setCurrentView('checkout');
               setIsCartOpen(false);
               window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''               setIsCartOpen(false);
               handleNavigate('checkout');'''
)
content = content.replace(
    '''               setCurrentView('cart');
               setIsCartOpen(false);
               window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''               setIsCartOpen(false);
               handleNavigate('cart');'''
)
content = content.replace(
    '''               setCurrentView('home');
               setIsCartOpen(false);
               window.scrollTo({ top: 0, behavior: 'smooth' });''',
    '''               setIsCartOpen(false);
               handleNavigate('home');'''
)

content = content.replace(
    '''              setCurrentView('home');
              const el = document.getElementById('encyclopedia-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });''',
    '''              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('encyclopedia-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);'''
)

# 3. Add the Transition Overlay JSX just inside the return statement of App
# Let's find `<div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans">` or similar
content = content.replace(
    '''  return (
    <div className="min-h-screen''',
    '''  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans relative">
      {/* Loading Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#FAFAF8] flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`transition-all duration-500 delay-100 flex flex-col items-center justify-center ${isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          <img 
            src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@4f54e36f4edb0f4fb21768cae473d0fbcf33c436/LOGO%20.png" 
            alt="Chạm Logo" 
            className="h-20 md:h-24 w-auto object-contain drop-shadow-sm opacity-90 mx-auto mb-4"
            referrerPolicy="no-referrer"
          />
          <span className="font-serif font-black uppercase tracking-widest text-lg md:text-xl text-[#00687A]">
            Chạm Elements
          </span>
        </div>
      </div>
      
      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isTransitioning && pendingView ? 'opacity-0' : 'opacity-100'}`}>
'''
)

content = content.replace(
    '''    </div>
  );
}''',
    '''      </div>
    </div>
  );
}'''
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Done adding loading transition to App.tsx")
