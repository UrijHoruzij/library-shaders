import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { createGlobalStyle } from "styled-components";
import { Header, Footer } from "./";

const GlobalStyle = createGlobalStyle`
  html{
    font: 100%/1.5 'Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    box-sizing: border-box;
    overflow-y: auto;
  }
  body{
    margin: 0;
  }
`;
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <Footer>
        © {new Date().getFullYear()} {data.site.siteMetadata?.title}
      </Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
