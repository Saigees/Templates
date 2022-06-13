declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      MONGO_URL: string;
      VERSION: string;
    }
  }
}

export {}
