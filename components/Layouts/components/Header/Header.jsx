import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../../../assets/images/logo-anh-vien-trang.png";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const menu = [
  {
    path: "/",
    display: "trang chủ",
  },
  {
    path: "/about",
    display: "giới thiệu",
  },
  {
    path: "/blog",
    display: "blog",
  },
  {
    path: "/contact",
    display: "liên hệ",
  },
];

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [expanded, setExpanded] = useState(false)
  const menuRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const handleSticky = () => {
      if (window.pageYOffset >= menuRef.current.offsetHeight) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  useEffect(() => {
    setExpanded(false)
  }, [router.pathname])

  return (
    <>
      <header className={styles["wrapper"]}>
        <div className="grid wide">
          <div ref={menuRef} className={styles["top"]}>
            <div className={styles["logo"]}>
              <Image src={logo} layout="fill" alt=""></Image>
            </div>
            <div className={styles["info"]}>
              <div className={styles["info-item"]}>
                <span className={styles["info-icon"]}>
                  <BsTelephoneFill />
                </span>
                <div className={styles["info-desc"]}>
                  <h4 className={styles["info-title"]}>Điện thoại</h4>
                  <p>0787223939 - 0962581867</p>
                </div>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-icon"]}>
                  <MdEmail />
                </span>
                <div className={styles["info-desc"]}>
                  <h4 className={styles["info-title"]}>Email</h4>
                  <p>viettinconstructions@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className={`${styles["navbar"]} ${sticky ? styles["sticky"] : ""}`}>
        <div className="grid wide">
          <div className={styles["navbar-inner"]}>
            <Link href={"/"}>
              <a className={styles["navbar-logo"]}>
                <Image src={logo} layout="fill" alt=""></Image>
              </a>
            </Link>
            <ul className={styles["menu"]}>
              {menu.map((item, index) => (
                <li key={index} className={styles["menu-item"]}>
                  <Link href={item.path}>
                    <a className={`${styles["menu-link"]} ${router.pathname === item.path ? styles['active'] : ''}`}>{item.display}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles["navbar-socials"]}>
              <Link href="https://www.facebook.com/VietTinConstruction">
                <a target={'_blank'} className={styles["navbar-socials__link"]}>
                  <FaFacebookF />
                </a>
              </Link>
              <Link href="https://www.youtube.com/channel/UCJ6e21nceIZfAH0f2LGb3kQ">
                <a target={'_blank'} className={styles["navbar-socials__link"]}>
                  <FaYoutube />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles['mobile']}>
          <div className={styles['mobile-header']}>
              <Link href={"/"}>
                <a className={styles["mobile-logo"]}>
                  <Image src={logo} layout="fill" alt=""></Image>
                </a>
            </Link>
            <button onClick={() => setExpanded(!expanded)} className={styles['button--toggle']}>
              {
                expanded ? <FaTimes /> : <FaBars />
              }
            </button>
          </div>
          <nav className={`${styles["navbar-collapse"]} ${expanded ? styles['expanded']: ''}`}>
            <ul className={styles['navbar-list']}>
            {menu.map((item, index) => (
                <li key={index} className={styles["navbar-item"]}>
                  <Link href={item.path}>
                    <a className={`${styles["navbar-link"]} ${router.pathname === item.path ? styles['active'] : ''}`}>{item.display}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
      </div>
    </>
  );
};

export default Header;
