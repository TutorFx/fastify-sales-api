import { Server } from 'restify';
import { Pool } from 'pg';
import { v4 } from 'uuid';
import produto from '../schemas/produto';
import { RestifyError } from '../utils/errors';
import { z } from 'zod';
import { IProduto } from '../types';

const createProduct = async (productData, pool: Pool) : Promise<IProduto> => {
    const validatedProduct = produto.parse(productData);
    const { nome, preco } = validatedProduct;
    const result = await pool.query('INSERT INTO Produtos (nome, preco) VALUES ($1, $2) RETURNING *', [nome, preco]);
    return result.rows[0];
};

const getProducts = async (pool: Pool) : Promise<IProduto[]> => {
    const result = await pool.query('SELECT * FROM produtos');
    
    return result.rows.map(p => produto.parse(
        {
            ...p,
            preco: parseFloat(p.preco)
        }
    ));
};

const getProductByID = async (id: string, pool: Pool) : Promise<IProduto | null> => {
    const safeId = z.string().uuid().parse(id);
    const result = await pool.query(`SELECT * FROM produtos WHERE id_produto = $1`, [safeId]);
    return result.rows.map(p => produto.parse(
        {
            ...p,
            preco: parseFloat(p.preco)
        }
    ))[0] ?? null;
};

export default function (app: Server, pool: Pool) {
    app.get('/produto', async function (req, res) {
        try {
            const products = await getProducts(pool)
            res.send(products);
        } catch (error) {
            res.send(...RestifyError(error))
        }
    });

    app.get('/produto/:id', async function (req, res) {
        try {
            res.send(await getProductByID(req.params.id, pool));
        } catch (error) {
            res.send(...RestifyError(error));
        }
    });

    app.post('/produto', async function (req, res) {
        try {
            res.send(await createProduct(req.body, pool))
        } catch (error) {
            res.send(...RestifyError(error));
        }
    })
}