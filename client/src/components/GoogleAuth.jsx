import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { SigninSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const GoogleAuth = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
   async function handleGauth(){
        try{
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app)
            const result =await signInWithPopup(auth,provider)
            const res=await fetch('/api/auth/google',

            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            }
            )
            const data=await res.json()
            dispatch(SigninSuccess(data))
            navigate('/')

        }

        catch(error){
            console.log("cannot complete sign in with google",error)
        }
    }
  return (
    <div>
      <button onClick={handleGauth} type='button' className="flex text-center capitalize justify-center items-center hover:opacity-95 text-white bg-red-600 rounded-lg p-3 w-full ">Continue with Google</button>
    </div>
  )
}

export default GoogleAuth
