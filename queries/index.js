import gql from "graphql-tag";

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    allSingleArticles(lang: "en-gb") {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
`;
