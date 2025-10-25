import z from 'zod'

export const signupInput=z.object({
    username:z.string(),
    password:z.string().min(6),
    name:z.string().optional()  
})

export const signinInput=z.object({
    username:z.string(),
    password:z.string().min(6),
})

export const blogInput=z.object({
    title:z.string(),
    content:z.string()
})

export const updateBlogInput=z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
})
export type updateBlogInput=z.infer<typeof updateBlogInput>
export type blogInput= z.infer<typeof blogInput>
export type  SigninInput = z.infer<typeof signinInput>
export type  SignupInput = z.infer<typeof signupInput>