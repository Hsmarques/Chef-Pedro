import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/seo'

function BlogPage(props) {
  const post = get(props, 'data.contentfulBlogPost')
  const allPosts = get(props, 'data.allContentfulBlogPost')

  const thisEdge = allPosts.edges.find((edge) => edge.node.id === post.id)

  console.log(thisEdge)

  const nextPostURL = get(thisEdge, 'next.slug')
  const prevPostURL = get(thisEdge, 'previous.slug')

  return (
    <Layout>
      <SEO keywords={[`chef`, `Pedro`, `receitas`, `instagram`, `pão`]} title="About" />

      <section className="bg-white md:m-6">
        <article className="flex flex-col items-center p-4 md:pt-24 md:px-20 md:pb-16 ">
          <p className="text-xs">{post.updatedAt}</p>
          <h1 className="text-3xl text-center">{post.title}</h1>
          <div
            className="mt-2 md:px-12"
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </article>
        <div className="flex w-full py-8 justify-between">
          {prevPostURL && (
            <Link className="mr-auto ml-12" to={`/blog/${prevPostURL}`}>
              Previous Post
            </Link>
          )}
          {nextPostURL && (
            <Link className="ml-auto mr-12" to={`/blog/${nextPostURL}`}>
              Next Post
            </Link>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      title
      updatedAt(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulBlogPost(sort: { order: ASC, fields: updatedAt }) {
      edges {
        node {
          id
          slug
          updatedAt(formatString: "MMMM Do, YYYY")
          body {
            childMarkdownRemark {
              html
            }
          }
        }
        next {
          slug
        }
        previous {
          slug
        }
      }
    }
  }
`
