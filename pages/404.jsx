import React from "react";
import styles from "../styles/Error.module.css";
import Button from "../components/Button";
import Link from "next/link";
import Head from "next/head";

const Error = () => {
  return (
    <>
      <Head>
        <title>Xây dựng Việt Tín</title>
        <meta
          name="description"
          content="Chuyên thiết kế, thi công xây dựng nhà phố, biệt thự cao cấp, chung cư cao tầng, các công trình nhà ở cấp 4, biệt thự vườn, các hạng mục phụ khác."
        />
        <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>
      <section className={styles["wrapper"]}>
        <h1 className={styles["heading"]}>404</h1>
        <p className={styles["desc"]}>Trang bạn yêu cầu không tìm thấy !!!</p>
        <Button>
          <Link href={"/"} passHref>
            Quay về trang chủ
          </Link>
        </Button>
      </section>
    </>
  );
};

export default Error;
