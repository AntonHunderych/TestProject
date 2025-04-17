import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { getUploadUrl } from '../../../../controllers/ws/file/getUploadUrl';
import { getDownloadUrl } from '../../../../controllers/ws/file/getDownloadUrl';
import { getUploadUrlSchema } from './schemas/getUploadUrlSchema';
import { getDownloadUrlSchema } from './schemas/getDownloadUrlSchema';
import { deleteFileSchema } from './schemas/deleteFileSchema';
import { deleteFile } from '../../../../controllers/ws/file/deleteFile';
import { fileUploadCompletedSchema } from './schemas/fileUploadCompletedSchema';
import { uploadComplete } from '../../../../controllers/ws/file/uploadComplete';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { EContentType } from '../../../../types/enum/EFileTypes';
import { ApplicationError } from '../../../../types/errors/ApplicationError';
import { uploadFile } from '../../../../controllers/ws/file/uploadFile';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceFileRepo = f.repos.workSpaceFileRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.post(
    '/',
    {
      schema: {
        body: getUploadUrlSchema,
        response: {
          200: z.string({}),
        },
      },
    },
    async (req) => {
      return await getUploadUrl(
        f.withTransaction,
        f.fileManager,
        workSpaceFileRepo,
        req.body.fileName,
        req.body.fileType,
        req.workSpace.id,
      );
    },
  );

  f.post('/file', {}, async (req) => {
    try {
      const data = await req.file();
      if (!data) {
        throw new ApplicationError('File not found');
      }
      return await uploadFile(
        f.withTransaction,
        f.fileManager,
        workSpaceFileRepo,
        data.filename,
        data.mimetype as EContentType,
        await data.toBuffer(),
        req.workSpace.id,
      );
    } catch (e) {
      throw new ApplicationError('error upload file', e);
    }
  });

  f.get(
    '/',
    {
      schema: {
        querystring: getDownloadUrlSchema,
        response: {
          200: z.string({}),
        },
      },
    },
    async (req) => {
      return await getDownloadUrl(f.fileManager, workSpaceFileRepo, req.query.fileName, req.workSpace.id);
    },
  );

  f.delete(
    '/',
    {
      schema: {
        body: deleteFileSchema,
      },
    },
    async (req) => {
      await deleteFile(f.withTransaction, f.fileManager, workSpaceFileRepo, req.body.fileName, req.workSpace.id);
    },
  );

  f.post(
    '/complete',
    {
      schema: {
        body: fileUploadCompletedSchema,
      },
    },
    async (req) => {
      await uploadComplete(workSpaceFileRepo, req.body.fileName, req.workSpace.id, req.body.success);
    },
  );
};

export default routes;
