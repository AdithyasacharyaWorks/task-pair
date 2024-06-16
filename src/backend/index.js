import { Client, Account,Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROJECT_ID); 

export const account = new Account(client);
export const database = new Databases(client)


export { ID ,Query} from 'appwrite';

export const dbId = process.env.DATABASE_ID||""

export const collectionId =process.env.COLLECTION_ID||""

export const userCollectionId=process.env.USER_COLLECTION_ID||""
