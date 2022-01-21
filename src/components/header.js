import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";
import { Container, colors } from "./";

const HeaderWrapper = styled.div`
  z-index: 1000;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  background: ${colors.gray.gray1};
  border-bottom: 1px solid ${colors.gray.gray4};
`;
const HeaderContent = styled(Container)`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
`;
const Logo = styled(Link)`
  text-decoration: none;
`;
const HeaderNav = styled.div`
  height: 40px;
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContent>
      <HeaderNav>
        <Logo to="/">{siteTitle}</Logo>
      </HeaderNav>
    </HeaderContent>
  </HeaderWrapper>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
