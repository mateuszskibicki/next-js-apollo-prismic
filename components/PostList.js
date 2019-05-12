import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

export const allArticlesQuery = gql`
  query AllArticles {
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

// export const allArticlesQueryVars = {
//   skip: 0,
//   first: 10
// };

export default function PostList() {
  return (
    <Query query={allArticlesQuery}>
      {({ loading, error, data }) => {
        console.log(data);
        if (error) return <ErrorMessage message="Error loading query." />;
        if (loading) return <div>Loading</div>;
        return (
          <section>
            <h1>post list</h1>
            <style jsx>{`
              section {
                padding-bottom: 20px;
              }
              li {
                display: block;
                margin-bottom: 10px;
              }
              div {
                align-items: center;
                display: flex;
              }
              a {
                font-size: 14px;
                margin-right: 10px;
                text-decoration: none;
                padding-bottom: 0;
                border: 0;
              }
              span {
                font-size: 14px;
                margin-right: 5px;
              }
              ul {
                margin: 0;
                padding: 0;
              }
              button:before {
                align-self: center;
                border-style: solid;
                border-width: 6px 4px 0 4px;
                border-color: #ffffff transparent transparent transparent;
                content: "";
                height: 0;
                margin-right: 5px;
                width: 0;
              }
            `}</style>
          </section>
        );
      }}
    </Query>
  );
}

// function loadMorePosts (allPosts, fetchMore) {
//   fetchMore({
//     variables: {
//       skip: allPosts.length
//     },
//     updateQuery: (previousResult, { fetchMoreResult }) => {
//       if (!fetchMoreResult) {
//         return previousResult
//       }
//       return Object.assign({}, previousResult, {
//         // Append the new posts results to the old one
//         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
//       })
//     }
//   })
// }
