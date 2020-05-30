
import { Request,Response } from 'express';
import { db } from '../index'
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