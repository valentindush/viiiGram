import React,{useState} from 'react'

export default function PostPage() {
    
    const [img,setImg] = useState(null)

    const handleFile = (e)=>{
        const file  = e.target.files[0]

        const fileReader = new FileReader()

        fileReader.onload = (e)=>{
            setImg(e.target.result)
            console.log(img)
        }
        fileReader.readAsDataURL(file)

    }
    const [description, setDescription]  = useState("")

    const handlePost  = ()=>{
        
    }
  return (
    <div className='h-full'>
        <div className='px-5 py-4'>
            <h3 className='font-medium text-black'>New post</h3>
        </div>
        <form id='form' onSubmit={handlePost} className='px-3'>
            <label className=' bg-blue-400 cursor-pointer p-1 w-[40px] h-[40px] flex items-center justify-center rounded-full'>
                <svg className='w-[20px] h-[20px] fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z"/>
                </svg>
                <input type={'file'}  accept="image/*" className="hidden" onChange={(e)=>handleFile(e)} />
            </label>

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
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Write something about this post" className='block w-full mt-3 resize-y border-[1px] p-2 text-sm rounded-md h-10 outline-none'>

                </textarea>
            </div>

            <div className='px-1 py-3'>
                <button className='bg-pink-400 hover:bg-pink-500 transition duration-300 ease-linear block w-full py-1.5 rounded-md text-white shadow-md'>Finish</button>
            </div>
        </form>
    </div>
  )
  
}
