import re

# Fix MobileNavigation.tsx
with open('src/components/MobileNavigation.tsx', 'r') as f:
    content = f.read()

# Fix the popup container scale
content = content.replace(
    "isShopMenuOpen ? 'bottom-24 opacity-100 scale-150' : '-bottom-full opacity-0 scale-95 pointer-events-none'",
    "isShopMenuOpen ? 'bottom-24 opacity-100 scale-100' : '-bottom-full opacity-0 scale-95 pointer-events-none'"
)

# Fix image scaling to 125%
content = content.replace('scale-150" referrerPolicy', 'scale-[1.25]" referrerPolicy')

with open('src/components/MobileNavigation.tsx', 'w') as f:
    f.write(content)


# Fix Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# The previous script might have set desktop to scale-[2.4] etc. We need to replace them.
# The user wants "revert lại cái menu này... ảnh bên trong các ô riêng mỗi các ô cần bự hơn chút tầm 125%"
# So we use scale-[1.25] and group-hover/card:scale-[1.3]
content = re.sub(r'scale-\[2\.\d+\]', 'scale-[1.25]', content)
content = re.sub(r'group-hover/card:scale-\[2\.\d+\]', 'group-hover/card:scale-[1.3]', content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

print("Done fixing navbars to 125%.")
