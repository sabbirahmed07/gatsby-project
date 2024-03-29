import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"
import Head from "../components/head"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges.map((edge, i) => (
    <li key={i} className={blogStyles.post}>
      <Link to={`/blog/${edge.node.fields.slug}`}>
        <h2>{edge.node.frontmatter.title}</h2>
        <p>{edge.node.frontmatter.date}</p>
      </Link>
    </li>
  ))
  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>{posts}</ol>
    </Layout>
  )
}

export default BlogPage
