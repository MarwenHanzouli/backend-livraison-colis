import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { fightRoutes } from './routes/fight-routes';
admin.initializeApp();
export const db = admin.firestore();

const app = express();
const main = express();
fightRoutes(app);
main.use(cors({ origin: true }));
main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.get('/warmup', (request, response) => {

    response.send('Warming up friend.');

});



app.get('/fights/:id', async (request, response) => {
  try {
    const fightId = request.params.id;

    if (!fightId) throw new Error('Fight ID is required');

    const fight = await db.collection('fights').doc(fightId).get();

    if (!fight.exists){
        throw new Error('Fight doesnt exist.')
    }

    response.json({
      id: fight.id,
      data: fight.data()
    });

  } catch(error){

    response.status(500).send(error);

  }
});

app.get('/fights', async (request, response) => {
  try {
    const fightQuerySnapshot = await db.collection('fights').get();
    let fights:any[]=[];
    fightQuerySnapshot.forEach(
        (doc) => {
            fights.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );

    response.json(fights);

  } catch(error){

    response.status(500).send(error);

  }

});

app.put('/fights/:id', async (request, response) => {
  try {

    const fightId = request.params.id;
    const title = request.body.title;

    if (!fightId) throw new Error('id is blank');

    if (!title) throw new Error('Title is required');

    const data = { 
        title
    };
    const fightRef = await db.collection('fights')
        .doc(fightId)
        .set(data, { merge: true });
    console.log(fightRef)
    response.json({
        id: fightId,
        data
    })


  } catch(error){

    response.status(500).send(error);

  }

});

app.delete('/fights/:id', async (request, response) => {
  try {

    const fightId = request.params.id;

    if (!fightId) throw new Error('id is blank');

    await db.collection('fights')
        .doc(fightId)
        .delete();

    response.json({
        id: fightId,
    })


  } catch(error){

    response.status(500).send(error);

  }

});