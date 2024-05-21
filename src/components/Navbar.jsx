import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"


function Navbar() {
  const {user,logOut} =UserAuth();
  const navigate=useNavigate()
  const handlelogOut= async()=>{
    try{
        await logOut()
        navigate('/')
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
     <Link to='/'>
        <h1 className="uppercase text-red-600 font-nsans-bold text-5xl">netflix</h1>
     </Link>

     {user?.email? (
        <div className="">
        {/* <Link to='/profile' >
        <button className="capitalize px-6  ">Profile</button>
        </Link> */}


        <button onClick={handlelogOut} className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer">Logout</button>

     </div>
     ):(
      <div className="">
      <Link to='/login' >
      <button className="capitalize px-6  ">Login</button>
      </Link>

      <Link to='signup'>
      <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer">Sign up</button>
      </Link>
   </div>
     )}


    </div>
  )
}

export default Navbar
