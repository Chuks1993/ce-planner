declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENDPOINT: string;
    }
  }
}

export {}
