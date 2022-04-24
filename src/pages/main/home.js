import React from 'react'
import Post from '../../components/post'
import Story from '../../components/story'
import img from './cover.png'
export default function Home() {
  return (
    <div className='Home'>
      
      <div className='stories  flex gap-2 relative overflow-x-auto p-2'>
      <div className='flex cursor-pointer flex-col items-center'>
        <div className='img w-[60px] h-[60px] border-[1px] flex items-center justify-center  rounded-full p-1 bg-gradient-to-r from-pink-400 to-red-200 hover:bg-gradient-to-tr transition duration-500'>
        <svg className='fill-white w-[40px] h-[40px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
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
