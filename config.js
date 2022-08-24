import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;

    export const APP_NAME = publicRuntimeConfig.APP_NAME;
   
    export const DOMAIN = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.DOMAIN_PRODUCTION
    : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
 
export const REACT_APP_MAILCHIMP_U=publicRuntimeConfig.REACT_APP_MAILCHIMP_U;

export const REACT_APP_MAILCHIMP_ID=publicRuntimeConfig.REACT_APP_MAILCHIMP_ID;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;

export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;

export const NEXT_PUBLIC_MAILCHIMP_URL=publicRuntimeConfig.NEXT_PUBLIC_MAILCHIMP_URL;

export const CLOUDINARY_API_KEY    = publicRuntimeConfig.CLOUDINARY_API_KEY ;

export const   CLOUDINARY_CLOUD_NAME  = publicRuntimeConfig.CLOUDINARY_CLOUD_NAME  ;

export const    CLOUDINARY_API_SECRET = publicRuntimeConfig.CLOUDINARY_API_SECRET  ;

