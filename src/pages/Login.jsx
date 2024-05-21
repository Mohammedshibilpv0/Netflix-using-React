/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"


const img='https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
function Login() {
  const[remember,setRemember]=useState(true)
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const {user,logIn}= UserAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    // Handling the input without trimming
    const rawEmail = email;
    const rawPassword = password;

    try {
      if (rawPassword.trim() !== '' && rawEmail.trim() !== '') {
        await logIn(rawEmail, rawPassword);
        navigate('/');
      } else {
        setError('Email and Password is required.');
      }
    } catch (err) {
      // Handle specific Firebase errors
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else {
        setError('Failed to log in. Please try again.');
      }
      console.log(err);
    }
  };
  return (
    <>
    <div className="w-full h-screen">
      <img className=" hidden sm:block absolute w-full h-full object-cover" src={img} alt="" />
        <div className=" bg-black/70 fixed top-0 left-0 w-full h-screen"/>

        <div className=" fixed w-full px-4 py-24 z-20">
          <div className=" max-w-[450px] h-[600px] mx-auto bg-black/60 rounded-lg">
                <div className=" max-w-[320px] mx-auto py-16">
                  <h1 className=" text-3xl font-nsans-bold capitalize">login</h1>
                  {error && <p className="text-red-600">{error}</p>}
                  <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                    <input
                    className="p-3 my-2 bg-gray-300 rounded"
                    type="email" placeholder="Email"
                     autoComplete="email"
                     value={email}  onChange={(e)=>setEmail(e.target.value)} />

                   <input
                    className="p-3 my-2 bg-gray-300 rounded"
                    type="password" placeholder="Password"
                     autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                      <button className=" bg-red-600 py-3 y-6 rounded font-nsans-bold">Login</button>
                      <div className=" flex justify-between items-center text-gray-600">
                          <p>
                            <input type="checkbox" className=" mr-2 mt-4" checked={remember} onClick={()=>setRemember(!remember)} />
                            Remember me
                          </p>
                          <p>Need Help?</p>
                      </div>
                      <p className="my-5">
                          <span className=" text-gray-600 mr-2" >New to Netflix?</span>
                          <Link to={'/signup'}>Sign Up</Link>
                      </p>
                  </form>
                </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login
