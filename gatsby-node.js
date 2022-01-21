const path = require("path");
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              body
              frontmatter {
                title
                path
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const blogPostTemplate = path.resolve(`src/templates/post-layout.js`);
  result.data.allMdx.edges.forEach(({ node }) => {
    const path = node.frontmatter.path;
    createPage({
      path,
      component: blogPostTemplate,
      context: {
        content: node,
        frontmatter: node.frontmatter,
      },
    });
  });
};
