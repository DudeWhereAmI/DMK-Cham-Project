import re
with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Replace Image 1
content = content.replace(
    'className="w-full h-full object-contain scale-[1.5] translate-x-0 mix-blend-multiply group-hover/card:scale-[1.6] group-hover/card:translate-x-0 transition-transform duration-500 relative z-10"',
    'className="w-full h-full object-contain scale-[2.4] translate-x-[4%] mix-blend-multiply group-hover/card:scale-[2.5] group-hover/card:translate-x-[4%] transition-transform duration-500 relative z-10"'
)

# Replace Image 2
content = content.replace(
    'alt="Collection 02" className="w-full h-full object-contain scale-[1.5] mix-blend-multiply group-hover/card:scale-[1.6]',
    'alt="Collection 02" className="w-full h-full object-contain scale-[2.0] mix-blend-multiply group-hover/card:scale-[2.1]'
)

# Replace Image 3
content = content.replace(
    'alt="Collection 03" className="w-full h-full object-contain scale-[1.5] mix-blend-multiply group-hover/card:scale-[1.6]',
    'alt="Collection 03" className="w-full h-full object-contain scale-[2.25] mix-blend-multiply group-hover/card:scale-[2.35]'
)

# Replace Image 4
content = content.replace(
    'alt="Combo" className="w-full h-full object-contain scale-[1.5] translate-x-0 mix-blend-multiply group-hover/card:scale-[1.6] group-hover/card:translate-x-0 transition-transform duration-500 relative z-10"',
    'alt="Combo" className="w-full h-full object-contain scale-[2.4] translate-x-[4%] mix-blend-multiply group-hover/card:scale-[2.5] group-hover/card:translate-x-[4%] transition-transform duration-500 relative z-10"'
)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
