import re

files = [
    'src/components/Navbar.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # Change all arbitrary scales to scale-100 to prevent cut-off completely
    content = re.sub(r'scale-\[1\.2\]', 'scale-100', content)
    content = re.sub(r'group-hover/card:scale-\[1\.3\]', 'group-hover/card:scale-105', content)
    content = re.sub(r'aspect-\[4/5\]', 'aspect-square', content)

    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing scale to 100 on desktop navbar.")
