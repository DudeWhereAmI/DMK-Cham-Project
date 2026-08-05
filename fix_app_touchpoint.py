with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '''        <TouchpointPage 
          lang={lang}
          onNavigateHome={() => setCurrentView('home')}
          onNavigateLogin={() => setCurrentView('login')}
          onNavigateRegister={() => setCurrentView('register')}
        />''',
    '''        <TouchpointPage 
          lang={lang}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateLogin={() => handleNavigate('login')}
          onNavigateRegister={() => handleNavigate('register')}
        />'''
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Fixed TouchpointPage navigation in App.tsx")
