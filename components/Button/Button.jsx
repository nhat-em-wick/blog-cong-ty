import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, classNames }) => {
  const handleClick = () => {
    if(onClick) {
      onClick()
    }
  }
  return (
    <button
      onClick={handleClick}
      className={`${styles["button"]} ${classNames}`}
    >
      {children}
    </button>
  );
};
Button.defaultProps = {
  onClick: null
}
export default Button;
