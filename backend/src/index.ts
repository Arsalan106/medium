import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import {userRouter}  from './routes/user'
import { blogRouter } from './routes/blog'
// const app = new Hono()
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();
// app.use("/api/v1/blog",async (c,next)=>{
// 	//@ts-ignore
// 	const header=await c.req.headers('authorization');
// 	try{
// 		//@ts-ignore
// 		const response=await verify(header,"Arsalan");
// 		await next();
// 	}catch(e){
// 		//@ts-ignore
// 		return c.json({error:e.message})
// 	}
	
// })
app.route('/api/v1/user',userRouter);

app.route('/api/v1/blog',blogRouter);


export default app
