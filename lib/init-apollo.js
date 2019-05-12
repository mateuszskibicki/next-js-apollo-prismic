import { ApolloClient, InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { PrismicLink } from "apollo-link-prismic";

let apolloClient = null;

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: PrismicLink({
      uri: "https://mateusz-skibicki-blog.prismic.io/graphql",
      accessToken:
        "MC5YTkxHcVJBQUFNQ0FjdmZs.En11Vu-_ve-_ve-_vSnvv71QYO-_vU_vv70IDxPvv70vL--_ve-_vVPvv73vv73vv71o77-977-9dUHvv70",
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
