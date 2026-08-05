import re

with open('src/components/CollectionChamToi.tsx', 'r') as f:
    content = f.read()

# I will replace the getDisplayImage function to use some reliable known URLs.
new_get_display = """  const getDisplayImage = (fontId: string, productId: string) => {
    // If the image doesn't load, we can use a more reliable single element image from data
    if (productId === "kep-1") {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20Kim%20-%20G%C3%B3c%20th%E1%BA%B3ng.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/K%E1%BA%B9p%20%C3%81nh%20M%C3%A2y/%E1%BA%A2nh%20kh%C3%B4ng%20ch%E1%BB%AF%20%C3%81nh%20M%C3%A2y%20M%E1%BB%99c%20-%20G%C3%B3c%20nghi%C3%AAng.png";
    } else if (productId === "kep-2") {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@9599257efd35fb1fd91bb5e91471dccf0353e4ef/new/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20t%E1%BB%ABng%20c%C3%A1i%20Untitled%20folder/%C3%A1nh%20m%C3%A2y%20ch%E1%BB%AF%20d%C3%A1n%20thu%E1%BB%B7.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/K%E1%BA%B8P%20M%E1%BA%AAU/%E1%BA%A2nh%20m%E1%BA%ABu%20k%E1%BA%B9p%20pha%20l%C3%AA%20Ho%E1%BA%A3%20g%E1%BA%AFn%20ch%E1%BB%AF%20d%C3%A1n%20v%C3%A0ng.png";
    } else {
      return fontId === "sticker"
        ? "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png"
        : "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png";
    }
  };"""

content = re.sub(r'const getDisplayImage =.*?};\n', new_get_display + '\n', content, flags=re.DOTALL)

with open('src/components/CollectionChamToi.tsx', 'w') as f:
    f.write(content)
