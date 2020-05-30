export class User{
    constructor(public nom:string,
        public prenom:string,
        public uid:string,
        public email:string,
        public telephone:string,
        public role:string,
        public emailVerified:boolean,
        public disabled:boolean,
        public verified:boolean,
        public token?:string[]){}
}