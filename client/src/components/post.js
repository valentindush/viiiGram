import React,{useState} from 'react'

export default function Post(props) {
    const [liked, setLiked] = useState(false)
    const [likes,setLikes] = useState(props.likes)
    const handleLikes = ()=>{
        if(liked === true) {
            setLikes(likes - 1)
            setLiked(false)
        }
        if(liked === false){
            setLikes(likes + 1)
            setLiked(true)
        }
    }
    let likeClass = (liked===true) ? "fill-pink-500 cursor-pointer" : "fill-pink-100 stroke-black"
    const svgClass = `w-[22px] h-[22px]`
  return (
    <div className='p-[5px] w-full mt-3 pb-5 shadow-sm border-[1px] border-slate-100 rounded-md'>
        <div className='flex gap-1 items-center pb-1'>
            <img className='w-[20px] h-[20px] rounded-full ' src={props.profile} alt="profile"/>
            <p className='text-sm'>{props.username}</p>
        </div>
        <div className='img w-full h-[200px]'>
            <img className='w-full h-full' src={props.img} alt="post"/>
        </div>
        <div className='icons flex gap-2 items-center relative pt-1'>
            <div className='likes'>
            <svg className={`${svgClass} ${likeClass} cursor-pointer`} onClick={handleLikes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/></svg>
            
            </div>            
            <div className=''>
                <svg className={`w-[20px] h-[20px]} cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z"/></svg>
            </div>

            <div className='absolute right-1'>
            <svg className={`${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M336 0h-288C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93C357.2 519.1 384 504.6 384 479.9V48C384 21.49 362.5 0 336 0zM336 452L192 368l-144 84V54C48 50.63 50.63 48 53.1 48h276C333.4 48 336 50.63 336 54V452z"/></svg>
            </div>
            
        </div>
        <p className='text-xs mt-1 font-medium'>{likes} Likes</p>
        <div className=''>
            <p className='text-xs hover:underline cursor-pointer'>See all {props.comments.length} Comments</p>
        </div>

        <div className=''>
            <div className='desc text-sm py-2'>
                <p className='text-[14px] font-semibold'>{props.username} <span className='text-sm break-words font-normal'>{props.desc}</span></p>
            </div>

        </div>
        <div className='txt w-full flex gap-1'>
            <textarea placeholder='Add a comment . . .' className='w-full p-2 rounded-xl h-12'>

            </textarea>
            <button>Post</button>
        </div>

    </div>
  )
}
