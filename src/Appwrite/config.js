import conf from "../conf/conf";
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client)


export async function createPost({ title, content, image, user_id, status }) {
    try {
        const response = await databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, { title, content, image, user_id, status, post_id: ID.unique() });
    } catch (err) {
        console.log("Error while Creating Post ", err);
    }
}

export async function updatePost({ title, content, image, post_id, status }) {
    try {
        const response = await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, post_id, { title, content, image, status });
    } catch (err) {
        console.log("Error while Updating Post ", err);
    }
}

export async function deletePost(post_id) {
    try {
        const response = await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, post_id);
    } catch (err) {
        console.log("Error while Deleting Post ", err);
    }
}
export async function listPosts() {
    try {
        const response = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
        return response.documents;
    } catch (err) {
        console.log("Error while Getting Posts ", err);
    }

}
export async function getPost(post_id) {
    try {
        const response = await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, post_id);
        return response;
    } catch (err) {
        console.log("Error while Getting Post ", err);
    }
}