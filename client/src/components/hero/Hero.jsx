import './hero.css'
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='hero'>
        <div className='background'>
          <div className='SideLeftTop'>
            <img src='/BigLeaveLight.png' className='bigLeaveLight1'/>
            <img src='/SmallLeaveDark.png' className='smallLeaveDark1'/>
            <img src='/BigCircle.png' className='bigCircle1'/>
            <img src='/Circle Small.png' className='smallCircle1'/>
            <img src='/SenseBig.png' className='senseBig2'/>
            <img src='/SenseSmall.png' className='senseSmall1'/>
            <img src='/StarLeftSide.png' className='starLeftSide'/>
          </div>

          <div className='SideRightTop'>
            <img src='/BigLeaveDark.png' className='bigLeaveDark'/>
            <img src='/SenseSmall.png' className='senseSmall2'/>
            <img src='/StarUpperRight.png' className='starRightSide'/>
          </div>

          <div className='Bottom-container'>
            <div className='Bottom'>
              <img src='/BigCircle.png' className='bigCircleBottom'/>
              <img src='/Circle Small.png' className='smallCircleBottom'/>
              <img src='/SenseBig.png' className='senseBigBottom'/>
              <img src='/SenseSmall.png' className='senseSmallBtoom'/>
              <img src='/StarLeftDown.png' className='starBottom'/>
            </div>
          </div>
          
        </div>

        <div className='introduction'>
            <h1 className='titleName' style={{transform: `translateX(${scrollPosition * 2}px)`}}>Nav-able</h1>
        </div>
        <div className='switchButton'>
            <h1>switchButton</h1>
        </div>
        <div className='searchBox'>
            <h1>searchBox</h1>
        </div>
    </div>
  )
}

export default Hero