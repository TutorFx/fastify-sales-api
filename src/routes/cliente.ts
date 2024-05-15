import { Server } from 'restify';
import { Pool } from 'pg';

export default function ( app: Server, pool: Pool ) {
    app.get('/echo/:name', function (req, res, next) {
        res.send(req.params.name);
        return next();
    });
}