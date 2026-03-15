/// <reference types="bun" />

// Image imports
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.webp" {
  const value: any;
  export default value;
}

// Environment Variables
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_BASE: string;
  }
}
