import PropTypes from "prop-types";
import { Link } from "../server/next-routes/next-router";

const Header = () => {
  return (
    <div>
      <Link route="/">
        <button>Homepage</button>
      </Link>
      <Link route="/about">
        <button>About</button>
      </Link>
    </div>
  );
};

// Header.propTypes = {

// }

export default Header;
