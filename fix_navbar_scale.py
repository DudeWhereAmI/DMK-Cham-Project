import re

files = [
    'src/components/MobileNavigation.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # Change scale-150 to scale-100 or remove it
    content = content.replace('scale-150', 'scale-100 object-cover')
    content = content.replace('object-contain mix-blend-multiply scale-100 object-cover', 'object-contain mix-blend-multiply scale-[1.2]')

    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing scale.")
