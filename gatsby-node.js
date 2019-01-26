const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)
const webpack = require(`webpack`);

let env = process.env.NODE_ENV || 'development';
console.log('env', env);
require('dotenv').config({ path: `./.env.${env}` }); 

new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators

//   return new Promise((resolve, reject) => {
//     const pages = []
//     const blogPost = path.resolve("./src/templates/blog-post.js")
//     resolve(
//       graphql(
//         `
//       {
//         allMarkdownRemark(limit: 1000) {
//           edges {
//             node {
//               frontmatter {
//                 path
//               }
//             }
//           }
//         }
//       }
//     `
//       ).then(result => {
//         if (result.errors) {
//           console.log(result.errors)
//           reject(result.errors)
//         }

//         // Create blog posts pages.
//         _.each(result.data.allMarkdownRemark.edges, edge => {
//           createPage({
//             path: edge.node.frontmatter.path,
//             component: blogPost
//           })
//         })
//       })
//     )
//   })
// }
