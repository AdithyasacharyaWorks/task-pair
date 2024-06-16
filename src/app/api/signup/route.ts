import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";
import { account,ID ,database,dbId,userCollectionId, Query} from "@/backend/index";

// import jwt from "jsonwebtoken"


export  async function POST(request:Request){
    const body = await request.json()

    console.log(body)


    const checkForExistEmail = await database.listDocuments(dbId,userCollectionId,
       [Query.equal('email',body.email)]
    )
    console.log(checkForExistEmail.total)

    if(checkForExistEmail.total !== 0){
        return NextResponse.json({
            status:500,
            message:"email is already present please use a new email"
        })
    }
    const email = body.email
    const password = body.password
    const hashedPasword =await  bcrypt.hash(password,10)



    const data = {
        email,
        password:hashedPasword
    }

    try {
        const result = await database.createDocument(dbId, userCollectionId,ID.unique(),data)

        return NextResponse.json({
            status: 200,
            message: `user created with id ${result.$id} `
          });
    } catch (error) {
        return NextResponse.json({
            status: 400,
            message: `failed `,
          });
    }



    

}

