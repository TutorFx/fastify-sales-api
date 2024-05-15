import z from 'zod'

import cliente from './schemas/cliente'
import pedido from './schemas/pedido'
import produto from './schemas/produto'

export type ICliente = z.infer<typeof cliente>
export type IPedido = z.infer<typeof pedido>
export type IProduto = z.infer<typeof produto>

