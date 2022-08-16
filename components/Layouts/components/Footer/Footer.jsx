import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import Title from "../../../Title";
import Image from "next/image";
import logo from "../../../../assets/images/logo.png";
import Link from "next/link";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import { GiSmartphone } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import categoryApi from "../../../../api/categoryApi";
import {GoPrimitiveDot} from 'react-icons/go'
import {v4 as uuidv4} from 'uuid'

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await categoryApi.getAll();
        const filterCate = res.elements.categories.filter(
          (cate) => cate.parent === null
        );
        setCategories(filterCate);
      } catch (error) {

      }
    };
    fetch();
  }, []);

  return (
    <footer className={styles["wrapper"]}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-4">
            <div className={styles["box"]}>
              <h2 className={styles["heading"]}>Xây dựng việt tín</h2>
              <div className={styles["logo"]}>
                <Image src={logo} layout="fill" alt=""></Image>
              </div>
              <p className={styles["desc"]}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Labore, doloribus autem! Culpa placeat mollitia voluptatem quos
                at aperiam, reiciendis delectus veniam earum consectetur
              </p>
              <div className={styles["socials"]}>
                <Link href="/">
                  <a className={`${styles["socials-item"]} ${styles["fb"]}`}>
                    <FaFacebookF />
                  </a>
                </Link>
                <Link href="/">
                  <a className={`${styles["socials-item"]} ${styles["yt"]}`}>
                    <IoLogoYoutube />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col l-4">
            <div className={styles["box"]}>
              <h2 className={styles["heading"]}>Danh mục</h2>
              <ul className={styles["categories"]}>
                <li className={styles["categories-item"]}>
                  {
                    categories.map((item) => (
                      <Link key={uuidv4()} href={`/${item.slug}`}>
                    <a className={styles["categories-link"]}>
                      <GoPrimitiveDot />
                      {item.name}
                    </a>
                  </Link>
                    ))
                  }
                  
                </li>
              </ul>
            </div>
          </div>
          <div className="col l-4">
            <div className={styles["box"]}>
              <h2 className={styles["heading"]}>thông tin liên hệ</h2>
              <div className={styles["contact-list"]}>
                <div className={styles["contact-item"]}>
                  <span className={styles["contact-icon"]}>
                    <RiRoadMapLine />
                  </span>
                  <p className={styles["contact-desc"]}>
                    Tầng 5, Dream Home 2, Đường 59, P.14, Gò Vấp, Tp.HCM
                  </p>
                </div>
                <div className={styles["contact-item"]}>
                  <span className={styles["contact-icon"]}>
                    <GiSmartphone />
                  </span>
                  <p className={styles["contact-desc"]}>
                    0787223939 - 0962581867
                  </p>
                </div>
                <div className={styles["contact-item"]}>
                  <span className={styles["contact-icon"]}>
                    <MdOutlineEmail />
                  </span>
                  <p className={styles["contact-desc"]}>
                    viettinconstructions@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
