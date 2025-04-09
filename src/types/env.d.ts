// Here we all env vars
import { Env } from './EnvSchema';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
