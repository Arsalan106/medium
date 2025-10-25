import z from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const blogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export declare const updateBlogInput: z.ZodObject<{
    id: z.ZodString;
    title: typeof z;
    string: () => any;
    content: z.ZodString;
}, z.z.core.$strip>;
export type updateBlogInput = z.infer<typeof updateBlogInput>;
export type blogInput = z.infer<typeof blogInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type SignupInput = z.infer<typeof signupInput>;
//# sourceMappingURL=index.d.ts.map