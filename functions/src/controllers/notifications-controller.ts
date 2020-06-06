import { Request,Response } from 'express';
//import { db } from '../index';
import * as admin from 'firebase-admin';
export async function notifier(request:Request, response:Response) {
    try {
      //const { listUid } = request.body;
    //   let registrationTokens:string[]=[];
    //   for(let i=0;i<listUid.length;i++){
    //     const userDoc = await db.collection('users').doc(listUid[i]).get();
    //     let x=userDoc.data();
    //     if(x!==undefined)
    //     {
    //         registrationTokens.concat(x['tokens']);
    //     }
    //   }
      
      var payload = {
        notification: {
          title: "Account Deposit",
          body: "A deposit to your savings account has just cleared."
        },
        data: {
          account: "Savings",
          balance: "$3020.25"
        }
      };
      var options = {
        priority: "normal",
        timeToLive: 60 * 60
      };
      admin.messaging().sendToDevice("e_R68KdYSPObIMf8aQgo6N:APA91bG-wsBrzdqrfVwsQDpyHRuifRDUJqTG0zOyb6Xrh0boE5o3G8XHwahDVYxenmLCPUomhfI1_yiQxllNRMq6cVMR9gh7vz_JByFElqxCsdpzPQyqqJIgX-Etzqgt2HTzl0xoHDGw", payload, options)
      .then(function(res) {
        console.log("Successfully sent message:", res);
        response.json({
            reponse: res
           });
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
       
    } catch(error){
      response.status(500).send(error);
    }
}