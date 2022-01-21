import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Layout, Container } from "../components";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
const Post = (props) => {
  return (
    <Layout>
      <Container>
        <MDXProvider>
          <MDXRenderer>{props.pageContext.content.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Layout>
  );
};

export default Post;
