import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isTransitioning && pendingView ? \'opacity-0\' : \'opacity-100\'}`}>\n',
    '      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isTransitioning && pendingView ? \'opacity-0\' : \'opacity-100\'} flex flex-col justify-between bg-transparent relative`}>\n'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Fixed app render.")
