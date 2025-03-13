import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import { roleHook } from '../../../hooks/roleHook';
import { RoleEnum } from '../../../../Types/Enum/RoleEnum';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { dataFetchHook } from '../hooks/dataFetchHook';
import z from 'zod';
import { PermissionsEnumSchema } from '../../../../Types/Enum/PermisionsEnum';
import { createRoleHandler } from '../../../../controllers/ws/roles/createRoleHandler';

const routes: FastifyPluginAsyncZod = async (fastify: FastifyInstance,) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>()

  const workSpaceRolesRepo = f.repos.workSpaceRolesRepo;

  f.addHook("preHandler",roleHook([RoleEnum.USER]))
  f.addHook("preHandler", dataFetchHook)
  f.addHook("preHandler", accessToWorkSpaceHook)


  f.get(
    "/admin/",
    {
      schema:{

      },
      preHandler: roleHook([RoleEnum.ADMIN])
    },
    async () => {
      return await workSpaceRolesRepo.getAll()
    }
  )

  f.post(
    "/",
    {
      schema:{
          body: z.object({
            name: z.string(),
            permissions: z.array(PermissionsEnumSchema),
          })
      }
    },
    async (req,res) => {
      return await createRoleHandler(workSpaceRolesRepo,req.workSpace.id,req.body.name,req.body.permissions,res)
    }
  )
  f.put(
    "/",
    {
      schema:{
        body: z.object({
          name: z.string(),
          permissions:  z.array(PermissionsEnumSchema)
        })
      }
    },
    async (req) => {
      return await workSpaceRolesRepo.updatePermissionOnRole(req.workSpace.id,req.body.name,req.body.permissions)
    }
  )
}
export default routes;