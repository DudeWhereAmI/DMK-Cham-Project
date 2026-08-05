import re
import os

files = [
    'src/components/Navbar.tsx',
    'src/components/MobileNavigation.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # The correct URLs are:
    # Collection 1: collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png
    # Collection 2: collection%202%20%C4%91o%E1%BA%A1n%20BST.png
    # Collection 3: collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png
    # Combo: combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png

    # Just replace all variations with the correct ones
    content = content.replace('collection%201%20%C4%91o%E1%BA%A1n%20BST.png"', 'collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png"')
    content = content.replace('collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png.png"', 'collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png"')
    
    content = content.replace('collection%203%20%C4%91o%E1%BA%A1n%20BST.png"', 'collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png"')
    content = content.replace('collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png.png"', 'collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png"')
    
    content = content.replace('Combo%20%C4%91o%E1%BA%A1n%20BST.png"', 'combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png"')
    content = content.replace('combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png.png"', 'combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png"')
    
    # Also fix object-contain/mix-blend etc to ensure they show up well
    content = content.replace('scale-[150]', 'scale-[1.5]')

    with open(file_path, 'w') as f:
        f.write(content)
