import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogCard = ({ slug, title, intro, blogImage }) => (
  <div className="">
    <Link to={`/blog/${slug}`} className="">
      <div className="h-full border-gray-200 rounded-lg  bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1">
        <Img
          className="lg:h-40 md:h-32 w-full object-cover object-center mb-3"
          fluid={blogImage.fluid}
          alt="blog"
        />
        <div className="px-6 pb-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
          <p className="leading-relaxed mb-3 text-gray-700">{intro.intro}</p>
        </div>
      </div>
    </Link>
  </div>
)

function BlogPostsPage(props) {
  const allPosts = get(props, 'data.allContentfulBlogPost.edges')
  const heroImage = get(props, 'data.blogHeroImage.childImageSharp.fluid.src')

  return (
    <Layout blogHeroImage={heroImage}>
      <SEO keywords={[`chef`, `Pedro`, `receitas`, `instagram`, `pão`]} title="Blogs Page" />
      <section className="text-gray-700 body-font">
        <div className="container py-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allPosts.map(({ node }) => (
              <BlogCard key={`${node.id}`} {...node} />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex-1 text-xs text-center mb-2">
            Photo by{' '}
            <a href="https://unsplash.com/@kate5oh3?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Katie Smith
            </a>{' '}
            on{' '}
            <a href="/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </span>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostsPage

export const pageQuery = graphql`
  query BlogPostsPage {
    allContentfulBlogPost(sort: { order: ASC, fields: createdAt }) {
      edges {
        node {
          id
          slug
          title
          intro {
            intro
          }
          blogImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          createdAt(formatString: "MMMM Do, YYYY")
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    blogHeroImage: file(relativePath: { eq: "blogs-page-hero.jpg" }) {
      childImageSharp {
        id
        fluid(quality: 90) {
          src
        }
      }
    }
  }
`
