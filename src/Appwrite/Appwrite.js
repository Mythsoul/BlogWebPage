import { Client , Account } from "appwrite";
import { conf } from "../conf/conf";
const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProject); 
export const account = new Account(client);
export {ID} from "appwrite"