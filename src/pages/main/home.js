import React from 'react'
import Post from '../../components/post'
import Story from '../../components/story'
import img from './cover.png'
export default function Home() {
  return (
    <div className='Home'>
      
      <div className='stories flex gap-2 relative overflow-x-auto p-2'>
      <div className='flex flex-col items-center'>
        <div className='img w-[65px] h-[65px] border-[1px]  rounded-full p-1 bg-gradient-to-r from-pink-400 to-red-200'>
            
        </div>
            <div className='username text-xs font-normal'>
                your story
            </div>
        </div>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="Zlatan_Manudi"/>
        <Story src={img} username="Maguire"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyksgskfhgskfgksfgshkgsonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
        <Story src={img} username="meddyonly"/>
      </div>
      
      <div className='posts p-1'>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>
        <Post comments={["CommentOne" ,"Comment2"]} likes={43} profile={img} img={img} username={"dush_val"} desc={"Listening to music on Muzika"}/>

      </div>
    </div>
  )
}
