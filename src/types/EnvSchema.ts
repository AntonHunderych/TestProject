import z from 'zod';

export const EnvSchema = z.object({
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.number(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
  SENDGRID_API_KEY: z.string(),
  WEB_APP_URL: z.string(),
  SENDER_EMAIL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
