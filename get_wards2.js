import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();
async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Liet ke cac Phuong o TPHCM vua duoc doi ten thanh chu vao cuoi nam 2024 (ví dụ cac phuong dang mang so nhu phuong 5 quan 10 duoc doi ten, hoac phuong 1 quan 3, ...). Tra loi ngan gon: Ten Quan - Ten cac Phuong moi (chu)',
  });
  console.log(response.text);
}
run();
