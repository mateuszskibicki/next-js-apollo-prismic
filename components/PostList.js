import { Query } from "react-apollo";
import ErrorMessage from "./ErrorMessage";
import { GET_ALL_ARTICLES } from "../queries";

export default function PostList() {
  return (
    <Query query={GET_ALL_ARTICLES}>
      {({ loading, error, data }) => {
        console.log(data);
        if (error) return <ErrorMessage message="Error loading query." />;
        if (loading) return <div>Loading</div>;
        return (
          <section>
            <h1>post list</h1>
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
