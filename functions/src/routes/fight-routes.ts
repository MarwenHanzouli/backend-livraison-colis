import { addFight,getFightById,getAll,update,deleteFight } from '../controllers/fight-controller';
import { Application } from "express";
import { isAuthenticated } from '../authentication/authenticated';
import { isAuthorized } from '../authentication/authorized';
export function fightRoutes(app: Application) {
    app.post('/fights', addFight);
    app.get('/fights/:id', getFightById);  
    app.get('/fights',isAuthenticated,isAuthorized({ hasRole: ['admin', 'client'] }), getAll);
    app.put('/fights/:id', update);
    app.delete('/fights/:id', deleteFight);
    app.get('/warmup', (request, response) => {
        response.send('Warming up friend.');
    });
}