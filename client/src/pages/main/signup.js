import React,{useState, useEffect} from 'react'

export default function Signup(props) {
    const hideFunc = props.hide
    useEffect(()=>{
        hideFunc()
    })
    const inputClass = "border mt-2 rounded-[4px] font-mormal p-2  text-sm border-slate-200 outline-none focus:border-black block w-full text-black"

    const [fullname ,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassoword] = useState("")

    const handleSignUp = (e)=>{
        e.preventDefault()
        
    }

  return (
    <div className='h-full  w-full flex flex-col justify-center items-center'>
        <div className='logo pb-5'>
            <span className='text-xl font-semibold'>ViiGram</span>
        </div>
        <div className=''>
            <p className='text-sm'>Signup to see photos and videos from your friends</p>
        </div>
        <form className='w-full p-[40px] pt-4 ' autoComplete='off' onSubmit={(e)=>handleSignUp(e)}>
            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'email'} placeholder="Email address"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'text'} placeholder="Full name"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'text'} placeholder="username"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'password'} placeholder="Password"/>
            </div>
            <div className='submit pt-2'>
                <button className='w-full bg-pink-300 hover:bg-pink-400  transition-all duration-300 p-[5px] cursor-pointer text-white font-normal rounded' type='submit'>Create account</button>
            </div>
            <div className='text-center'>
                <p className='text-xs'>By creating account you agree to our <a className='text-blue-400' href='/signup/#'>terms</a> and <a className='text-blue-400' href='/signup/#'>policies</a></p>
            </div>
            <div className='text-center'>
                <span className='text-xs text-red-500'></span>
            </div>

            <div className='text-center pt-4'>
                <span className='text-xs'>Already have account? <a href='/login' className='text-blue-400 hover:underline'>login now</a></span>
            </div>
        </form>
    </div>
  )
}
