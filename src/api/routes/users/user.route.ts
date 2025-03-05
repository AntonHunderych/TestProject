import {createRespUserSchema, createUserSchema} from "./schemas/createUserSchema";
import {getUsersRespSchema} from "./schemas/getUsersSchema";
import {UUIDGetter} from "../schemas/UUIDGetter";
import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";

const routes : FastifyPluginAsyncZod = async (f) =>{

    const _userRepo = f.repos.userRepo

    f.get(
        "/",
        {
            schema: {
                response: {
                    200: getUsersRespSchema,
                },
            }
        },
        async () => {
            const _users = await _userRepo.getAllUsers()
            return {
                data: _users.map(user => createRespUserSchema.parse(user)),
                count: _users.length
            }
        }
    )

    f.get(
        "/:id",
        {
            schema: {
                params: UUIDGetter,
                response: {
                    200: createRespUserSchema,
                },
            }
        },
        async (req) => {
            return createRespUserSchema.parse(await _userRepo.getUserById(req.params.id))
        }
    )

    f.post(
        "/",
        {
            schema: {
                body: createUserSchema,
                response: {
                    200: createRespUserSchema,
                },
            }
        },
        async (req) => {
            return createRespUserSchema.parse(await _userRepo.createUser(req.body))
        }
    )

    f.delete(
        "/:id",
        {
            schema: {
                params: UUIDGetter,
                response: {
                    200: {
                        type: "boolean"
                    },
                },
            }
        },
        async (req) => {
            return await _userRepo.deleteUser(req.params.id)
        }
    )

    f.post(
        "/:id",
        {
            schema: {
                params: UUIDGetter,
                body: createUserSchema,
                response: {
                    200: createRespUserSchema,
                },
            },
        },
        async (req) => {
            return createRespUserSchema.parse(await _userRepo.updateUser(req.params.id, req.body))
        }
    )

}

export default routes;