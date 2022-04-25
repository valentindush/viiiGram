import React,{useState} from 'react'

export default function Search() {

    const [searchInput, setSearchInput] = useState('')

  return (
    <div className='h-full w-full'>
        <div className=''>
            <input className= "" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search viigram'/>
        </div>
        <div className='results'>
            
        </div>
    </div>
  )
}
