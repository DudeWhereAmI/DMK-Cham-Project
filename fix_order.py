import re

with open("src/components/CustomizerForm.tsx", "r") as f:
    text = f.read()

# We have 3 occurrences. We can use a regex to find:
# (\{product\.category !== 'mirror' && \(\s*<>\s*\{\/\* FLAT STICKER.*?<\/>\s*\)\})
# \s*
# (\{\/\* 3D EMBOSSED - WHITE \*\/}.*?\{\/\* 3D EMBOSSED - PINK \*\/}.*?<\/label>)

pattern = re.compile(
    r"(\{product\.category !== 'mirror' && \(\s*<>\s*\{\/\* FLAT STICKER.*?<\/>\s*\)\})\s*"
    r"(\{\/\* 3D EMBOSSED - WHITE \*\/}.*?\{\/\* 3D EMBOSSED - PINK \*\/}.*?<\/label>)",
    re.DOTALL
)

def replacer(match):
    return match.group(2) + "\n                            " + match.group(1)

new_text = pattern.sub(replacer, text)

# For P2, the condition is `customization.comboId !== 'mirror_combo'`
pattern2 = re.compile(
    r"(\{customization\.comboId !== 'mirror_combo' && \(\s*<>\s*\{\/\* FLAT STICKER.*?<\/>\s*\)\})\s*"
    r"(\{\/\* 3D EMBOSSED - WHITE \*\/}.*?\{\/\* 3D EMBOSSED - PINK \*\/}.*?<\/label>)",
    re.DOTALL
)

new_text = pattern2.sub(replacer, new_text)

with open("src/components/CustomizerForm.tsx", "w") as f:
    f.write(new_text)
print("Replaced!")
