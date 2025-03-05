import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { join } from 'node:path'
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import {initDB} from "../db/data-sourse";
import getRepos, {IRepos} from "../repos";

declare module "fastify" {
    export interface FastifyInstance {
        repos: IRepos;
    }
}

export const server = fastify({logger:true});

async function run(){

    server.decorate("repos", getRepos(await initDB()))

    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    server.register(fastifyAutoload,{
        dir: join(__dirname, "routes"),
        ignoreFilter: 'schemas',
        options: {
            prefix: '/api'
        },
        autoHooks: true,
        cascadeHooks: true
    })

   // console.log(server)

    server.get("/", (req, res) => {
        res.status(200).send({
            status: "success",
        })
    })

    await server.ready()
    server.listen({
                port: 3000,
                host: "127.0.0.1",
            },
            ()=>{
                console.log("Server started on port 3000");
            }
        )

}

run()