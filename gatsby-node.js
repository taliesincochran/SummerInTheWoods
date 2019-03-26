const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);
const fsPromise = require('fs-extra-promise');
const sm = require('sitemap');

function pagesToSitemap(pages) {
  const urls = pages.map((p) => {
    if (p.path !== undefined) {
      return {
        url: p.path,
        changefreq: 'daily',
        priority: 0.7
      }
    }
  })
  // remove undefined (template pages)
  return urls.filter(u => u !== undefined)
};

// function generateSiteMap(pages) {
//   const sitemap = sm.createSitemap({
//     hostname: 'https://www.summerintthewoodscamp.com',
//     cacheTime: '60000',
//     urls: pagesToSitemap(pages),
//   })
//   console.log('Generating sitemap.xml')
//   fsPromise.writeFileSync(
//     `${__dirname}/public/sitemap.xml`,
//     sitemap.toString()
//   )
// };

exports.postBuild = (pages, callback) => {
  generateSiteMap(pages)
  callback()
};
const env = process.env.NODE_ENV || 'development';
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          }
        ],
      },
    })
  }
}

