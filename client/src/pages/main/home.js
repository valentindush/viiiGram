import React, {useEffect, useState} from 'react'
import Post from '../../components/post'
import Story from '../../components/story'
import img from './cover.png'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getPostsRoute, HomeLoginRoute, host} from "../../utils/apiRoutes";
export default function Home() {
    const navigate = useNavigate()
    const [postsData,setPostsData] = useState([])
    const [posts,setPosts] = useState(<></>)
    //Checking token

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('viigram_access_token'))
        if(!token){
            navigate('/login')
        }

        if(token.token){

            axios.post(HomeLoginRoute, {token: token.token})
                .then((res)=>{

                    axios.post(getPostsRoute,{token: token.token})
                        .then((res)=>{

                            if(res.data.status === true){
                                setPostsData(res.data.posts)
                                // postsData.forEach((post)=>{
                                //     if(post.likes.contains())
                                // })

                            }
                        }).catch((err)=>{
                            navigate("/login")
                        })
                }).catch((err)=>{
                    navigate('/login')
                })
        }
    },[])



  return (
    <div className='Home'>
      
      <div className='stories  flex gap-2 relative overflow-x-auto p-2'>
        <div className='flex cursor-pointer flex-col items-center'>
      </div>

      </div>
      
      <div className='posts p-1'>
          {postsData !== null && postsData.map((post)=>{
              return <Post key={post._id} id={post._id}  comments={["CommentOne" ,"Comment2"]} likes={post.likes.length} profile={img} img={`http://localhost:3001/posts/${post.fileUrl}`} username={`${post.owner}`} desc={`${post.description}`}/>
          }) }

      </div>
    </div>
  )
}
