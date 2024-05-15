import { createServer, plugins } from 'restify'
import db from './utils/db';
import produto from './routes/produto';
 
const server = createServer();
const pool = db();

server.use(plugins.bodyParser());

produto(server, pool);

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});