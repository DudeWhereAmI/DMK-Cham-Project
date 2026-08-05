import re

with open('src/components/CollectionLanding.tsx', 'r') as f:
    content = f.read()

# change the wrapper class:
# from: <div className="w-full h-[80vh] min-h-[600px] overflow-hidden flex flex-col md:flex-row">
# to: <div className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
content = content.replace(
    '<div className="w-full h-[80vh] min-h-[600px] overflow-hidden flex flex-col md:flex-row">',
    '<div className="w-full h-[100vh] min-h-[700px] md:h-[80vh] md:min-h-[600px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">'
)

# And reverse flex on mobile for active content so image is on top
# from: w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-700 delay-300
# to: w-full h-full flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-700 delay-300
content = content.replace(
    'w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-700 delay-300',
    'w-full h-auto min-h-max md:h-full flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-12 z-10 transition-opacity duration-700 delay-300'
)

# For the image container, add flex-1 on mobile
# from: <div className="flex-[2] h-full flex items-center justify-center relative min-h-[400px]">
# to: <div className="flex-1 md:flex-[2] w-full md:h-full flex items-center justify-center relative min-h-[350px] md:min-h-[400px] mb-8 md:mb-0">
content = content.replace(
    '<div className="flex-[2] h-full flex items-center justify-center relative min-h-[400px]">',
    '<div className="flex-1 md:flex-[2] w-full md:h-full flex items-center justify-center relative min-h-[350px] md:min-h-[400px] mb-8 md:mb-0">'
)

with open('src/components/CollectionLanding.tsx', 'w') as f:
    f.write(content)
