import './hero.css'
import { useState } from 'react'


const Hero = () => {
    const [toggled, setToggled] = useState(false);
    const [toggled1, setToggled1] = useState(false);
  return (
    <div className='hero'>
        <div className='introduction'>
            <h1>Nav-able</h1>
            <p>This is just a description of the project. It basically tells you what to expect from this project. So far, there is nothing here and I’m typing all these just because we haven’t got a description. This is just a placeholder text and I’m sick of Lorem Ipsum giving me trauma from those 3 years of back pain and strained eyes.</p>
        </div>
        <div className='switchButton'>
            <div className="switch-container">
            <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => setToggled(!toggled)}>
                <div className="thumb"></div>
            </button>
            <p>Voice</p>
            </div>
            <div className="switch-container">
            <button className={`toggle-btn ${toggled1 ? 'toggled' : ''}`} onClick={() => setToggled1(!toggled1)}>
                <div className="thumb"></div>
            </button>
            <p>Vision</p>
            </div>
        </div>
        <div className='searchBox'>
            <div className="mt-10 p-6 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-lg">
                <p className="text-center text-white text-lg mb-4">Try out some searching!</p>
                    <input 
                        id="searchInput"
                        type="text" 
                        placeholder="Type something here..." 
                        className="w-full p-3 rounded-lg text-black"
                    />
            </div>
        </div>
    </div>
  )
}

export default Hero