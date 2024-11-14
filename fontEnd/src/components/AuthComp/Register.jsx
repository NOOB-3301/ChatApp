import React, { useState } from 'react';

function Register() {
  const [Firstname, setFirstname] = useState('');
  const [lastanem, setLastanem] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerdata, setRegisterdata] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!Firstname.trim()) newErrors.Firstname = 'First name is required';
    if (!lastanem.trim()) newErrors.lastanem = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!username.trim()) newErrors.username = 'Username is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit2 = () => {
    if (validate()) {
      const registerdata_sub = {
        Firstname,
        lastanem,
        email,
        username,
        password,
      };
      setRegisterdata(registerdata_sub);

      alert(JSON.stringify(registerdata_sub, null, 2));
    }
  };

  return (
    <div className="bg-blue-400 flex justify-center items-center p-4">
      <div className="bg-white p-6 border-black rounded-xl border w-full max-w-md">
        <section className="flex flex-col gap-5">
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="firstName" className="w-1/3">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="flex-1 bg-slate-300 p-2 rounded"
            />
            {errors.Firstname && <div className="text-red-500 text-sm">{errors.Firstname}</div>}
          </div>

          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="lastName" className="w-1/3">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastanem}
              onChange={(e) => setLastanem(e.target.value)}
              className="flex-1 bg-slate-300 p-2 rounded"
            />
            {errors.lastanem && <div className="text-red-500 text-sm">{errors.lastanem}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-slate-300 p-2 rounded"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-300 p-2 rounded"
            />
            {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-300 p-2 rounded"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          <button
            type="button"
            onClick={handleSubmit2}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </section>
      </div>
    </div>
  );
}

export default Register;
