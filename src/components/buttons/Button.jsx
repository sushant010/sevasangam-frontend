import "./buttons.css";
import PropTypes from "prop-types";

function Button({
  size = "medium",
  text = "Donate Now",
  type = "primary",
  onClick = () => {},
}) {
  const buttonSizes = {
    small: "btn-sm",
    medium: "btn-md",
    large: "btn-lg",
  };

  return (
    <button
      className={`btn btn-theme-${type} ${buttonSizes[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "grey"]),
  onClick: PropTypes.func,
};

export default Button;
