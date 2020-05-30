
import { Request,Response } from 'express';
import { db } from '../index';
export async function addFight(request:Request, response:Response) {
    try {
      const { winner, losser, title } = request.body;
      const data = {
        winner,
        losser,
        title
      } 
      
      const fightRef = await db.collection('fights').add(data);
      const fight = await fightRef.get();
       response.json({
        id: fightRef.id,
        data: fight.data()
       });
    } catch(error){
      response.status(500).send(error);
    }
}
export async function getFightById(request:Request, response:Response) {
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
}

export async function getAll(request:Request, response:Response){
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
}

export async function update(request:Request, response:Response){
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
}

export async function deleteFight(request:Request, response:Response){
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
}