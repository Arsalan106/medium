import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
type Variables = {
  userId: string
}

export const blogRouter = new Hono<{ Variables: Variables }>()

blogRouter.use('/*', async (c:any, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, "Arsalan");
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})

blogRouter.post('/', async (c:any) => {
    const databaseUrl = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza183VTBCWEozcXJ6ZEpqQTNIVUMzMFQiLCJhcGlfa2V5IjoiMDFLODNTMEJYVlJLVEo0NjFYOEpBMTM3NloiLCJ0ZW5hbnRfaWQiOiIzZmEwZTRhN2E2YzE4YzBmZTA3MTJiODNiYTYwMzhhOGJkYmY2MWU4ODAwZDNkYjVhMDM3ZDhhYWNiZDRhZDllIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDRlYzc4MjgtMGM4NC00YjgwLWI1OTktZmRjNjBlZmIzOTc2In0.BQoGuEvccbUPTajWuD7QpgrT7uwZYy0iOdmDwbKbves"
    const body = await c.req.json();
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
    try {
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        //@ts-ignore
        return c.json({ id: response.authorId, title: response.title })
    } catch (e: any) {
        c.status(403);
        return c.json({ e: e.message })
    }
})


blogRouter.put('/', async (c) => {
    const databaseUrl = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza183VTBCWEozcXJ6ZEpqQTNIVUMzMFQiLCJhcGlfa2V5IjoiMDFLODNTMEJYVlJLVEo0NjFYOEpBMTM3NloiLCJ0ZW5hbnRfaWQiOiIzZmEwZTRhN2E2YzE4YzBmZTA3MTJiODNiYTYwMzhhOGJkYmY2MWU4ODAwZDNkYjVhMDM3ZDhhYWNiZDRhZDllIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDRlYzc4MjgtMGM4NC00YjgwLWI1OTktZmRjNjBlZmIzOTc2In0.BQoGuEvccbUPTajWuD7QpgrT7uwZYy0iOdmDwbKbves"
    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {

        const response = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({ id: response.id })
    } catch (e: any) {
        c.status(403);
        return c.json({ e: e.message })
    }
})


blogRouter.get('/:id', async (c) => {
    const databaseUrl = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza183VTBCWEozcXJ6ZEpqQTNIVUMzMFQiLCJhcGlfa2V5IjoiMDFLODNTMEJYVlJLVEo0NjFYOEpBMTM3NloiLCJ0ZW5hbnRfaWQiOiIzZmEwZTRhN2E2YzE4YzBmZTA3MTJiODNiYTYwMzhhOGJkYmY2MWU4ODAwZDNkYjVhMDM3ZDhhYWNiZDRhZDllIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDRlYzc4MjgtMGM4NC00YjgwLWI1OTktZmRjNjBlZmIzOTc2In0.BQoGuEvccbUPTajWuD7QpgrT7uwZYy0iOdmDwbKbves"
    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        return c.json({ blog });
    } catch (e: any) {
        c.status(403);
        return c.json({ error: e.message });
    }
})



