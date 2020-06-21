const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const blogPostsPage = path.resolve('./src/templates/blog-posts-page.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(sort: { order: ASC, fields: createdAt }) {
              edges {
                node {
                  id
                  slug
                  title
                  createdAt(formatString: "MMMM Do, YYYY")
                  body {
                    childMarkdownRemark {
                      html
                    }
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })
        createPage({
          path: `/blog/`,
          component: blogPostsPage,
        })
      })
    )
  })
}
