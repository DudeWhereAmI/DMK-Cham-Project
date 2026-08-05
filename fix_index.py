import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="mobile-web-app-capable" content="yes" />\n    <meta name="theme-color" content="#FAFAF8" />'
)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html viewport")
