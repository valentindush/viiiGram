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
    let likeClass = (liked===true) ? "fill-pink-300" : ""
    const svgClass = `w-[18px] h-[18px]`
  return (
    <div className='p-[5px] w-full mt-3 pb-5 shadow-sm border-[1px] border-slate-100 rounded-md'>
        <div className='flex gap-1 items-center pb-1'>
            <img className='w-[20px] h-[20px] rounded-full ' src={props.profile} alt="profile"/>
            <p className='text-sm'>{props.username}</p>
        </div>
        <div className='img w-full h-[200px]'>
            <img className='w-full h-full' src={props.img} alt="post"/>
        </div>
        <div className='icons flex gap-1 relative pt-1'>
            <div className='likes'>
                <svg  onClick={handleLikes} className={`${svgClass} ${likeClass} cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>
                <p className='text-xs'>{likes} Likes</p>
            </div>            
            <div className='comments'>
                <svg className={`${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>
            </div>
            
        </div>
        <div className=''>
            <p className='text-xs hover:underline cursor-pointer'>See all {props.comments.length} Comments</p>
        </div>
        <div className=''>
            <div className='desc text-sm py-2 px-1'>
                <p className='text-[14px] font-semibold'>{props.username} <span className='text-sm break-words font-normal'>{props.desc}</span></p>
            </div>

        </div>

    </div>
  )
}
