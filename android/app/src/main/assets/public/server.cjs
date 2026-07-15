var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_app = require("firebase-admin/app");
var import_firestore = require("firebase-admin/firestore");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_googleapis = require("googleapis");

// src/data.ts
var ELEMENTS = [
  {
    type: "KIM",
    nameEn: "Metal (Kim)",
    nameVi: "M\u1EC7nh Kim",
    colorHex: "#F0F1F3",
    // White/Crystal/Silver
    gradientFrom: "#FFFFFF",
    gradientTo: "#D1D5DB",
    guardianEn: "White Tiger",
    guardianVi: "H\u1ED5 Tr\u1EAFng",
    guardianEmoji: "\u{1F405}",
    guardianImg: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png",
    description: "Symbolizes purity, wisdom, and precise brilliance. Resonates with white, silver and pearlescent crystal textures.",
    descriptionVi: "\u0110\u1EA1i di\u1EC7n cho s\u1EF1 thu\u1EA7n khi\u1EBFt, tr\xED tu\u1EC7 v\xE0 \xE1nh s\xE1ng tinh t\u1EBF. Ph\xF9 h\u1EE3p v\u1EDBi c\xE1c ch\u1EA5t li\u1EC7u pha l\xEA tr\u1EAFng, b\u1EA1c v\xE0 ng\u1ECDc trai."
  },
  {
    type: "MOC",
    nameEn: "Wood (M\u1ED9c)",
    nameVi: "M\u1EC7nh M\u1ED9c",
    colorHex: "#CEE0A1",
    // Light Olive Green
    gradientFrom: "#D1E7B0",
    gradientTo: "#A7C985",
    guardianEn: "Green Dragon",
    guardianVi: "R\u1ED3ng Xanh",
    guardianEmoji: "\u{1F409}",
    guardianImg: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png",
    description: "Symbolizes growth, healing, and absolute vitality. Thrives in soft light greens and pastel mint jade tones.",
    descriptionVi: "\u0110\u1EA1i di\u1EC7n cho s\u1EF1 sinh tr\u01B0\u1EDFng, ch\u1EEFa l\xE0nh v\xE0 s\u1EE9c s\u1ED1ng m\xE3nh li\u1EC7t. N\u1ED5i b\u1EADt trong nh\u1EEFng s\u1EAFc xanh ng\u1ECDc b\xEDch, xanh nh\u1EA1t pastel."
  },
  {
    type: "THUY",
    nameEn: "Water (Thu\u1EF7)",
    nameVi: "M\u1EC7nh Thu\u1EF7",
    colorHex: "#AAD3EF",
    // Soft Blue
    gradientFrom: "#CBE5FF",
    gradientTo: "#8FBFE5",
    guardianEn: "Blue Whale",
    guardianVi: "C\xE1 Voi Xanh",
    guardianEmoji: "\u{1F433}",
    guardianImg: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png",
    description: "Symbolizes flow, harmony, and depth. Best expressed in ocean blues, glittering aquas, and deep clear lakes.",
    descriptionVi: "\u0110\u1EA1i di\u1EC7n cho d\xF2ng ch\u1EA3y, s\u1EF1 t\u0129nh l\u1EB7ng v\xE0 chi\u1EC1u s\xE2u. C\u1EA3m nh\u1EADn r\xF5 nh\u1EA5t qua m\xE0u xanh \u0111\u1EA1i d\u01B0\u01A1ng, \xE1nh xanh l\u1EA5p l\xE1nh v\xE0 h\u1ED3 n\u01B0\u1EDBc trong."
  },
  {
    type: "HOA",
    nameEn: "Fire (Ho\u1EA3)",
    nameVi: "M\u1EC7nh Ho\u1EA3",
    colorHex: "#F4C1C2",
    // Soft Pink / Rose
    gradientFrom: "#FFD3D4",
    gradientTo: "#E59CA0",
    guardianEn: "Red Phoenix",
    guardianVi: "Ph\u01B0\u1EE3ng Ho\xE0ng \u0110\u1ECF",
    guardianEmoji: "\u{1F525}",
    guardianImg: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png",
    description: "Symbolizes warmth, absolute passion, and creative energy. Sparkles in beautiful rose pinks and coral amethysts.",
    descriptionVi: "\u0110\u1EA1i di\u1EC7n cho s\u1EF1 \u1EA5m \xE1p, \u0111am m\xEA m\xE3nh li\u1EC7t v\xE0 n\u0103ng l\u01B0\u1EE3ng s\xE1ng t\u1EA1o. T\u1ECFa s\xE1ng qua nh\u1EEFng s\u1EAFc h\u1ED3ng r\u1EF1c r\u1EE1 v\xE0 san h\xF4 nhi\u1EC7t huy\u1EBFt."
  },
  {
    type: "THO",
    nameEn: "Earth (Th\u1ED5)",
    nameVi: "M\u1EC7nh Th\u1ED5",
    colorHex: "#EADAB7",
    // Warm Cream / Biscuit Amber
    gradientFrom: "#FFEED1",
    gradientTo: "#D3C29E",
    guardianEn: "Yellow Unicorn",
    guardianVi: "K\u1EF3 L\xE2n V\xE0ng",
    guardianEmoji: "\u{1F984}",
    guardianImg: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png",
    description: "Symbolizes stability, nourishment, and connection. Grounded in shells, biscuits, honey beige and golden ambers.",
    descriptionVi: "\u0110\u1EA1i di\u1EC7n cho s\u1EF1 b\u1EC1n v\u1EEFng, nu\xF4i d\u01B0\u1EE1ng v\xE0 g\u1EAFn k\u1EBFt. G\u1EA7n g\u0169i qua nh\u1EEFng t\xF4ng m\xE0u \u1EA5m nh\u01B0 v\u1ECF trai, m\xE0u be, m\u1EADt ong v\xE0 h\u1ED5 ph\xE1ch."
  }
];
var CHARMS = [
  // Zodiac Guardians
  {
    id: "zodiac-kim",
    name: "White Tiger Moon",
    vietnameseName: "B\u1EA1ch H\u1ED5 (Kim)",
    category: "zodiac",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Kim.png",
    priceModifier: 1e4,
    element: "KIM"
  },
  {
    id: "zodiac-moc",
    name: "Green Dragon Cloud",
    vietnameseName: "Thanh Long (M\u1ED9c)",
    category: "zodiac",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@e082a9a3f88bde1ea5af5f49770de1af5052fa08/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20M%E1%BB%99c.png",
    priceModifier: 1e4,
    element: "MOC"
  },
  {
    id: "zodiac-thuy",
    name: "Starry Blue Whale",
    vietnameseName: "Huy\u1EC1n V\u0169 (Th\u1EE7y)",
    category: "zodiac",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Thu%E1%BB%B7.png",
    priceModifier: 1e4,
    element: "THUY"
  },
  {
    id: "zodiac-hoa",
    name: "Red Phoenix Flame",
    vietnameseName: "Chu T\u01B0\u1EDBc (H\u1ECFa)",
    category: "zodiac",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Ho%E1%BA%A3.png",
    priceModifier: 1e4,
    element: "HOA"
  },
  {
    id: "zodiac-tho",
    name: "Yellow Qilin Spark",
    vietnameseName: "K\u1EF3 L\xE2n (Th\u1ED5)",
    category: "zodiac",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/LINH%20V%E1%BA%ACT/Linh%20v%E1%BA%ADt%20Th%E1%BB%95.png",
    priceModifier: 1e4,
    element: "THO"
  },
  // Nơ trang trí
  // Small Bows (Nơ nhỏ) - Dùng cho kẹp
  {
    id: "bow-small-1-pink",
    name: "Pink Small Bow 1",
    vietnameseName: "N\u01A1 Nh\u1ECF 1 h\u1ED3ng",
    category: "bow-small",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%201%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png",
    priceModifier: 5e3
  },
  {
    id: "bow-small-1-white",
    name: "White Small Bow 1",
    vietnameseName: "N\u01A1 Nh\u1ECF 1 tr\u1EAFng",
    category: "bow-small",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%201%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png",
    priceModifier: 5e3
  },
  {
    id: "bow-small-2-pink",
    name: "Pink Small Bow 2",
    vietnameseName: "N\u01A1 Nh\u1ECF 2 h\u1ED3ng",
    category: "bow-small",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%202%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png",
    priceModifier: 5e3
  },
  {
    id: "bow-small-2-white",
    name: "White Small Bow 2",
    vietnameseName: "N\u01A1 Nh\u1ECF 2 tr\u1EAFng",
    category: "bow-small",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20Nh%E1%BB%8F%202%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20k%E1%BA%B9p.png",
    priceModifier: 5e3
  },
  // Big Bows (Nơ to) - Dùng cho gương
  {
    id: "bow-big-1-pink",
    name: "Pink Big Bow 1",
    vietnameseName: "N\u01A1 To 1 h\u1ED3ng",
    category: "bow-big",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%201%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png",
    priceModifier: 1e4
  },
  {
    id: "bow-big-1-white",
    name: "White Big Bow 1",
    vietnameseName: "N\u01A1 To 1 tr\u1EAFng",
    category: "bow-big",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%201%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png",
    priceModifier: 1e4
  },
  {
    id: "bow-big-2-pink",
    name: "Pink Big Bow 2",
    vietnameseName: "N\u01A1 To 2 h\u1ED3ng",
    category: "bow-big",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%202%20h%E1%BB%93ng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png",
    priceModifier: 1e4
  },
  {
    id: "bow-big-2-white",
    name: "White Big Bow 2",
    vietnameseName: "N\u01A1 To 2 tr\u1EAFng",
    category: "bow-big",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/N%C6%A1%20To%202%20tr%E1%BA%AFng%20-%20D%C3%B9ng%20cho%20g%C6%B0%C6%A1ng.png",
    priceModifier: 1e4
  },
  // Sticker dán (Stickers)
  {
    id: "sticker-sparkle-silver",
    name: "Sparkle Sticker Silver",
    vietnameseName: "Sticker d\xE1n L\u1EA5p l\xE1nh - B\u1EA1c",
    category: "sticker-deco",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20L%E1%BA%A5p%20l%C3%A1nh%20-%20B%E1%BA%A1c.png",
    priceModifier: 3e3
  },
  {
    id: "sticker-sparkle-gold",
    name: "Sparkle Sticker Gold",
    vietnameseName: "Sticker d\xE1n L\u1EA5p l\xE1nh - V\xE0ng",
    category: "sticker-deco",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20L%E1%BA%A5p%20l%C3%A1nh%20-%20V%C3%A0ng.png",
    priceModifier: 3e3
  },
  {
    id: "sticker-moon-silver",
    name: "Moon Sticker Silver",
    vietnameseName: "Sticker d\xE1n m\u1EB7t tr\u0103ng - B\u1EA1c",
    category: "sticker-deco",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20m%E1%BA%B7t%20tr%C4%83ng%20-%20B%E1%BA%A1c.png",
    priceModifier: 3e3
  },
  {
    id: "sticker-moon-gold",
    name: "Moon Sticker Gold",
    vietnameseName: "Sticker d\xE1n m\u1EB7t tr\u0103ng - V\xE0ng",
    category: "sticker-deco",
    imageUrl: "https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/ELEMENT%20TRANG%20TR%C3%8D/Sticker%20d%C3%A1n%20m%E1%BA%B7t%20tr%C4%83ng%20-%20V%C3%A0ng.png",
    priceModifier: 3e3
  }
];

