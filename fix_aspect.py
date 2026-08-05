with open('src/components/MobileNavigation.tsx', 'r') as f:
    content = f.read()
content = content.replace('aspect-[4/3]', 'aspect-square')
with open('src/components/MobileNavigation.tsx', 'w') as f:
    f.write(content)

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()
content = content.replace('aspect-[4/5]', 'aspect-square')
with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
print("Done fixing aspect ratio to square.")
