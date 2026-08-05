import re

files = [
    'src/components/CollectionLanding.tsx',
    'src/components/CollectionChamToi.tsx',
    'src/components/CollectionChamDoi.tsx',
    'src/components/CollectionCombo.tsx'
]

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()

    # For CollectionLanding (Chạm Thần)
    content = content.replace(
        "scale-[1.0] md:scale-[1.75]",
        "scale-[1.1] md:scale-[1.75]"
    )
    content = content.replace(
        "scale-[1.0] md:scale-[1.95]",
        "scale-[1.1] md:scale-[1.95]"
    )
    
    # Ensure they have flex-col-reverse on mobile for consistency
    # We already did this, but let's make sure Center Image wrapper takes space
    
    with open(file_path, 'w') as f:
        f.write(content)
print("Done")
