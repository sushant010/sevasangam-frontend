import "./sectionLinearBg.css";
import PropTypes from "prop-types";

SectionLinearBg.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
};

export default function SectionLinearBg({ children, background }) {
  return (
    <section
      className="section-linear-bg"
      style={{ backgroundImage: `url('${background}')` }}
    >
      {children}
    </section>
  );
}
