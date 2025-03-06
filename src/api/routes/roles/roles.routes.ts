import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import z from "zod";


const routes : FastifyPluginAsyncZod = async (f) =>{

    const roleRepo = f.repos.roleRepo

    f.get(
        "/",
        {
            schema: {

            }
        },
        async () => {
            return await roleRepo.getAllRoles()
        }
    )

    f.get(
        "/:value",
        {
            schema: {
                params: z.object({ value: z.string() })
            }
        },
        async (req) => {
            return await roleRepo.getRoleByValue(req.params.value)
        }
    )

    f.post(
        "/:value",
        {
            schema: {
                params: z.object({
                    value: z.string().min(1).max(100)
                }),
                body: z.object({
                    description: z.string().optional()
                }).optional().nullable()
            }
        },
        async (req) => {
            return await roleRepo.addRole({value: req.params.value, description: req.body?.description})
        }
    )

    f.delete(
        "/:id",
        {
            schema: {
                params: z.object({ id: z.string() })
            }
        },
        async (req) => {
            return await roleRepo.deleteRole(req.params.id)
        }
    )

}

export default routes;