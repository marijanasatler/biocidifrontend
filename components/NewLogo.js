import React,{useState,useEffect} from 'react';
import styles from '../styles/styles.module.css'
import 'react-slideshow-image/dist/styles.css';
import { Zoom,Fade,Slide } from 'react-slideshow-image';
import { list } from '../actions/logo';
import { API } from '../config';


export default function NewLogo() {

  const [logo, setLogo] = useState([]);
  useEffect(() => {
      loadLogo();
  }, []);

  const loadLogo = () => {
      list().then(data => {
       // if(data === undefined){
      //    null
       // }
         if (data.error) {
             console.log(data.error); }
           else {
              setLogo(data);
          }
      });
  };
  const zoomInProperties = {
    indicators: false,
    arrows:false,

  }

  const slide = () => {
    return logo.map((l, i) => {
        return (
            <div key={i}>
          <img alt="" className={styles.logoIcon} src={`${API}/logo/photo/${l.slug}`}  onError={image => (image.target.src = `${DOMAIN}/static/images/logo.png`)}  />
         </div>
        );
    });
};



  return (

<div className={styles.logoC}>
<Fade easing="ease" {...zoomInProperties} >{slide()}</Fade> 
</div>
   
  );
}