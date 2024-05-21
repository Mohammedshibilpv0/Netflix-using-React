/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Movieitem from "../components/Movieitem";
import { AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/FirebaseServices";
import { createImageUrl } from '../services/Movieservices';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const img = 'https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_medium.jpg';

function Profile() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slider = (offset) => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const handleUnlike = async (movie) => {
    const userDoc = doc(db, 'users', user.email);
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    });
  };

  return (
    <>
      <div>
        <div>
          <img className="block w-full h-[500px] object-cover" src={img} alt="//" />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">My Shows</h1>
            <p className="font-nsans-light text-gray-400 text-lg">{user.email}</p>
          </div>
        </div>

        <h2 className="mt-12 font-nsans-bold md:text-xl p-4 capitalize">Fav Shows</h2>

        <div className="relative flex items-center group">
          <MdChevronLeft onClick={() => slider(-500)} className="bg-white rounded-full hidden absolute left-2 opacity-80 text-gray-700 z-10 group-hover:block cursor-pointer" size={40} />

          <div id="slider" className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {movies.map((movie, index) => (
              <div key={index} className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
                <img className="w-full h-40 block object-cover object-top" src={createImageUrl('j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg', 'w500')} alt="" />
                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">{movie.name}</p>
                  <AiOutlineClose onClick={() => handleUnlike(movie)} size={30} className="absolute top-2 right-2" />
                </div>
              </div>
            ))}
          </div>

          <MdChevronRight onClick={() => slider(500)} className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer" size={40} />
        </div>
      </div>
    </>
  );
}

export default Profile;
