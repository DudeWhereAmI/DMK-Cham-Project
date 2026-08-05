import re

with open('vite.config.ts', 'r') as f:
    content = f.read()

# Add base: './'
if 'base: ' not in content:
    content = content.replace(
        'export default defineConfig(() => {\n  return {\n',
        "export default defineConfig(() => {\n  return {\n    base: './',\n"
    )

with open('vite.config.ts', 'w') as f:
    f.write(content)

print("Updated vite.config.ts base")
