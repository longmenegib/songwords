import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function HeroHome() {

    const [generated, setGenerated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);

    const canvasRef = useRef(null);

    const generation = async () => {
        setGenerated(null);
        setLoading(true);
        setImageLoaded(false)
        const response = await axios.post("/api/generateQuote", {title: title, artist: artist});
        const data = await response.data;
        if (data.success) {
            let size = 32;
            if (data.completion.length > 84) {
                size = 32
            }
            setGenerated(`https://textoverimage.moesif.com/image?image_url=${encodeURIComponent(data.response)}&overlay_color=0000007f&text=${data.completion}&text_size=${size}&y_align=middle&x_align=center`);
            setLoading(false);
        }
    }

    async function downloadImage(imageSrc) {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = 'Songword Quote'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <section className="relative">
            {/* Illustration behind hero content */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 pointer-events-none z-10" aria-hidden="true">
                <svg width="100vw" height="90vh" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                            <stop stopColor="#bbb" offset="0%" />
                            <stop stopColor="gray" offset="77.402%" />
                            <stop stopColor="#DFDFDF" offset="100%" />
                        </linearGradient>
                    </defs>
                    <g fill="url(#illustration-01)" fillRule="evenodd">
                        <circle cx="1232" cy="128" r="118" />
                        <circle cx="155" cy="443" r="64" />
                        <circle cx="12" cy="40" r="20" />
                    </g>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-2 sm:px-6 relative z-50">
                {/* Hero content */}
                <div className="pt-10 pb-12 md:pt-20 md:pb-20">
                    {/* Section header */}
                    <div className="text-center pb-12 md:pb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                            Get inspired by your favorite songs with our
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> quote generator.</span>
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                                Let the music guide you and the quotes inspire you on your journey to greatness.
                            </p>
                            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:items-center justify-center mb-4" data-aos="zoom-y-out" data-aos-delay="300">
                                <div className='mb-3 mr-1'>
                                    <label className=''>Author or Artist</label>
                                    <div>
                                        <input value={artist} onChange={(val) => setArtist(val.target.value)} className='h-12 rounded text-gray-700' type={'text'} placeholder="Example: Michael jackson" />
                                    </div>
                                </div>
                                <div className='mb-3 mr-1'>
                                    <label className=''>Song Title</label>
                                    <div className='w-full justify-center'>
                                        <input value={title} onChange={(val) => setTitle(val.target.value)} className='h-12 rounded text-gray-700' type={'text'} placeholder="Example: Bad" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a onClick={generation} className="btn text-white font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 w-full mb-4 sm:w-auto sm:mb-0  p-4 rounded" href="#0">
                                    Generate for free
                                </a>
                                {loading && <div className='pt-4 text-xs'>might take up to 15 seconds to generate....</div>}
                            </div>
                        </div>
                    </div>

                    {/* Hero image */}

                    {loading && <div className='flex justify-center' role="status">
                    <div class="animate-pulse flex space-x-4">
                                        <div class="rounded-2 bg-slate-200" style={{width: 512, height: 512}}></div>
                                    </div>
                    </div>
                    }
                    {generated &&
                        <div>
                            <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                                <div className="flex flex-col justify-center">
                                    <img className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'}`} src={generated} alt="Hero" onLoad={() => setImageLoaded(true)} />
                                {!imageLoaded && <div class="animate-pulse flex space-x-4">
                                        <div class="rounded-2 bg-slate-200" style={{width: 512, height: 512}}></div>
                                    </div>}
                                </div>
                                <button
                                    // href={generated}
                                    className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-2 shadow-lg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        downloadImage(generated);
                                    }}
                                    // download={'quote.png'}
                                    aria-controls="modal"
                                >
                                    <svg
                                        className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                                        <path d="M10 17l6-5-6-5z" />
                                    </svg>
                                    <span className="ml-3 text-indigo-900">Download</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default HeroHome;