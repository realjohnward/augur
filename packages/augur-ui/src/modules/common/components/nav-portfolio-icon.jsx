import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const NavPortfolioIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("nav-portfolio-icon", { [className]: className })}
  >
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g id="Icon/Portfolio" stroke="#FFFFFF">
        <path
          d="M11.9999332,7.72416029 C13.2322058,7.72416029 13.6306535,7.72416029 14.8619543,7.72416029 C15.1603042,7.72416029 15.2516556,7.63475251 15.2516556,7.34320537 C15.2526274,6.65904142 15.2526274,6.59392923 15.2516556,5.90976528 C15.2516556,5.62988003 15.1544732,5.52783853 14.8784753,5.52783853 C12.4012964,5.52589488 11.5907954,5.52589488 9.11361654,5.52783853 C8.84442135,5.52783853 8.74918262,5.62696456 8.74918262,5.8942161 C8.7482108,6.57157728 8.7482108,6.63085853 8.7482108,7.30821971 C8.7482108,7.64835804 8.8220694,7.72416029 9.15734861,7.72416029 L11.9999332,7.72416029 Z M11.9882713,20.9691467 C9.08057453,20.9691467 6.17287775,20.9681749 3.2661528,20.9701186 C2.79773373,20.9701186 2.39539868,20.8379505 2.16410462,20.4054889 C2.07469683,20.2402789 2.00764099,20.0391114 2.00764099,19.853493 C1.99792275,16.1838864 1.9998664,12.5133079 2.00083822,8.84175765 C2.00181004,8.18966389 2.49744018,7.72901941 3.20395607,7.72513212 C4.07859748,7.72124482 4.95129525,7.72416029 5.82496484,7.72416029 C6.14469486,7.72416029 6.22632806,7.64058345 6.22632806,7.3159943 C6.22729988,6.63085853 6.22632806,5.73289335 6.22729988,5.0487294 C6.22924353,3.87282261 7.04168822,3.01664585 8.21370771,3.00984309 C10.7355904,2.99623755 13.2594168,2.99720938 15.7822714,3.00984309 C16.9504036,3.01567403 17.7725665,3.87865356 17.7735383,5.04775758 C17.7745102,5.73872429 17.7735383,6.64349224 17.7735383,7.33543078 C17.7745102,7.6425271 17.8561434,7.72416029 18.1710143,7.72416029 C19.043712,7.72416029 19.9173816,7.72124482 20.7910512,7.72513212 C21.4091311,7.72804759 21.8542264,8.06915774 21.9776481,8.62892824 C21.9961127,8.71639238 21.9990282,8.80968747 21.9990282,8.90006708 C22,12.5123361 22,16.1236333 22,19.7359023 C22,20.4890658 21.5451865,20.9584567 20.7900794,20.9672031 C20.1904641,20.9749777 19.5908488,20.9691467 18.9902617,20.9691467 L11.9882713,20.9691467 Z"
          id="Page-1"
        />
      </g>
    </g>
  </svg>
);

export default NavPortfolioIcon;

NavPortfolioIcon.propTypes = {
  className: PropTypes.string
};

NavPortfolioIcon.defaultProps = {
  className: null
};
