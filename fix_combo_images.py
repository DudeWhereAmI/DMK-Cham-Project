import re

with open('src/components/CollectionCombo.tsx', 'r') as f:
    content = f.read()

new_get_combo_image = """  const getComboImage = (comboId: string) => {
    if (comboId === 'couple_combo') {
      return newComboImage;
    } else {
      return 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A2NH%20COLLECTION%20CH%E1%BA%A0M%20%C4%90%C3%94I%20%E1%BB%9E%20TRANG%20CH%E1%BB%A6%20.png';
    }
  };"""

content = re.sub(r'const getComboImage =.*?};\n', new_get_combo_image + '\n', content, flags=re.DOTALL)

with open('src/components/CollectionCombo.tsx', 'w') as f:
    f.write(content)
