import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { fightRoutes } from './routes/fight-routes';
import { usersRoutes } from './routes/users-routes';
admin.initializeApp();
export const db = admin.firestore();

const app = express();
const main = express();
fightRoutes(app);
usersRoutes(app);
main.use(cors({ origin: true }));
main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);