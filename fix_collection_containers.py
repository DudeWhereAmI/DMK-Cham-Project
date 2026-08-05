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

    # Make the active panel grow to fit its content on mobile
    content = content.replace(
        '${isActive ? "min-h-[100vh] h-auto md:min-h-0 md:h-auto py-8 md:py-0 md:flex-[4] flex-shrink-0" : "h-[80px] md:h-auto md:flex-1 flex-shrink-0"}',
        '${isActive ? "min-h-[100vh] h-max md:h-auto py-12 md:py-0 md:flex-[4] flex-shrink-0" : "h-[80px] min-h-[80px] md:h-auto md:flex-1 flex-shrink-0"}'
    )
    
    # Remove any fixed h-full on the inner wrapper to let it grow
    content = content.replace(
        'w-full h-full flex flex-col-reverse md:flex-row items-center justify-between',
        'w-full h-max min-h-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0'
    )

    # Let the image container grow
    content = content.replace(
        'flex-1 md:flex-[2] w-full md:h-full flex items-center justify-center relative min-h-[350px] md:min-h-[400px]',
        'flex-none md:flex-[2] w-full h-[450px] md:h-full flex items-center justify-center relative md:min-h-[400px]'
    )
    content = content.replace(
        'flex-[2] h-full flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[400px]',
        'flex-none md:flex-[2] w-full h-[450px] md:h-full flex flex-col items-center justify-center relative md:min-h-[400px]'
    )
    content = content.replace(
        'flex-[2] h-full flex items-center justify-center relative min-h-[300px] md:min-h-[400px]',
        'flex-none md:flex-[2] w-full h-[450px] md:h-full flex items-center justify-center relative md:min-h-[400px]'
    )

    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing containers.")
