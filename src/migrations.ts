import db from './utils/db';

const pool = db();

pool.query(`
-- Cria a tabela produtos
CREATE TABLE produtos (
    id_produto UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

-- Cria a tabela clientes
CREATE TABLE clientes (
    id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Cria a tabela pedidos
CREATE TABLE pedidos (
    id_pedido UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data DATE NOT NULL,
    id_cliente UUID NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Cria a tabela pedido_itens
CREATE TABLE pedido_itens (
    id_pedido_item UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_pedido UUID NOT NULL,
    id_produto UUID NOT NULL,
    qtde INTEGER NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
`).then(() => console.log('sucesso migration'));

pool.end().then(() => console.log('encerrando migration'))