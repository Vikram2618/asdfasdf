import image from '../assets/school.webp';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [loginModel, setLoginModel] = useState(false);

    useEffect(() => {
        const cursor = document.querySelector('.cursor');
        const handleMouseMove = (event) => {
            gsap.to(cursor, {
                x: event.clientX,
                y: event.clientY,
                scale: 1.2,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                duration: 0.2
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full relative overflow-hidden">
            <div className='cursor w-8 h-8 rounded-full z-100 bg-transparent fixed top-0 left-0 pointer-events-none'></div>
            
            <section className="w-full h-screen bg-gradient-to-r from-blue-300 via-purple-500 to-blue-200 text-white">
                <header className="w-full h-16 px-8 py-4 flex items-center justify-between bg-opacity-20 backdrop-blur-md">
                    <h1 className="text-3xl font-bold tracking-wide">Campus Connect</h1>
                    <button onClick={() => setLoginModel(!loginModel)}
                        className="bg-white text-black hover:bg-gray-300 px-6 py-2 rounded-full shadow-md transition-all duration-300">
                        Sign In
                    </button>
                </header>

                {loginModel && (
                    <div className='absolute top-16 right-20 rounded-lg px-6 py-4 flex flex-col items-center bg-white text-black shadow-lg'>
                        <Link to={'/student/login'} className="hover:bg-gray-200 px-4 py-2 text-lg rounded-md w-full text-center transition-all">As Student</Link>
                        <Link to={'/teacher/login'} className="hover:bg-gray-200 px-4 py-2 text-lg rounded-md w-full text-center transition-all">As Teacher</Link>
                        <Link to={'/admin/login'} className="hover:bg-gray-200 px-4 py-2 text-lg rounded-md w-full text-center transition-all">As Admin</Link>
                    </div>
                )}

                <main className="w-full h-full flex items-center justify-between px-10">
                    <div>
                        <p className="text-7xl font-extrabold mb-4 drop-shadow-md">Hello, <span className="text-yellow-300">Buddy!</span></p>
                        <p className="text-5xl font-bold drop-shadow-md">Let's Connect with your Campus.</p>
                        <button className="mt-6 px-8 py-3 bg-yellow-300 text-black text-lg font-semibold rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                    <img src={image} alt="Campus" className="w-1/3 drop-shadow-xl " />
                </main>
            </section>
        </div>
    );
}

export default HomePage;