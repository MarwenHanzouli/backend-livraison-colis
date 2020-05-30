import { Application } from "express";
import { create } from '../controllers/users-controller';
export function usersRoutes(app: Application){
    app.post("/users/add",create);
}