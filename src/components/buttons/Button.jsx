import "./buttons.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({
  size = "medium",
  text = "Donate Now",
  type = "primary",
  link = false,
  onClick = () => {},
}) {
  const buttonSizes = {
    small: "btn-sm",
    medium: "btn-md",
    large: "btn-lg",
  };

  return (
    <>
      {link ? (
        <Link
          to={link}
          className={`btn btn-theme-${type} ${buttonSizes[size]}`}
        >
          {text}
        </Link>
      ) : (
        <button className={`btn btn-theme-${type} ${buttonSizes[size]}`}  onClick = {onClick}>
          {text}
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "grey"]),
  link: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
