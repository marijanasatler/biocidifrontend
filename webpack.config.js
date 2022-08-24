module.exports = { 
    module: {
      images:{
        domains: ["res.cloudinary.com"],
        domains:["youtube.com"],
      },
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: [
            {
              loader: "source-map-loader",
              options: {unknownContextCritical: false,
                unknownContextRegExp: /^.\/.*$/,
                filterSourceMappingUrl: (url, resourcePath) => {
                  if (/broker-source-map-url\.js$/i.test(url)) {
                    return false;
                  }
  
                  if (/keep-source-mapping-url\.js$/i.test(resourcePath)) {
                    return "skip";
                  }
  
                  return true;
                },
              },
            },
          ],
        },
      ],
    },
  };

  