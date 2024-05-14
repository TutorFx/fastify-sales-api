import { Server } from 'restify';

export default function (app: Server) {
    app.get('/echo/:name', function (req, res, next) {
        res.send(req.params);
        return next();
    });
}