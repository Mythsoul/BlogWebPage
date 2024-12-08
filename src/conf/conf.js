const appwriteUrl = String(import.meta.env.VITE_APPWRITE_URL);
const appwriteProject = String(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const appwriteDatabase = String(import.meta.env.VITE_APPWRITE_DATABASE_ID);
const appwriteCollection = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID); 
const appwriteBucket = String(import.meta.env.VITE_APPWRITE_BUCKET_ID);

export const conf = { appwriteUrl, appwriteProject, appwriteDatabase, appwriteCollection, appwriteBucket };