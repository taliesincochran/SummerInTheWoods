var path = require('path');
module.exports = {
	siteMetadata: {
		title: "Summer In The Woods",
		author: "Taliesin Cochran",
		description: "A summer camp in Carrboro, NC based on Forty by HTML5 UP"
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'summer-in-the-woods-camp',
				short_name: 'summerinthewoods',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
			},
		},
		'gatsby-plugin-sass',
		'gatsby-plugin-offline',
		{
			resolve: `gatsby-plugin-layout`,
			options: {
				component: require.resolve(`./src/components/layout`)
			}

		}
	]
}
