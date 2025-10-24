import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign } from 'hono/jwt'
export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();



userRouter.post('/signup', async (c) => {
  const databaseUrl ="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza183VTBCWEozcXJ6ZEpqQTNIVUMzMFQiLCJhcGlfa2V5IjoiMDFLODNTMEJYVlJLVEo0NjFYOEpBMTM3NloiLCJ0ZW5hbnRfaWQiOiIzZmEwZTRhN2E2YzE4YzBmZTA3MTJiODNiYTYwMzhhOGJkYmY2MWU4ODAwZDNkYjVhMDM3ZDhhYWNiZDRhZDllIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDRlYzc4MjgtMGM4NC00YjgwLWI1OTktZmRjNjBlZmIzOTc2In0.BQoGuEvccbUPTajWuD7QpgrT7uwZYy0iOdmDwbKbves"
  const prisma = new PrismaClient({
		datasourceUrl: databaseUrl	,
	}).$extends(withAccelerate());
  const body = await c.req.json();
  	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, "Arsalan");
		return c.json({ jwt });
	} catch(e) {
    c.status(403);
    //@ts-ignore
		return c.json({ error: e.message });
	}

})

userRouter.post('/signin',async (c)=>{
  const databaseUrl ="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza183VTBCWEozcXJ6ZEpqQTNIVUMzMFQiLCJhcGlfa2V5IjoiMDFLODNTMEJYVlJLVEo0NjFYOEpBMTM3NloiLCJ0ZW5hbnRfaWQiOiIzZmEwZTRhN2E2YzE4YzBmZTA3MTJiODNiYTYwMzhhOGJkYmY2MWU4ODAwZDNkYjVhMDM3ZDhhYWNiZDRhZDllIiwiaW50ZXJuYWxfc2VjcmV0IjoiNDRlYzc4MjgtMGM4NC00YjgwLWI1OTktZmRjNjBlZmIzOTc2In0.BQoGuEvccbUPTajWuD7QpgrT7uwZYy0iOdmDwbKbves"
  const prisma= new PrismaClient({
	datasourceUrl:databaseUrl
  }).$extends(withAccelerate());

  const  body =await c.req.json();
	const user=await prisma.user.findUnique({
		where:{
			email:body.email
		}
	})
	if(!user){
		c.status(403);
		return c.json({error:"User does not exist"});
	}
	const jwt=await sign({id:user.id},"Arsalan");
	return c.json({jwt,message:"User signed successfully"});
})
