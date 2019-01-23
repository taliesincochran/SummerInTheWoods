module.exports = {
  siteMetadata: {
    title: `Summer in the Woods Camp`,
    author: `Taliesin Cochran and Vytas Rudinskas`,
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
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,&$;
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
