import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { fightRoutes } from './routes/fight-routes';
import { usersRoutes } from './routes/users-routes';
import * as serviceAccount from '../livraison-colis-firebase-adminsdk.json';
import { nottificationsRoutes } from './routes/notifications-routes';
admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(serviceAccount)),
    databaseURL: "https://livraison-colis-1ef7d.firebaseio.com"
});
export const db = admin.firestore();

const app = express();
const main = express();
fightRoutes(app);
usersRoutes(app);
nottificationsRoutes(app);
main.use(cors({ origin: true }));
main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);