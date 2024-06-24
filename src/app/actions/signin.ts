
import { account } from "@/backend/index";
import axios from "axios";
type userDetail = {
  email: string;
  password: string;
};



// export default async function signin(userdetail: userDetail) {
//   try {
//     const session =account.getSession('current') 
//     session.then((res)=>{
//       console.log(res)
//       if(res.providerUid !== userdetail.email){
//         account.deleteSession(res.$id)

//         const session = account.createEmailPasswordSession(userdetail.email,userdetail.password)

//         session.then((res)=>{
//           console.log(res)
//         })
//       }


//     }).catch((err)=>{

//       const session = account.createEmailPasswordSession(userdetail.email,userdetail.password)

//         session.then((res)=>{
//           console.log(res)
//         })
//       console.log(err)
//     })
    
//   } catch (error) {
//     return error
//   }

// }

export default async function signin(userdetail:userDetail){
  
  try {
    const result = await axios.post('http://localhost:3000/api/signin',{
      email:userdetail.email,
      password:userdetail.password
    })   


    return result
  } catch (error) {
    return error
  }

}
