import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React,{useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {postRoute} from "../../utils/apiRoutes";

export default function PostPage() {
    
    const [img,setImg] = useState(null)
    const [file,setFile] = useState(null)
    const navigate = useNavigate()
    const [token ,setToken] = useState(null)
    const [form,setForm] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDone,setIsDone] = useState(false)
    const [error,setError] = useState("")
    const handleFile = (e)=>{
        const file1  = e.target.files[0]
        const fileReader = new FileReader()

        fileReader.onload = (e)=>{
            setImg(e.target.result)
            console.log(img)
        }
        fileReader.readAsDataURL(file1)

    }
    const [description, setDescription]  = useState("")
    const [currentUser, setCurrentUser] = useState({})


    useEffect(()=>{
        const local_data = JSON.parse(localStorage.getItem('viigram_access_token'))

        if(local_data){  

            const user_data = jwtDecode(local_data.token)

            if(user_data){
                setToken(local_data.token)
                setCurrentUser(user_data)
            }

        }else{
            navigate('/login')
        }
    },[])

    const handlePost  = (e)=>{
        e.preventDefault()
        setIsLoading(true)
        setForm(e.target)
        const formdata = new FormData();
        formdata.append("token", token);
        formdata.append("desc",description)
        formdata.append("image", file);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(postRoute, requestOptions)
            .then(response => response.json())
            .then((result)=>{
                console.log(result)
                if(result.status  === true){
                    setIsLoading(false)
                    setIsDone(true)
                    setTimeout(()=>{
                        navigate('/')
                    },1000)
                }else{
                    setIsLoading(false)
                    setIsDone(false)
                    setError("Something went wrong please try again later")

                }
            })
            .catch((err)=>{
                console.log(err)
                setIsLoading(false)
                setIsDone(false)
                setError("Something went wrong please try again later")
            });
        
    }
  return (
    <div className='h-full'>
        <div className='px-5 py-4'>
            <h3 className='font-medium text-black'>New post</h3>
        </div>
        <form  id='form' onSubmit={(e)=>handlePost(e)} className='px-3'>
            <label className=' bg-blue-400 cursor-pointer p-1 w-[40px] h-[40px] flex items-center justify-center rounded-full'>
                <svg className='w-[20px] h-[20px] fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z"/>
                </svg>
                <input type={'file'}  accept="image/*" className="hidden" name='image' onChange={(e)=> {
                    handleFile(e)
                    setFile(e.target.files[0])
                }} />
            </label>

            { isLoading === true && <div className={'absolute   bottom-[10%] right-[35%] '}>
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


                <span className={'block text-center'}>creating post ...</span>
            </div>}

            <div className='w-full bg-gradient-to-bl from-pink-100 via-pink-300 to-pink-400 p-1 mt-2 h-[200px] flex items-center justify-center flex-col rounded-md'>
                {img === null && 
                    <svg  className='h-20 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/>
                    </svg>
                }

                {img !== null &&

                    <img className='w-full h-full rounded-md' src={img} alt=""/>
                }
                
            </div>

            <div className='pt-1 px-1'>
                <h4 className='pt-2'>Description</h4>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="desc" placeholder="Write something about this post" className='block w-full mt-3 resize-y border-[1px] p-2 text-sm rounded-md h-10 outline-none'>

                </textarea>
            </div>

            <div className='px-1 py-3'>
                {file !== null &&
                    <button className='bg-pink-400 hover:bg-pink-500 transition duration-300 ease-linear block w-full py-1.5 rounded-md text-white shadow-md'>Finish</button>
                }
            </div>
        </form>

        {isDone === true && <div className={'res flex gap-2 w-full justify-center items-center animate-pulse'}>
            <svg className={'w-[15px] h-[15px] fill-pink-600 animate-bounce'} xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path
                    d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
            </svg>
            <span className={'animate-bounce'}>Posted added</span>
        </div>}

        {error !== "" &&
            <div className={'w-full text-center'}>
                <p className={'text-red-500 text-sm'}>{error}</p>
            </div>
        }
    </div>
  )
  
}
