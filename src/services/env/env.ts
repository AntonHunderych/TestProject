import 'dotenv/config';
import { EnvSchema } from '../../types/EnvSchema';

EnvSchema.parse(process.env);
