import re
import os

files = [
    'src/components/CollectionLanding.tsx',
    'src/components/CollectionChamToi.tsx',
    'src/components/CollectionChamDoi.tsx',
    'src/components/CollectionCombo.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # 1. Update the parent wrapper
    # It might be `w-full h-[80vh] min-h-[700px] overflow-hidden flex flex-col md:flex-row`
    # Or `w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row`
    # Let's replace the common part.
    content = re.sub(
        r'className="w-full h-\[[^"]+\] min-h-\[[^"]+\]( md:h-\[[^"]+\])?( md:min-h-\[[^"]+\])? overflow-(hidden|y-auto) (md:overflow-hidden )?flex flex-col md:flex-row"',
        r'className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"',
        content
    )
    # Just in case some have slightly different formatting:
    content = re.sub(
        r'className="w-full h-\[80vh\] min-h-\[700px\] overflow-hidden flex flex-col md:flex-row"',
        r'className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"',
        content
    )

    # 2. Update the item flex sizes
    # Replace `${isActive ? "flex-[4]" : "flex-1"}` or similar
    content = re.sub(
        r'\$\{isActive \? .flex-\[4\].*? : .flex-1.\}',
        r'${isActive ? "h-[750px] md:h-auto md:flex-[4] flex-shrink-0" : "h-[12vh] md:h-auto md:flex-1 flex-shrink-0"}',
        content
    )
    content = re.sub(
        r'\$\{isActive \? .flex-\[5\].*? : .flex-1.\}',
        r'${isActive ? "h-[750px] md:h-auto md:flex-[4] flex-shrink-0" : "h-[12vh] md:h-auto md:flex-1 flex-shrink-0"}',
        content
    )

    # 3. For the Active State Content wrapper
    # Change `flex flex-col md:flex-row` to `flex flex-col-reverse md:flex-row` 
    # to put text at bottom and image on top on mobile, which usually looks better and prevents image from being squished if text is long.
    # Actually, some already have `flex-col-reverse` (like Landing). Let's do a safe replace.
    # First, let's normalize:
    content = content.replace(
        'w-full h-full flex flex-col md:flex-row items-center justify-between',
        'w-full h-full flex flex-col-reverse md:flex-row items-center justify-between'
    )
    content = content.replace(
        'w-full h-auto min-h-max md:h-full flex flex-col-reverse md:flex-row items-center justify-between',
        'w-full h-full flex flex-col-reverse md:flex-row items-center justify-between'
    )

    with open(file_path, 'w') as f:
        f.write(content)

print("Done replacing classes.")
