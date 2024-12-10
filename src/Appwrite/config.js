import { Client, Databases, Storage, Query, ID } from "appwrite";
import { conf } from "../conf/conf";

const client = new Client();
const databases = new Databases(client);
const bucket = new Storage(client);

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProject);

export async function createPost({ title, content, featuredImage, status, userId }) {
    try {
        return await databases.createDocument(
            conf.appwriteDatabase,
            conf.appwriteCollection,
            ID.unique(),
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
    }
}

export async function updatePost(documentId, { title, content, featuredImage, status }) {
    try {
        return await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentId,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error);
    }
}

export async function deletePost(documentId) {
    try {
        await databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentId
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
        return false;
    }
}

export async function getPost(documentId) {
    try {
        return await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentId
        );
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
}

export async function getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error);
        return false;
    }
}

export async function uploadFile(file) {
    try {
        return await bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        return false;
    }
}

export async function deleteFile(fileId) {
    try {
        await bucket.deleteFile(conf.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
        return false;
    }
}

export function getFilePreview(fileId) {
    return bucket.getFilePreview(conf.appwriteBucketId, fileId);
}
