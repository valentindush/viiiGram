import React,{useEffect} from 'react'

export default function Login(props) {
    const hideFunc = props.hide

    useEffect(()=>{
        hideFunc()
    })

    const inputClass = "border mt-2 rounded-[4px] font-mormal p-2  text-sm border-slate-200 outline-none focus:border-black block w-full text-black"
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='logo'>
            <span className='text-xl font-semibold'>ViiGram</span>
        </div>

        <form className='w-full p-[40px] pt-8 ' autoComplete='off'>
            <div className='title text-center'>
                <h4 className='font-medium pb-2'>Login into your account</h4>
            </div>

            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'email'} placeholder="Email"/>
            </div>
            <div className='field w-full'>
                <input className={`${inputClass}`}  type={'password'} placeholder="Password"/>
            </div>
            <div className='w-full text-right pr-1'>
                <a href='/auth/resetpassword' className='text-xs opacity-75 font-normal hover:underline'>Forgot password</a>
            </div>
            <div className='submit pt-2'>
                <button className='w-full bg-pink-300 hover:bg-pink-400  transition-all duration-300 p-[5px] cursor-pointer text-white font-normal rounded' type='submit'>Login</button>
            </div>
            <div className='text-center'>
                <span className='text-xs text-red-500'></span>
            </div>

            <div className='text-center pt-4'>
                <span className='text-xs'>Don't have account? <a href='/signup' className='text-blue-400 hover:underline'>Create one</a></span>
            </div>
        </form>
    </div>
  )
}
