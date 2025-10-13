import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { z } from "zod";
import { betterAuthPlugin, OpenAPI } from "./http/plugins/better-auth";

const app = new Elysia()
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		}),
	)
	.use(betterAuthPlugin)
	.get("/", () => "Hello Elysia")
	.get(
		"/users/:id",
		({ params, user }) => {
			const userId = params.id;

			const authenticatedUserName = user.name;
			console.log({ authenticatedUserName });

			return { id: userId, name: "Miguel Pereira" };
		},
		{
			auth: true,
			detail: {
				summary: "Buscar um Utilizador pelo ID",
				description: "algo",
				tags: ["users"],
			},
			params: z.object({
				id: z.string(),
			}),
			response: {
				200: z.object({
					id: z.string(),
					name: z.string(),
				}),
			},
		},
	)
	.listen(3333);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
