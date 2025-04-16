import z from 'zod';
import { EContentType } from '../../../../../types/enum/EFileTypes';

export const getUploadUrlSchema = z.object({
  fileName: z.string(),
  fileType: z.nativeEnum(EContentType),
});
