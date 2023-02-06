import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { signUpRoute } from '../../utils/apiRoutes'
import { useNavigate } from 'react-router-dom'
export default function Signup(props) {
    const navigate = useNavigate()
    const hideFunc = props.hide
    useEffect(()=>{
        hideFunc()
    },[])
    const inputClass = "border mt-2 rounded-[4px] font-mormal p-2  text-sm border-slate-200 outline-none focus:border-black block w-full text-black"

    const [fullname ,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassoword] = useState("")
    const [loading,setIsLoading] = useState(false)

    const [err,setErr] = useState("")

    const isEmpty = (str)=>{
        if(str === "") return true

        return false
    }

    const handleSignUp = (e)=>{
        e.preventDefault()
        setIsLoading(true)
        //validation
        if(isEmpty(fullname) || isEmpty(username) || isEmpty(email) || isEmpty(password)){
            setErr("all fields are required")
        }else if(fullname.length < 4 || fullname.length > 20){
            setErr("must not contain specail characters and must be between 4 an 20 characters")
        }else if(username.length < 4 || username.length > 20){
            setErr("Username must not contain specail characters and must be between 4 an 20 characters")
        }else if(password.length < 8 || password.length > 20){
            setErr('Password must be atleast 8 characters and not more than 20')
        }else{


            //REQUEST

            axios.post(signUpRoute,
                {
                    fullname: fullname,
                    username: username,
                    email: email,
                    password: password
                }).then((res)=>{
                    
                    setIsLoading(false)
                    if(res.data.status ===true){
                        setIsLoading(false)
                        console.log(res.data)
                        const accessToken = res.data

                        console.log(accessToken);
                        localStorage.setItem('viigram_access_token',JSON.stringify(accessToken))
                        navigate('/')
                    }else{
                        setIsLoading(false)
                        setErr("Went wrong !")
                    }
                }).catch((err)=>{
                    setIsLoading(false)
                    setErr("went wrong")
                    console.log(err)
                })
        }
        
    }

  return (
    <div className='h-full  w-full flex flex-col justify-center items-center'>
        <div className='logo pb-5'>
            <span className='text-xl font-semibold'>ViiGram</span>
        </div>
        <div className=''>
            <p className='text-sm'>Signup to see photos and videos from your friends</p>
        </div>
        <form className={`w-full p-[40px] pt-4 ${loading?"pointer-events-none":""} `} autoComplete='off' onSubmit={(e)=>handleSignUp(e)}>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={email} onChange={(e)=>setEmail(e.target.value)}  type={'email'} placeholder="Email address"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={fullname} onChange={(e)=>setFullName(e.target.value)} type={'text'} placeholder="Full name"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`} value={username} onChange={(e)=>setUsername(e.target.value)} type={'text'} placeholder="username"/>
            </div>
            <div className='field w-full'>  
                <input className={`${inputClass}`} value={password} onChange={(e)=> setPassoword(e.target.value)} type={'password'} placeholder="Password"/>
            </div>
            <div className='submit pt-2'>
                <button className='w-full bg-pink-300 hover:bg-pink-400  transition-all duration-300 p-[5px] cursor-pointer text-white font-normal rounded' type='submit'>Create account</button>
            </div>
            <div className='text-center'>
                <p className='text-xs'>By creating account you agree to our <a className='text-blue-400' href='/signup/#'>terms</a> and <a className='text-blue-400' href='/signup/#'>policies</a></p>
            </div>
            <div className='text-center'>
                <span className='text-xs text-red-500 animate-pulse'>{err}</span>
            </div>

            <div className='text-center pt-4'>
                <span className='text-xs'>Already have account? <a href='/login' className='text-blue-400 hover:underline'>login now</a></span>
            </div>
        </form>


            {loading&&<div className={'absolute   bottom-[40%] right-[45%] '}>
                <svg role="status"
                     className="w-12 h-12 ml-5 text-white animate-spin dark:text-transparent fill-pink-600 "
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>

            </div>}

    </div>
  )
}
