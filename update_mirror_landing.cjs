const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

// Replace the 5-mirror image URL
content = content.replace(
  'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/8c3283d652661f5c4524e67d35f7057b8c547916/M%E1%BA%AAU.png',
  'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/ed49c7fb37b8188fd6af54a285bdb84289237822/new/%E1%BA%A3nh%20m%E1%BA%ABu%20g%C6%B0%C6%A1ng%205%20c%C3%A1i%20ch%E1%BB%AF%20n%E1%BB%95i%20.png'
);

// Increase size of 3-mirrors
content = content.replace(
  /absolute w-\[130%\] h-\[130%\] scale-100/g,
  'absolute w-[160%] h-[160%] scale-[1.1]'
);

fs.writeFileSync('src/components/LandingPage.tsx', content);
