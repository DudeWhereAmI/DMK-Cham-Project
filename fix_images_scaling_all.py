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

    # Change all arbitrary scale values on mobile to scale-100 or minimal scale, so they are not cut off.
    # For CollectionLanding (Chạm Thần)
    content = content.replace("scale-[1.1] md:scale-[1.75]", "scale-[1.0] md:scale-[1.75]")
    content = content.replace("scale-[1.1] md:scale-[1.95]", "scale-[1.0] md:scale-[1.95]")
    content = content.replace("scale-[1.0] md:scale-[1.75]", "scale-[1.0] md:scale-[1.75]")
    content = content.replace("scale-[1.0] md:scale-[1.95]", "scale-[1.0] md:scale-[1.95]")
    
    # For CollectionChamToi
    content = content.replace("scale-[0.52]", "scale-[0.8]")
    content = content.replace("scale-[0.55]", "scale-[0.85]")
    content = content.replace("scale-[0.58]", "scale-[0.9]")
    content = content.replace("translate-x-8 md:translate-x-10", "translate-x-0 md:translate-x-10")
    content = content.replace("scale-110 md:scale-[1.2]", "scale-100 md:scale-[1.2]")
    
    # For CollectionChamDoi
    content = content.replace("scale-110 md:scale-[1.2]", "scale-100 md:scale-[1.2]")
    content = content.replace("translate-x-3 md:translate-x-6", "translate-x-0 md:translate-x-6")
    
    # For CollectionCombo
    content = content.replace("scale-110 z-20 translate-x-0 -translate-y-4 md:-translate-x-2", "scale-100 z-20 translate-x-0 translate-y-0 md:-translate-x-2")

    # Increase container height on mobile for active item to make room for image
    content = content.replace("h-[750px] md:h-auto", "min-h-[100vh] h-auto md:min-h-0 md:h-auto py-8 md:py-0")
    content = content.replace("h-[12vh] md:h-auto", "h-[80px] md:h-auto")
    
    with open(file_path, 'w') as f:
        f.write(content)

print("Done fixing scale.")
