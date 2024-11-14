import { useEffect, useState } from 'react'
import './App.css'
import Register from './components/AuthComp/Register'
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision'
import { TextGenerateEffect } from './components/ui/text-generate-effect'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./components/ui/animated-modal";
import Login from './components/AuthComp/LoginModal'
import RegisterM from './components/AuthComp/RegisModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const config = {
  headers: {
      "Content-Type": "application/json"
  },
  withCredentials: true
}

function App() {
  const navigate = useNavigate()
  async function checkLoggedIn() {
    const {data}= await axios.get("http://localhost:3000/checking",config)
    console.log(data)
    if(data.loggedin == 'true'){
      setLoggedin(true)
    }else{
      setLoggedin(false)
    }
  }
  const words = `One application to chat with friends and share large files with ease`
  const [loggedin, setLoggedin] = useState(false)

  useEffect(() => {
    checkLoggedIn()
  
  }, [])
  

  if (loggedin) {
    {
      axios.get("http://localhost:3000/user",config)
      .then((d)=>
        // console.log(d.data)
        navigate(`/user/${d.data.user.userName}`)
      )
      .catch((err)=>console.log(err))     
    }
  }else{
    return (
      
      <BackgroundBeamsWithCollision>
        <div className="h-screen flex items-center justify-center">
          <div className="h-2/3 w-2/3 flex flex-col items-center gap-10">
            {/* App Title */}
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-violet-500 to-pink-500 py-4 drop-shadow-lg">
              <span>Chat_App</span>
            </div>
  
            {/* Subtitle Text */}
            <div className="text-lg text-center text-gray-200 px-6">
              <TextGenerateEffect filter={false} words={words} duration={2} />
            </div>
  
            {/* Buttons Section */}
            <div className="flex gap-8 text-xl">
              <div className="cursor-pointer px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white transition duration-200 shadow-md">
                <Modal>
                  <ModalTrigger
                    className="  text-white flex justify-center group/modal-btn">
                    <span
                      className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      Login
                    </span>
                    <div
                      className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                      ✈️
                    </div>
                  </ModalTrigger>
  
                  <ModalBody className="bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 rounded-lg shadow-lg backdrop-blur-lg">
                    <ModalContent>
                      <Login/>
                    </ModalContent>
                  </ModalBody>
                </Modal>
              </div>
              <div className="cursor-pointer px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-600 text-white transition duration-200 shadow-md">
              <Modal>
                  <ModalTrigger
                    className="  text-white flex justify-center group/modal-btn">
                    <span
                      className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      Register
                    </span>
                    <div
                      className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                      ✈️
                    </div>
                  </ModalTrigger>
  
                  <ModalBody className="bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 rounded-lg shadow-lg backdrop-blur-lg">
                    <ModalContent>
                      <RegisterM/>
                    </ModalContent>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </div>
        </div>
  
      </BackgroundBeamsWithCollision>
    )

  }

}

export default App
