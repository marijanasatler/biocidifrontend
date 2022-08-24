import React, { useEffect, useState }  from 'react';
import styles from '../styles/styles.module.css'

const ScrollToTop=(props)=>{
  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);


return(
       
<div  >

{isVisible && (
    <div  onClick={scrollToTop} className={styles.toTop} style={{}}  >

<i  class="fa fa-arrow-circle-up"></i>
    </div>      )} 

  </div>
);}

export default ScrollToTop;