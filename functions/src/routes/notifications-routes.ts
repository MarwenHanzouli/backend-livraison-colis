import { Application } from "express";
import { notifier } from '../controllers/notifications-controller';
export function nottificationsRoutes(app: Application){
    app.post("/notifcations/notifier",notifier);
}