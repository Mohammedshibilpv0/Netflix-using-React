/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import endpoints, { createImageUrl } from '../services/Movieservices';
import axios from 'axios';
import Rowposter from './Rowposter';

function Singlemovie({ id }) {
    const { findbyid } = endpoints;
    const [movie, setMovie] = useState({});
    const [play, setPlay] = useState(false);
    const playRef = useRef(null);
    const [videoKey, setVideoKey] = useState('');

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await axios.get(`${findbyid}/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
                console.log(response.data);
                setMovie(response.data);

                const videos = response.data.videos.results;
                const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    setVideoKey(trailer.key);
                }
            } catch (error) {
                console.error("Failed to fetch movie data:", error);
            }
        }

        fetchMovie();
    }, [id, findbyid]);
    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}`;

    const truncate = (str, length) => {
        if (!str) return " ";
        return str.length > length ? str.slice(0, length) + '....' : str;
    };

    const handlePlayClick = () => {
        setPlay(true);
        setTimeout(() => {
            if (playRef.current) {
                playRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100); // Delay to ensure the state update is applied
    };

    const { title, backdrop_path, release_date, overview } = movie;
    const {action,Romantic,ScienceFiction}=endpoints
    return (
        <>
            <div className="w-full h-[500px] lg:h-[850px]">
                <div className="w-full h-full">
                    <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
                    <img
                        className="w-full h-full object-cover object-top"
                        src={createImageUrl(backdrop_path, 'original')}
                        alt=""
                    />
                    <div className="absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8">
                        <h1 className="text-3xl md:text-6xl font-nsans-bold pt-10">{title}</h1>
                        <div className="mt-8 mb-4">
                            <button className="capitalize border bg-gray-300 text-black py-2 px-5" onClick={handlePlayClick}>Play</button>
                            <button className="capitalize border border-gray-300 py-2 px-5 ml-4">Watch later</button>
                        </div>
                        <p className="text-gray-400 text-sm">{release_date}</p>
                        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{truncate(overview, 165)}</p>
                    </div>
                </div>
            </div>

            <div className="py-11 p-7 mx-auto text-white">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <div className="flex space-x-4 text-gray-400 mt-2">
                    <span>{movie.original_language?.toUpperCase()}</span>
                    <span>{movie.genres?.map(genre => genre.name).join(', ')}</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span>{Math.floor(movie.runtime / 60)}hrs {movie.runtime % 60}mins</span>
                </div>
                <p className="mt-4">{movie.overview}</p>
            </div>

            {play && videoKey &&
                <div ref={playRef} className="flex items-center justify-center min-h-screen text-white">
                    <div className="relative w-[90%] rounded-lg overflow-hidden shadow-lg">
                        <div className="relative" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoKey}`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            }
            <Rowposter title='Recommended' url={recommendationsUrl} />
            <Rowposter title='ScienceFiction' url={ScienceFiction} />
            <Rowposter title='action' url={action} />
            <Rowposter title='Romantic' url={Romantic} />
        </>
    );
}

export default Singlemovie;
