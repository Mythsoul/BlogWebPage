import {account , ID} from "./Appwrite";


export async function IsuserLoggedIn(){
    try{ 
        const user = await account.get(); 
        return user;
    }catch(err){ 
        console.log(err); 
    }
}
export async function createAccount(email , password , name){ 
    try{
const userAccount =  await account.create(ID.unique() , email , password , name);
if(userAccount) { 
    LoginUser(email , password); 
}
    }catch(err){ 
        console.log("Error while creating Account " , err)
    }
}


export async function LoginUser(email , password){ 
    try{ 
     const User = await account.createEmailPasswordSession(email , password); 
        return User; 
    }catch(err){ 
        console.log(err)
    }
}

export async function logoutUser(){ 
    try{ 
        await account.deleteSessions(); 
    }catch(err){ 
        console.log(err)
    }
}   

