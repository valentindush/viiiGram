import React from 'react'

export default function Header() {
    const svgClass = `w-[15px] h-[15px] opacity-75`
  return (
    <header className='p-5 bg-white z-10  py-7 pb-5 sticky flex justify-between items-center top-0 shadow-sm'>
        <div className='logo text-lg font-medium'>
            ViiGram
        </div>
        <div className='icons flex items-center gap-3'>
            <a href='/'>
                <svg className={`${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"/>
                </svg>
            </a>
            <a href='/chat'>
                <svg className={`${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"/></svg>
            </a>
        </div>
    </header>
  )
}
