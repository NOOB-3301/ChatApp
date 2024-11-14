import React, { useState } from 'react'
import axios from 'axios';

function RegisterM() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle registration logic here

    const { firstName,lastName,username,email,password} = formData
    const fullName = `${firstName} ${lastName}`
    const resp = await axios.post("http://localhost:3000/register",{
        username,
        fullName,
        email,
        password
    })
    console.log(resp.data)
    console.log(firstName);
    alert("You can Now Login")
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 p-8 w-80 bg-opacity-60 bg-gradient-to-br from-blue-800 via-purple-700 to-pink-600 rounded-lg shadow-lg backdrop-blur-lg"
      >
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-center mb-4">
          Register
        </h2>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterM;
