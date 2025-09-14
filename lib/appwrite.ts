import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite"
import {CreateUserParams, SignInParams} from '@/type'

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.ted.chakula",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68c724760000966352c7",
  userTableId: "user",
}

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
  try {

    const userId = ID.unique();
    const newAccount = await account.create({userId, email, password, name});

    if (!newAccount) throw Error;
    await signIn({email, password});
    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userTableId,
      ID.unique(),
      {
        accountId: newAccount.$id, email, name, avatar: avatarUrl
      }
    )

  } catch (error) {
    throw new Error(error as string);
  }
}

export const signIn = async ({email, password}: SignInParams) => {
  const session = await account.createEmailPasswordSession(email, password);
  }