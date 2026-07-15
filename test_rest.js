const parseFirestoreResponse = (fields) => {
  if (!fields) return null;
  const res = {};
  for (const key in fields) {
    if (fields[key].integerValue !== undefined) {
      res[key] = parseInt(fields[key].integerValue, 10);
    } else if (fields[key].mapValue) {
      res[key] = parseFirestoreResponse(fields[key].mapValue.fields);
    }
  }
  return res;
};

fetch("https://firestore.googleapis.com/v1/projects/gen-lang-client-0149031439/databases/ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d/documents/admin/inventory")
  .then(res => res.json())
  .then(data => {
    const products = parseFirestoreResponse(data.fields.products.mapValue.fields);
    const charms = parseFirestoreResponse(data.fields.charms.mapValue.fields);
    console.log("Parsed:", JSON.stringify({products, charms}));
  });
