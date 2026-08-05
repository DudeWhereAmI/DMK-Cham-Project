import re

with open('src/components/TouchpointPage.tsx', 'r') as f:
    content = f.read()

# Replace Logo with Image
content = content.replace(
    '''        {/* Elegant Logo */}
        <div className="mb-12 relative animate-fade-in translate-y-4" style={{ animationFillMode: 'forwards' }}>
          <img 
            src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@4f54e36f4edb0f4fb21768cae473d0fbcf33c436/LOGO%20.png" 
            alt="Chạm Logo" 
            className="h-24 md:h-28 w-auto object-contain drop-shadow-sm opacity-90 mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>''',
    '''        {/* Collection Hero Image */}
        <div className="mb-8 relative animate-fade-in w-full max-w-sm md:max-w-md mx-auto" style={{ animationFillMode: 'forwards' }}>
          <img 
            src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/new/pha%20l%C3%AA%20ch%E1%BB%AF%20d%C3%A1n%205%20m%C3%A0u.png" 
            alt="Chạm Collection" 
            className="w-full h-auto object-contain drop-shadow-2xl opacity-100 mx-auto animate-float mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>'''
)

# Update Typography
content = content.replace(
    '''          <h1 className="text-3xl md:text-4xl font-serif text-[#00687A] leading-relaxed tracking-wide">
            {lang === 'vi' ? 'Chào mừng bạn đến với' : 'Welcome to'} <br/> 
            <span className="font-black uppercase tracking-widest text-xl md:text-2xl mt-4 block">Chạm Elements</span>
          </h1>''',
    '''          <h1 className="text-xl md:text-2xl font-sans font-medium text-[#00687A]/80 uppercase tracking-[0.2em] leading-relaxed mb-4">
            {lang === 'vi' ? 'Chào mừng bạn đến với' : 'Welcome to'} <br/> 
            <span className="font-serif italic font-normal tracking-wide text-4xl md:text-5xl mt-6 mb-2 block text-[#00687A]">Chạm Elements</span>
          </h1>'''
)

with open('src/components/TouchpointPage.tsx', 'w') as f:
    f.write(content)

print("Done fixing TouchpointPage.")
