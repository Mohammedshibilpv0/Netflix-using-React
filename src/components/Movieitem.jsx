/* eslint-disable react/prop-types */
import { createImageUrl } from "../services/Movieservices"
import { Link } from "react-router-dom"
function Movieitem({movie}) {
  const img=movie.backdrop_path?movie.backdrop_path:movie.poster_path
  return (

    <Link to={`/movie/${movie.id}`}>
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]
                     inline-block rounded-lg overflow-hidden cursor-pointer m-2 ">
        <div>
        <img className="w-full h-40 block object-cover object-top"
            src={createImageUrl(img,'w500')} alt="" />
        </div>
            <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className=" whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                  {movie.title}
                  </p>

            </div>
    </div>
   </Link>

  )
}

export default Movieitem
