import re

with open('src/components/CollectionLanding.tsx', 'r') as f:
    content = f.read()

# Change imgSizeClass for mobile
# Old: 
# const imgSizeClass = isWaterOrFire
#   ? 'w-[125%] h-[125%] max-w-[850px] md:max-w-[1150px]'
#   : 'w-[130%] h-[130%] max-w-[900px] md:max-w-[1200px]';
# New:
new_img_size_class = """  const imgSizeClass = isWaterOrFire
    ? 'w-[90%] h-[90%] md:w-[125%] md:h-[125%] max-w-[400px] md:max-w-[1150px]'
    : 'w-[100%] h-[100%] md:w-[130%] md:h-[130%] max-w-[450px] md:max-w-[1200px]';"""

content = re.sub(r'const imgSizeClass = isWaterOrFire\s*\n\s*\?\s*\'w-\[125%\].*?\n\s*:\s*\'w-\[130%\].*?;', new_img_size_class, content, flags=re.DOTALL)


# Also adjust the scale class
new_img_scale_class = """  const imgScaleClass = isWaterOrFire
    ? 'scale-[1.0] md:scale-[1.75] lg:scale-[1.95] hover:scale-[1.05] md:hover:scale-[1.8] lg:hover:scale-[2.0]'
    : 'scale-[1.0] md:scale-[1.95] lg:scale-[2.2] hover:scale-[1.05] md:hover:scale-[2.0] lg:hover:scale-[2.25]';"""

content = re.sub(r'const imgScaleClass = isWaterOrFire\s*\n\s*\?\s*\'scale-\[1.45\].*?\n\s*:\s*\'scale-\[1.6\].*?;', new_img_scale_class, content, flags=re.DOTALL)

with open('src/components/CollectionLanding.tsx', 'w') as f:
    f.write(content)
