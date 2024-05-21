/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Movieitem from "./Movieitem";
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import axios from "axios";

 function Rowposter({title,url}) {
    const rowid=Math.floor(Math.random()*1000)
    const [movies,setMovies]=useState([])

    useEffect(()=>{

     async function fetchingMovies(){
        const response= await axios.get(url)
        setMovies(response.data.results)
      }

      fetchingMovies()

    },[url])


    const slider =(offset)=>{
        const slider=document.getElementById(`slider`+rowid)
        slider.scrollLeft=slider.scrollLeft+offset
    }


  return (
    <>
    <h2 className="mt-12 font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

    <div className=" relative flex items-center group">
        <MdChevronLeft onClick={()=>slider(-500)}
          className=" bg-white rounded-full hidden absolute left-2 opacity-80 text-gray-700 z-10   group-hover:block cursor-pointer" size={40}/>
        <div id={`slider`+rowid} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide" >
            {movies.map((data,index)=>(
                <Movieitem movie={data} key={index} />
            ))}
        </div>
        <MdChevronRight
                    onClick={()=>slider(500)}
                    className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                    size={40}
                />
    </div>
    </>
  )
}

export default Rowposter
