import { Request,Response } from 'express';
import * as admin from 'firebase-admin';
import { db } from '../index';
import { User } from '../models/User';

export async function create(req: Request, res: Response) {
    try {
        const { nom, prenom, password, email, role, telephone,deviceToken } = req.body
        if (!nom || !prenom || !password || !email || !role || !telephone) {
            return res.status(400).send({ message: 'Missing fields' })
        }
        let displayName=nom+" "+prenom;
        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        });
        await admin.auth().setCustomUserClaims(uid, { role });
        //let x=await admin.auth().getUser(uid);
        let verified:boolean=false;
        if(role==="client"){
            verified=true;
        }
        let deviceTokens:string[]=[];
        if(deviceToken){
            deviceTokens.push(deviceToken);
        }
        let userObj=new User(nom,prenom,uid,email,telephone,role,false,false,verified,deviceTokens);
        let userDoc={
            uid:userObj.uid,
            nom:userObj.nom,
            prenom:userObj.prenom,
            email:userObj.email,
            telephone:userObj.telephone,
            role:userObj.role,
            emailVerified:userObj.emailVerified,
            disabled:userObj.disabled,
            verified:userObj.verified,
            tokens:userObj.tokens ? userObj.tokens : []
        }
        const userRef = await db.doc(`users/${uid}`).create(userDoc);
        console.log(userRef);
        const users = await db.collection('users').doc(uid);
        const u = await users.get();
        res.json({
            id: u.id,
            data: u.data()
        });
        return res.status(201).send()

        
    } catch (err) {
        return handleError(res, err)
    }
 }
 
 function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }
 