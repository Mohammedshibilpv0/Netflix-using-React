import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthContextProvider } from "./context/AuthContext"
// import ProtectedRoute from "./components/ProtectedRoute"
import Detailpage from "./pages/Detailpage"
function App() {
  return (
    <>
    <AuthContextProvider>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/movie/:id" element={<Detailpage/>} />
    {/* <Route path="/Profile" element={
      <ProtectedRoute>
      <Profile/>
     </ProtectedRoute>
    } /> */}



    </Routes>
    <Footer/>
    </AuthContextProvider>



    </>
  )
}

export default App
