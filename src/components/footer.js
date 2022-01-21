import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, colors } from "./";

const FooterWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`;
const FooterEnd = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.gray.gray8};
  font-size: 0.875rem;
  padding-top: 3rem;
  margin-bottom: 3rem;
  margin-top: 1.5rem;
  border-top: 1px solid ${colors.gray.gray4};
`;

const Footer = (props) => {
  const { children } = props;

  return (
    <FooterWrapper>
      <FooterEnd>{children}</FooterEnd>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
