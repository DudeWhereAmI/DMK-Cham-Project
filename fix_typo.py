with open('src/components/TouchpointPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "{lang === 'vi' ? 'Chào mừng bạn đến với' : 'Welcome to'} <br/>",
    "{lang === 'vi' ? 'Chào mừng bạn đến với' : 'Welcome to'}"
)

content = content.replace(
    'qua từng vòng trang sức."',
    'qua từng vòng trang&nbsp;sức."'
)

content = content.replace(
    'every piece of jewelry."',
    'every piece of&nbsp;jewelry."'
)

with open('src/components/TouchpointPage.tsx', 'w') as f:
    f.write(content)

print("Fixed typography issues.")
