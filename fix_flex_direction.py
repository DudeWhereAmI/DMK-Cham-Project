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

    # Change flex-col-reverse to flex-col
    content = content.replace(
        'w-full h-max min-h-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0',
        'w-full h-max min-h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0'
    )

    # Make image container height smaller on mobile so it's closer
    content = content.replace(
        'w-full h-[450px] md:h-full',
        'w-full min-h-[300px] h-auto md:h-full'
    )
    
    # Remove mt-8 from text wrapper
    content = content.replace('md:mt-0 mt-8', 'mt-4 md:mt-0')

    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing flex direction and spacing.")
