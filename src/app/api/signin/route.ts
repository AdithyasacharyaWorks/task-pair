// import { database,Query,userCollectionId,dbId } from "@/backend";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import { SignJWT } from 'jose';


// export async function POST(request:Request){
//     const body = await request.json()
//     try {
//        const res = await  database.listDocuments(dbId,userCollectionId,[
//             Query.equal('email', [body.email]),
//         ])

//         const hashedPass = res.documents[0]?.password
//         const passCorrect = await bcrypt.compare(body.password,hashedPass)

//         const structureData =[res.documents[0].$id,res.documents[0].email]

//         const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY_FOR_TOKEN);
//         const token = await new SignJWT({ email: body.email })
//             .setProtectedHeader({ alg: 'HS256' })
//             .setExpirationTime('3h')
//             .sign(SECRET_KEY);



//         const response  =  NextResponse.json({
//             status:passCorrect?200:500,
//             data:passCorrect?"login sucessful":"login failed",
//             user:structureData
//         })

//         response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`);

//         return response;
//     } catch (error) {
//         console.log(error)
//     }
// }