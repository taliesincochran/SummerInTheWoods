module.exports = {
  siteMetadata: {
    title: `Gatsby Firebase Authentication`,
    author: `Taliesin Cochran`,
    description: "A Montessori Inspired Summer Camp in Carrboro, NC"
  },
  pathPrefix: '/',
  plugins: [
  	`gatsby-plugin-react-helmet`, 
  	`gatsby-plugin-react-next`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
  	{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
   resolve: `gatsby-plugin-less`,
   options: {
     strictMath: true,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
  ],
}
