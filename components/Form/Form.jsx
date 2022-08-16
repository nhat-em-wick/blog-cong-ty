import React from "react";
import styles from "./Form.module.css";

const FormText = ({ value, onChange, placeholder, error, id }) => {
  const handleChange = () => {
    if (!onChange) {
      return
    }
    onChange()
  };
  return (
    <div className={styles["form-text"]}>
      <input
        type="text"
        className={styles["form-text__input"]}
        value={value}
        onChange={onChange || null}
        placeholder={placeholder}
        id={id}
        name={id}
      />
      {error && <span className={styles["form-error"]}>{error}</span>}
    </div>
  );
};

const FormArea = ({ value, onChange, placeholder, error, id }) => {
  const handleChange = () => {
    if (!onChange) {
      return
    }
    onChange()
  };
  return (
    <div className={styles["form-area"]}>
      <textarea
        className={styles["form-area__input"]}
        placeholder={placeholder}
        onChange={onChange || null}
        name={id}
        id={id}
        cols="30"
        rows="7"
        value={value}
      />
      {error && <span className={styles["form-error"]}>{error}</span>}
    </div>
  );
};

export { FormText, FormArea };
