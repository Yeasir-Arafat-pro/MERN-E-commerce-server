import React from 'react'

export default function Footer() {
  return (
    <div className='flex-center'>
        <div className='form'>
           <form action="">
            <label htmlFor="subscribe">Subscribe to newlatter: </label>
           <input type="email" name="subscribe" id="subscribe" placeholder='Enter Your Email'  />
           <button type='submit'>Subscribe</button>
           </form>
        </div>
        <div>
            &copy; Copyright 2025 yeasir express
        </div>
    </div>
  )
}
