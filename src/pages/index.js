import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Layout, Seo, Shader1 } from "../components/";
import Image from "../images/1.jpg";
import Mask from "../images/mask.png";

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fill, 25%);
`;
const LinkCard = styled(Link)`
  text-decoration: none;
`;
const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Grid>
      <LinkCard to="/shader1">
        <Shader1 width={600} height={700} image={Image} mask={Mask}></Shader1>
      </LinkCard>
    </Grid>
  </Layout>
);

export default IndexPage;
