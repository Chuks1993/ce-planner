declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SESSION_SECRET: string;
      REDIS_URL: string;
      CORS_ORIGIN: string;
      PORT: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_MESSAGE_SERVICE_SID: string;
      GMAIL_USER: string;
      GMAIL_PASSWORD: string;
      EMAIL_FROM: string;
      CLIENT_URL: string;
      TWILIO_VERIFY_FRIENDLY_NAME: string;
      NODEMAILER_HOST: string;
      NODEMAILER_PORT: string;
      NODEMAILER_SERVICE: string;
    }
  }
}

export {}
