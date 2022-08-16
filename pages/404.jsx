import React from "react";
import styles from "../styles/Error.module.css";
import Button from "../components/Button";
import Link from "next/link";

const Error = () => {
  return (
    <section className={styles["wrapper"]}>
      <h1 className={styles["heading"]}>404</h1>
      <p className={styles['desc']}>Trang bạn yêu cầu không tìm thấy !!!</p>
      <Button>
        <Link href={"/"} passHref>
          Quay về trang chủ
        </Link>
      </Button>
    </section>
  );
};

export default Error;
