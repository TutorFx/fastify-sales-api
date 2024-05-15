import { z } from 'zod';

export default z.object({
    id_produto: z.string().uuid().optional(),
    nome: z.string(),
    preco: z.number(),
})