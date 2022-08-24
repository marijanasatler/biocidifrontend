import { DOMAIN } from "../config"

export default function Custom404() {
    return(<div className="" style={{width:'100vw',height:'100vh',paddingTop:'10%',backgroundImage:'url(`${DOMAIN}/static/images/bglogo3.png`)',
     background: 'linear-gradient(-190deg, #8860d8, #23a6d5, #23d5ab ,darkgreen)',
 backgroundSize: '200% 200%',filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',
     animation:'gradient 25s ease infinite'}}>

    <div className="text-center container " style={{display:'block',justifyContent:'center'}}>

    <img  src={`${DOMAIN}/static/images/3d.png`} style={{filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))',width:'auto'}} />
         <h5 style={{maxWidth:'100%',filter:' drop-shadow(0 6px 2px rgba(0,0,0,.8))'}}  className="text-white mt-5 ">СТРАНИЦА НИЈЕ ПРОНАЂЕНА | STRANICA NIJE PRONAĐENA | PAGE NOT FOUND </h5>
       <div className="mt-4 text-white"> 
              <a href={`${DOMAIN}`} style={{textDecoration:'none',color:'white',margin:'0 1%'  }} >НАЗАД НА ПОЧЕТНУ </a> <b>
                  | </b>
                <a href={`${DOMAIN}/lat`} style={{textDecoration:'none', color:'white',margin:'0 1%'  }} c>NAZAD NA POČETNU </a>

               <b>
                  | </b>
                <a href={`${DOMAIN}/en`} style={{textDecoration:'none', color:'white',margin:'0 1%'  }} >  BACK TO HOME  </a>
            </div>
            <div className="mt-5">  <a href={`${DOMAIN}/lat`} style={{textDecoration:'none', color:'white',margin:'0 2%'  }} >

               www.biocidi.org.rs
            </a>

              <a href={`${DOMAIN}/lat`} style={{textDecoration:'none', color:'white',margin:'0 2%'  }} >

                 zavod@biocidi.org.rs
            </a>
            </div>
    </div>
    </div>
    )}