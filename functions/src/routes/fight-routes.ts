import { addFight } from '../controllers/fight-controller';
import { Application } from "express";

export function fightRoutes(app: Application) {
    app.post('/fights', addFight);
}