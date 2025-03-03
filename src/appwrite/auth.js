import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite";

export class AuthService {
    client=new Client()
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
        

    }
    async createAccount({email,password,name}){
        try{
            const existingUser = await this.getCurrentUser();
            if (existingUser) {
                console.warn("User already logged in:", existingUser);
                return existingUser;
            }
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                return this.login({email,password});
                
            }else{
                return userAccount;
            }
        }catch(error){
            console.error("Appwrite Auth Error: ", error.message);
            throw error;
        }
    }

    async login({email,password}){
        try{
            await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite service ::getCurrentUser::error",error);
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite service :logout::error",error);
        }
    }
}
const authService=new AuthService;

export default authService;