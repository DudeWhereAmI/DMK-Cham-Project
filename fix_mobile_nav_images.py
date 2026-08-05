import re

with open('src/components/MobileNavigation.tsx', 'r') as f:
    content = f.read()

# Fix Chạm Tôi image
content = content.replace('collection%201%20%C4%91o%E1%BA%A1n%20BST.png"', 'collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png"')

# Fix Combo image
content = content.replace('Combo%20%C4%91o%E1%BA%A1n%20BST.png', 'combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png')

with open('src/components/MobileNavigation.tsx', 'w') as f:
    f.write(content)
