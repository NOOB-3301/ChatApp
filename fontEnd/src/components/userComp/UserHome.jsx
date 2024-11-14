import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserHome = () => {   

    const [clicked, setClicked] = useState(false)
    let [res,setRes] =useState({})
    const handleclick = async()=>{
        res = await axios.get("http://localhost:3000/user",config)
        console.log(res.data.user)
        setRes(res)
        setClicked(true)
    }

    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }
    const ids=[...Array(100).keys()]
    if (clicked) {
        return(
            <div className='h-screen w-screen  overflow-auto  '>

            <div className='h-auto w-full m-3 flex '>
                <div>
                {/* {dataa ? <h2>This is the data: {dataa}</h2> : null} */}
                {res.data.user.fullName}
                </div>
            </div>
    
            <div className='h-fit  w-full flex flex-row '>
                <div className='h-screen w-1/2 flex flex-col gap-2 border p-2 overflow-scroll border-black'>

                    {
                        ids.map((user)=>
                           (
                                <div key={Math.random()} className='border border-black px-2 text-2xl py-4'>
                                username
                                </div>
                            )
                        )
                    }
                    <button className='h-10 w-10 right bg-green-500'>ADD</button>
                </div>
                <div className='h-screen w-1/2 border border-black'>
    
                </div>
            </div>
        </div>
        )
    } else {
        return(
            <div>
                <button onClick={handleclick}>Click me</button>
            </div>
        )
    }
}

export default UserHome;

