import { createServer } from 'restify'
import teste from './routes/teste'

const server = createServer({
    name: 'restify-sales-api',
    version: '1.0.0'
});

teste(server)

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});