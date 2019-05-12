import { ApolloClient, InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { PrismicLink } from "apollo-link-prismic";

let apolloClient = null;

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: PrismicLink({
      uri: "http://live-clean-mf.prismic.io/graphql",
      accessToken:
        "MC5YTlVxbEJBQUFGN3VDTGxk.Q25u77-9KVnvv73vv71677-977-977-977-9Nknvv73vv73vv73vv73vv73vv73vv71R77-9P--_vQlE77-977-9Ewk",
      fetch: !process.browser && fetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
