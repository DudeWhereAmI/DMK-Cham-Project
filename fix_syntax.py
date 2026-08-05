with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '''export const LogoVertical = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <PngLogoCircular className="h-14 md:h-16 w-auto max-w-[280px] drop-shadow-sm" />
      </div>
    </div>
  );
};''',
    '''export const LogoVertical = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <PngLogoCircular className="h-14 md:h-16 w-auto max-w-[280px] drop-shadow-sm" />
    </div>
  );
};'''
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Fixed syntax")
