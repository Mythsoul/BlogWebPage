import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const account = new Account(client);

export async function createAccount({ email, password, name }) {
    try {
        const response = await account.create(ID.unique(), email, password, name);
        if (response) {
            return login({ email, password })
        }
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function get_current_user() {
    try {
        const response = await account.get();
        return response;
    }
    catch (err) {
        console.log("Error while Getting user Account ", err);
    }
    return null;
}

export async function logout() {
    try{ 
        const response = await account.deleteSessions();
        return response;
    }
    catch (err) {
        console.log("Error while Deleting user Account ", err);
    }
}