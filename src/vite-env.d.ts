/// <reference types="vite/client" />

interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}

declare module "*.svg" {
  const content: string;
  export default content;
}
