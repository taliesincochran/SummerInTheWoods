module.exports = {
  siteMetadata: {
    title: `Gatsby Firebase Authentication`,
    author: `Taliesin Cochran`,
    description: "A Montessori Inspired Summer Camp in Carrboro, North Carolina",
    siteUrl: `https://www.summerinthewoodscamp.com`
  },
  pathPrefix: '/',
  plugins: [
  	`gatsby-plugin-react-helmet`, 
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    }
  ]
}
