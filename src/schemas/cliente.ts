import { z } from 'zod';

export default z.object({
    id_cliente: z.string().uuid().optional(),
    nome: z.string(),
    email: z.string().email(),
})