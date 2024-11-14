import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }
    const {email,password} = formData
    const res = await axios.post("http://localhost:3000/login",{
      email,
      password
    }, config)
    if (res.data.LoggedInUser._id != "") {
      navigate(`/user/${res.data.LoggedInUser.userName}`)
    }
    console.log(res.data)
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 p-8  bg-opacity-60 w-full bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 rounded-lg shadow-lg backdrop-blur-lg"
      >
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-center mb-4">
          Login
        </h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button 
          type="submit" 
          className="mt-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-200 shadow-md"
        >
          Log In
        </button>


      </form>
    </div>
  );
}

export default Login;
