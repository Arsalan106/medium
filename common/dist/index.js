import z from 'zod';
export const signupInput = z.object({
    username: z.string(),
    password: z.string().min(6),
    name: z.string().optional()
});
export const signinInput = z.object({
    username: z.string(),
    password: z.string().min(6),
});
export const blogInput = z.object({
    title: z.string(),
    content: z.string()
});
export const updateBlogInput = z.object({
    id: z.string(),
    title: z, string() { },
    content: z.string()
});
//# sourceMappingURL=index.js.map