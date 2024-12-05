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
        return response;
    } catch (err) {
        console.log("Error while Creating Post ", err);
    }
}

export async function updatePost({ title, content, image, post_id, status }) {
    try {
        const response = await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, post_id, { title, content, image, status });
  return response;
    } catch (err) {
        console.log("Error while Updating Post ", err);
    }
}

export async function deletePost(post_id) {
    try {
        const response = await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, post_id);
        return response;
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

export async function uploadImage(file) {
    try {
        const response = await storage.createFile(conf.appwriteBucketId, ID.unique(), file);
        return response;
    } catch (err) {
        console.log("Error while Uploading Image ", err);
    }
}

export async function deleteImage(file_id) {
    try {
        const response = await storage.deleteFile(conf.appwriteBucketId, file_id);
        return response;
    } catch (err) {
        console.log("Error while Deleting Image ", err);
    }
}

export async function getImage(file_id) {
    try {
        const response = await storage.getFileView(conf.appwriteBucketId, file_id);
        return response;
    } catch (err) {
        console.log("Error while Getting Image ", err);
    }
}

export async function file_preview(file_id) {
    try {
        const response = await storage.getFilePreview(conf.appwriteBucketId, file_id);
        return response;
    } catch (err) {
        console.log("Error while Getting Image ", err);
    }
}

export async function file_download(file_id) {
    try { 
        const response = await storage.getFileDownload(conf.appwriteBucketId, file_id);
        return response;
    } catch (err) { 
        console.log("Error while Getting Image ", err);
    }
}

export async function listImages() {
    try {
        const response = await storage.listFiles(conf.appwriteBucketId);
        return response;
    } catch (err) { 
        console.log("Error while Getting Images ", err);
    }
}