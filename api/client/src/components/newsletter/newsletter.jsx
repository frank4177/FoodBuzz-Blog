import { AiOutlineSend } from 'react-icons/ai';
import React, { useState } from 'react'
import './newsletter.css'



const Newsletter = () => {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("");

    

    const inputHandler = (e) =>{
        setInput(e.target.value);
    }

    const handleClick = (e) =>{
        e.preventDefault();
        if(input){
           
            setInput("");
            setMessage("Thank you for subscribing!")
            setTimeout(()=>{
                setMessage("")
            }, 3000)

        }
    }
    
    return ( 
        <div className="newsLetter-container">
            <div className='newsletter-wrapper'>
            <h1>Newsletter</h1>
            <div className="description">Dont miss a post</div>

            <form action="" className="searchForm" >
                <input type="email" className="searchBox" placeholder="Subscribe" onChange={inputHandler} value={input}/>
                <AiOutlineSend className="searchLogo" onClick={handleClick}/>
            </form>
            {message && <h2>{message}</h2>}
            </div>
        </div>
     );
}
 
export default Newsletter;

