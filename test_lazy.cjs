const s = `<img src="..." />`;
console.log(s.replace(/<img([^>]+)>/g, (match, attrs) => {
  return `<img${attrs} loading="lazy">`;
}));