// server.ts
import_dotenv.default.config();
var adminDb = null;
try {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const serviceAccount = {
      projectId: "gen-lang-client-0149031439",
      clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
    };
    const adminApp = (0, import_app.initializeApp)({
      credential: (0, import_app.cert)(serviceAccount)
    });
    adminDb = (0, import_firestore.getFirestore)(adminApp);
    adminDb.settings({ databaseId: "ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d" });
    console.log("Firebase Admin initialized for inventory updates");
  }
} catch (err) {
  console.error("Failed to initialize Firebase Admin:", err);
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  app.post("/api/update-inventory-admin", async (req, res) => {
    try {
      if (!adminDb) {
        return res.status(500).json({ error: "Admin DB not initialized" });
      }
      const { newInventory, historyLog } = req.body;
      if (!newInventory) {
        return res.status(400).json({ error: "Missing newInventory" });
      }
      const docRef = adminDb.collection("admin").doc("inventory");
      const updateData = {
        products: newInventory.products,
        charms: newInventory.charms,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (req.body.history) {
        updateData.history = req.body.history;
      }
      await docRef.set(updateData, { merge: true });
      return res.json({ success: true });
    } catch (error) {
      console.error("Failed to update inventory as admin:", error);
      return res.status(500).json({ error: "Failed to update inventory" });
    }
  });
  app.post("/api/send-preorder-email", async (req, res) => {
    try {
      const { orderId, customerName, customerEmail, customerPhone, orderDetails = [], totalAmount = 0 } = req.body;
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Email credentials not configured. Email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }
      const transporter = process.env.SMTP_HOST ? import_nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, "")
        }
      }) : import_nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, "")
        }
      });
      const orderItemsHtml = orderDetails.map((item) => {
        let elementImgUrl = item.itemImageUrl || "";
        if (!elementImgUrl) {
          if (item.customization && item.customization.element && item.images && item.images[item.customization.element]) {
            elementImgUrl = item.images[item.customization.element];
          } else if (item.images && Object.values(item.images).length > 0) {
            elementImgUrl = Object.values(item.images)[0];
          }
        }
        return `
          <div style="display: flex; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid #E5E7EB;">
            ${elementImgUrl ? `<img src="${elementImgUrl}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px; border: 1px solid #E5E7EB; margin-right: 16px; background-color: #F9FAFB;" />` : ""}
            <div style="flex: 1;">
              <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #111827;">${item.name}</h4>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #4B5563;">S\u1ED1 l\u01B0\u1EE3ng: <strong>${item.quantity}</strong></p>
              ${item.customization ? `
                <div style="font-size: 13px; color: #6B7280; line-height: 1.5;">
                  ${item.customization.element ? `M\u1EC7nh/Charm: ${item.customization.element}<br/>` : ""}
                  ${item.customization.text ? `Kh\u1EAFc/D\xE1n: "${item.customization.text}"<br/>` : ""}
                  ${item.customization.text2 ? `SP2 Kh\u1EAFc/D\xE1n: "${item.customization.text2}"` : ""}
                </div>
              ` : ""}
            </div>
          </div>
        `;
      }).join("");
      const emailContent = `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          
          <!-- Header -->
          <div style="background-color: #00687A; padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">X\xC1C NH\u1EACN \u0110\u01A0N H\xC0NG</h1>
            <p style="color: #E5F0F2; margin: 10px 0 0 0; font-size: 16px;">C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 l\u1EF1a ch\u1ECDn Ch\u1EA1m</p>
          </div>

          <div style="padding: 40px 30px;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.6;">Xin ch\xE0o <strong>${customerName}</strong>,</p>
            <p style="font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.6;">Y\xEAu c\u1EA7u Pre-order c\u1EE7a b\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c ghi nh\u1EADn. M\xE3 \u0111\u01A1n h\xE0ng c\u1EE7a b\u1EA1n l\xE0: <strong style="color: #00687A; font-size: 18px;">${orderId || "N/A"}</strong>.</p>
            
            <div style="background-color: #F8F9FA; border-left: 4px solid #00687A; padding: 16px; margin-bottom: 32px;">
              <p style="margin: 0; font-size: 14px; color: #4B5563; line-height: 1.6;">
                <strong>L\u01AFU \xDD V\u1EC0 THANH TO\xC1N:</strong> \u0110\xE2y l\xE0 email x\xE1c nh\u1EADn ghi nh\u1EADn \u0111\u01A1n h\xE0ng t\u1EF1 \u0111\u1ED9ng. Ch\xFAng t\xF4i s\u1EBD ki\u1EC3m tra v\xE0 g\u1EEDi email x\xE1c nh\u1EADn <strong>\u0111\xE3 thanh to\xE1n th\xE0nh c\xF4ng</strong> sau (n\u1EBFu b\u1EA1n ch\u1ECDn chuy\u1EC3n kho\u1EA3n/MoMo). Th\u1EDDi gian ch\u1EDD s\u1EA3n xu\u1EA5t (2-5 ng\xE0y) s\u1EBD \u0111\u01B0\u1EE3c t\xEDnh b\u1EAFt \u0111\u1EA7u t\u1EEB l\xFAc c\xF3 email x\xE1c nh\u1EADn thanh to\xE1n th\xE0nh c\xF4ng.
              </p>
            </div>
            
            <h3 style="font-size: 18px; color: #111827; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px; margin-bottom: 20px;">Chi ti\u1EBFt \u0111\u01A1n h\xE0ng</h3>
            
            <div style="margin-bottom: 24px;">
              ${orderItemsHtml}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background-color: #F9FAFB; padding: 16px 20px; border-radius: 8px; margin-bottom: 32px;">
              <span style="font-size: 16px; color: #4B5563; font-weight: 500;">T\u1ED5ng c\u1ED9ng (d\u1EF1 ki\u1EBFn)</span>
              <span style="font-size: 20px; color: #990000; font-weight: 700;">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}</span>
            </div>

            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />

            <h3 style="font-size: 16px; color: #111827; margin-bottom: 16px;">Thanh to\xE1n l\u1EA1i (n\u1EBFu c\u1EA7n)</h3>
            <p style="font-size: 14px; color: #4B5563; line-height: 1.6; margin-bottom: 16px;">Trong tr\u01B0\u1EDDng h\u1EE3p b\u1EA1n ch\u01B0a thanh to\xE1n \u0111\u01B0\u1EE3c, b\u1EA1n c\xF3 th\u1EC3 qu\xE9t m\xE3 QR d\u01B0\u1EDBi \u0111\xE2y. Vui l\xF2ng ghi r\xF5 n\u1ED9i dung chuy\u1EC3n kho\u1EA3n theo c\xFA ph\xE1p: <strong>${customerName} ${customerPhone} ${orderId || "M\xE3 \u0110\u01A1n H\xE0ng"}</strong>.</p>
            
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/1d210243f851f1f56d6a41ba5c73144ff8636c8f/730775708_1725132161906814_8498991417054631504_n.jpg" alt="MoMo QR Code" style="width: 200px; height: 200px; object-fit: contain; border: 1px solid #E5E7EB; border-radius: 8px; padding: 8px;" />
              <p style="margin-top: 8px; font-size: 14px; color: #00687A; font-weight: bold;">MoMo - Qu\xE9t m\xE3 \u0111\u1EC3 thanh to\xE1n</p>
            </div>

            <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #4B5563;">N\u1EBFu b\u1EA1n c\xF3 b\u1EA5t k\u1EF3 c\xE2u h\u1ECFi n\xE0o, vui l\xF2ng li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i qua:</p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Email: <a href="mailto:cham.elements@gmail.com" style="color: #00687A; text-decoration: none;">cham.elements@gmail.com</a>
              </p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Hotline: 0918 620 232 (Ms. H\xE0 Anh) - 0365 092 373 (Mr. Anh Kh\xF4i)
              </p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #00687A; font-weight: 500;">
                Facebook: <a href="https://www.facebook.com/profile.php?id=61591049410705" style="color: #00687A; text-decoration: none;">Fanpage Facebook</a>
              </p>
              <p style="margin: 0; font-size: 14px; color: #00687A; font-weight: 500;">
                TikTok: <a href="https://www.tiktok.com/@cham.elements?_r=1&_t=ZS-97WdJdLmO6H" style="color: #00687A; text-decoration: none;">TikTok</a>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #111827; padding: 24px 20px; text-align: center;">
            <p style="color: #9CA3AF; margin: 0; font-size: 12px; letter-spacing: 0.5px;">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Ch\u1EA1m. All rights reserved.</p>
            <p style="color: #6B7280; margin: 8px 0 0 0; font-size: 12px;">\u0110\u01B0\u1EE3c ch\u1EBF t\xE1c v\u1EDBi s\u1EF1 t\u1EC9 m\u1EC9 v\xE0 t\u1EADn t\xE2m.</p>
          </div>
        </div>
      `;
      await transporter.sendMail({
        from: `"Ch\u1EA1m" <${process.env.GMAIL_USER}>`,
        to: customerEmail,
        subject: "[Ch\u1EA1m] X\xE1c nh\u1EADn y\xEAu c\u1EA7u Pre-order",
        html: emailContent
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });
  app.post("/api/contact-us", async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Email credentials not configured. Contact email not sent.");
        return res.json({ success: true, message: "Credentials not configured" });
      }
      const transporter = process.env.SMTP_HOST ? import_nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, "")
        }
      }) : import_nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, "")
        }
      });
      const emailContent = `
        <h1>Tin nh\u1EAFn m\u1EDBi t\u1EEB ${fullName}</h1>
        <p><strong>Kh\xE1ch h\xE0ng:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Ch\u1EE7 \u0111\u1EC1:</strong> ${subject || "Kh\xF4ng c\xF3"}</p>
        <p><strong>N\u1ED9i dung:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `;
      await transporter.sendMail({
        from: `"Ch\u1EA1m Website" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        // Send back to our main email
        subject: `[Li\xEAn H\u1EC7] ${subject || "C\xF3 tin nh\u1EAFn m\u1EDBi t\u1EEB kh\xE1ch h\xE0ng"}`,
        html: emailContent,
        replyTo: email
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send contact email", details: error.message });
    }
  });
  const normalizeElement = (s) => {
    if (!s) return s;
    s = s.toUpperCase();
    if (s.includes("KIM")) return "KIM";
    if (s.includes("TH\u1EE6Y") || s.includes("THUY")) return "THUY";
    if (s.includes("H\u1ECEA") || s.includes("HOA")) return "HOA";
    if (s.includes("M\u1ED8C") || s.includes("MOC")) return "MOC";
    if (s.includes("TH\u1ED4") || s.includes("THO")) return "THO";
    return s;
  };
  async function decrementInventoryFromOrder(orderId, items) {
    if (!adminDb) return;
    try {
      const docRef = adminDb.collection("admin").doc("inventory");
      await adminDb.runTransaction(async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists) return;
        const inv = docSnap.data();
        let products = inv.products || {};
        let historyLogs = [];
        items.forEach((item) => {
          const qty = item.quantity || 1;
          const cat = item.product?.category;
          if (!cat) return;
          const { element, partnerElement } = item.customization || {};
          let comboId = item.customization?.comboId;
          if (partnerElement && !comboId) comboId = "mirror_combo";
          const normEl = normalizeElement(element);
          const normPartnerEl = normalizeElement(partnerElement);
          const actualCat1 = cat === "combo" && comboId === "mirror_combo" ? "mirror" : cat === "combo" ? "clip-1" : cat;
          if (products[actualCat1] && products[actualCat1][normEl] !== void 0) {
            products[actualCat1][normEl] = Math.max(0, products[actualCat1][normEl] - qty);
            historyLogs.push({ category: actualCat1, item: normEl, qty, type: "product" });
          }
          if (normPartnerEl) {
            const actualCat2 = comboId === "mirror_combo" ? "mirror" : cat === "combo" ? "clip-1" : cat;
            if (products[actualCat2] && products[actualCat2][normPartnerEl] !== void 0) {
              products[actualCat2][normPartnerEl] = Math.max(0, products[actualCat2][normPartnerEl] - qty);
              historyLogs.push({ category: actualCat2, item: normPartnerEl, qty, type: "product" });
            }
          }
          const charmIds = [];
          if (item.customization?.selectedZodiacCharmId) charmIds.push(item.customization.selectedZodiacCharmId);
          if (item.customization?.selectedZodiacCharmId2) charmIds.push(item.customization.selectedZodiacCharmId2);
          let charms = inv.charms || {};
          charmIds.forEach((cId) => {
            if (cId && charms[cId] !== void 0) {
              charms[cId] = Math.max(0, charms[cId] - qty);
              historyLogs.push({ category: "charm", item: cId, qty, type: "charm" });
            }
          });
          inv.charms = charms;
        });
        if (historyLogs.length > 0) {
          let history = inv.history || [];
          history.unshift({
            id: `LOG-${orderId}-${Date.now()}`,
            orderId,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            decrements: historyLogs
          });
          transaction.update(docRef, { products, charms: inv.charms, history, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
        }
      });
      console.log(`Successfully decremented inventory for order ${orderId}`);
    } catch (err) {
      console.error("Failed to decrement inventory in transaction:", err);
    }
  }
  app.post("/api/record-preorder-sheet", async (req, res) => {
    try {
      const { orderId, userId, customerInfo, items, subtotal, packagingFee, total, discountAmount, discountCode, wrappingOption, paymentMethod, deliveryMethod, createdAt } = req.body;
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        console.warn("Google Sheets credentials not configured. Not saving to sheet.");
        return res.json({ success: true, message: "Credentials not configured" });
      }
      await decrementInventoryFromOrder(orderId, items).catch(console.error);
      const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
      const auth = new import_googleapis.google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
      });
      const sheets = import_googleapis.google.sheets({ version: "v4", auth });
      const itemsString = items.map((item) => {
        const c = item.customization || {};
        if (c.partnerElement && !c.comboId) {
          c.comboId = "mirror_combo";
        }
        let details = [];
        if (c.element) {
          const el = ELEMENTS.find((e) => e.type === c.element);
          details.push(`M\u1EC7nh: ${el ? el.nameVi : c.element}`);
        }
        if (c.text) {
          let styleName = "Kh\u1EAFc/d\xE1n";
          if (c.letteringStyle === "embossed") styleName = "Ch\u1EEF n\u1ED5i";
          else if (c.letteringStyle === "3D") styleName = "Ch\u1EEF 3D";
          else if (c.letteringStyle === "sticker") styleName = "Ch\u1EEF d\xE1n";
          let color = c.textStyleOption || "";
          if (color === "silver") color = "B\u1EA1c";
          if (color === "gold") color = "V\xE0ng";
          if (color === "white") color = "Tr\u1EAFng";
          if (color === "pink") color = "H\u1ED3ng";
          details.push(`${styleName}: "${c.text}" (M\xE0u: ${color})`);
        }
        if (c.selectedZodiacCharmId) {
          const charm = CHARMS.find((ch) => ch.id === c.selectedZodiacCharmId);
          if (charm) details.push(`Charm: ${charm.vietnameseName || charm.name}`);
        }
        if (c.selectedStickerIds && c.selectedStickerIds.length > 0) {
          const stickerNames = c.selectedStickerIds.map((id) => {
            const st = CHARMS.find((ch) => ch.id === id);
            return st ? st.vietnameseName || st.name : id;
          }).join(", ");
          details.push(`Trang tr\xED: ${stickerNames}`);
        }
        if (c.partnerElement) {
          const sp2Label = c.comboId === "mirror_combo" ? "G\u01B0\u01A1ng (SP2)" : "SP2";
          details.push(`--- ${sp2Label} ---`);
          const el = ELEMENTS.find((e) => e.type === c.partnerElement);
          details.push(`M\u1EC7nh ${sp2Label}: ${el ? el.nameVi : c.partnerElement}`);
        }
        if (c.text2) {
          const sp2Label = c.comboId === "mirror_combo" ? "G\u01B0\u01A1ng (SP2)" : "SP2";
          let styleName = `Kh\u1EAFc/d\xE1n ${sp2Label}`;
          if (c.letteringStyle2 === "embossed") styleName = `Ch\u1EEF n\u1ED5i ${sp2Label}`;
          else if (c.letteringStyle2 === "3D") styleName = `Ch\u1EEF 3D ${sp2Label}`;
          else if (c.letteringStyle2 === "sticker") styleName = `Ch\u1EEF d\xE1n ${sp2Label}`;
          let color = c.textStyleOption2 || "";
          if (color === "silver") color = "B\u1EA1c";
          if (color === "gold") color = "V\xE0ng";
          if (color === "white") color = "Tr\u1EAFng";
          if (color === "pink") color = "H\u1ED3ng";
          details.push(`${styleName}: "${c.text2}" (M\xE0u: ${color})`);
        }
        if (c.selectedZodiacCharmId2) {
          const sp2Label = c.comboId === "mirror_combo" ? "G\u01B0\u01A1ng (SP2)" : "SP2";
          const charm = CHARMS.find((ch) => ch.id === c.selectedZodiacCharmId2);
          if (charm) details.push(`Charm ${sp2Label}: ${charm.vietnameseName || charm.name}`);
        }
        if (c.selectedStickerIds2 && c.selectedStickerIds2.length > 0) {
          const sp2Label = c.comboId === "mirror_combo" ? "G\u01B0\u01A1ng (SP2)" : "SP2";
          const stickerNames = c.selectedStickerIds2.map((id) => {
            const st = CHARMS.find((ch) => ch.id === id);
            return st ? st.vietnameseName || st.name : id;
          }).join(", ");
          details.push(`Trang tr\xED ${sp2Label}: ${stickerNames}`);
        }
        let itemName = item.product.vietnameseName || item.product.name;
        if (c.comboId === "couple_combo") {
          itemName = `Combo Ch\u1EA1m C\xF9ng Nhau (${itemName})`;
        } else if (c.comboId === "mirror_combo") {
          itemName = `Combo Ch\u1EA1m \xC1nh Nh\xECn (${itemName} & G\u01B0\u01A1ng)`;
        }
        return `${itemName} (x${item.quantity})
  ${details.join("\n  ")}`;
      }).join("\n\n");
      const dateStr = new Date(createdAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
      const row = [
        orderId || "-",
        dateStr,
        customerInfo.name || "",
        customerInfo.email || "",
        customerInfo.phone || "",
        deliveryMethod === "direct" ? "UEH - C\u01A1 s\u1EDF B - 279 Nguy\u1EC5n Tri Ph\u01B0\u01A1ng, Ph\u01B0\u1EDDng Di\xEAn H\u1ED3ng, TP.HCM" : `${customerInfo.address}${customerInfo.ward ? `, ${customerInfo.ward}` : ""}, ${customerInfo.district}${customerInfo.province ? `, ${customerInfo.province}` : ""}`,
        customerInfo.note || "",
        itemsString,
        subtotal,
        discountAmount ? `${discountAmount} (${discountCode || ""})` : "0",
        total,
        paymentMethod,
        deliveryMethod,
        wrappingOption === "giftBox" ? "H\u1ED9p Qu\xE0 Th\u01B0\u1EE3ng H\u1EA1ng" : "H\u1ED9p G\xF3i Ti\xEAu Chu\u1EA9n",
        userId || "Guest",
        customerInfo.email || "",
        // Thêm email khách hàng ở cột ngay sau UID khách hàng
        "",
        // Người đối soát
        req.body.paymentStatus || "Ch\u01B0a thanh to\xE1n",
        req.body.paymentProofUrl ? `=HYPERLINK("${req.body.paymentProofUrl}", "Xem \u1EA3nh")` : ""
      ];
      const sheetInfo = await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
      const firstSheetName = sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${firstSheetName}!A:S`,
        // Update range to S
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row]
        }
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error writing to Google Sheets:", error);
      res.status(500).json({ error: "Failed to write to Google Sheets", details: error.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
