import App from "../components/App";
import PostList from "../components/PostList";
import axios from "axios";

const IndexPage = props => {
  console.log(props);
  return (
    <App>
      <h1>app</h1>
      <PostList />
    </App>
  );
};

IndexPage.getInitialProps = async (req, res) => {
  const data = await axios.get("https://api.github.com/users/mateuszskibicki");
  return { test: data.data };
};

export default IndexPage;
