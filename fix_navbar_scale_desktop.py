import re

files = [
    'src/components/Navbar.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # Change all arbitrary scales to something that doesn't cut off
    content = re.sub(r'scale-\[2\.\d+\]', 'scale-[1.2]', content)
    content = re.sub(r'translate-x-\[\d+%\]', 'translate-x-0', content)
    content = re.sub(r'group-hover/card:scale-\[2\.\d+\]', 'group-hover/card:scale-[1.3]', content)

    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing scale on desktop navbar.")
