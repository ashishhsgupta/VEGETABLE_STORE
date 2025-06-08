import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './StructurePage.css';


const ScrollTop = () => {

    useEffect(() => {

        let scrollTop = document.querySelector(".scroll-top");

        function toggleScrollTop() {
            if(scrollTop){
                window.scrollY > 100 
                ? scrollTop.classList.add("active")
                : scrollTop.classList.remove("active");
            }
        }

        if(scrollTop){
          scrollTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top:0,
                behavior:"smooth",
            });
          });
        }

        window.addEventListener("scroll", toggleScrollTop);

        return () => {
            if(scrollTop){
                scrollTop.removeEventListener("click", () => {});
            }
            window.removeEventListener("scroll", toggleScrollTop);
        };
    },[]);

  return (
    <div>
      <span id='scroll-top' className='scroll-top d-flex align-items-center justify-content-center cursor'>
        <FontAwesomeIcon icon={faAngleUp} />
        </span>
      
        
    </div>
  )
}

export default ScrollTop;
