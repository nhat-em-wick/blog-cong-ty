import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import slider1 from "../assets/images/banner.jpg";
import slider2 from "../assets/images/banner2.jpg";
import "swiper/css";
import { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Title from "../components/Title";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import banner from "../assets/images/banner.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { ListCardSlider, ListCardGrid } from "../components/ListCard";
import postApi from "../api/postsApi";
import categoryApi from '../api/categoryApi'

import {v4 as uuidv4} from 'uuid'

const Home = ({ features, models, exp }) => {
  const router = useRouter();
 
  return (
    <>
    <Head>
      <title>Xây dựng Việt Tín</title>
      <meta name="description" content='Chuyên thiết kế, thi công xây dựng nhà phố, biệt thự cao cấp, chung cư cao tầng, các công trình nhà ở cấp 4, biệt thự vườn, các hạng mục phụ khác.'/>
    </Head>
      <section className={styles["slider"]}>
        <Slider />
      </section>
      <section className={styles["about-us"]}>
        <div className="grid wide">
          <div className="row">
            <div className="col l-6 c-12 m-6">
              <Title title="Về chúng tôi" />
              <p className={styles["about-us__desc"]}>
              Đem lại giải pháp và dịch vụ xây dựng chất lượng, an toàn, nhanh chóng và tiết kiệm.
              </p>
              <p className={styles["about-us__desc"]}>
              Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu nên sự thành công của chúng tôi sẽ được đánh giá dựa trên mức độ hài lòng của khách hàng. Và điều tất yếu là phải đảm bảo chất lượng dịch vụ chu đáo, đáng tin cậy.
              </p>
              <p className={styles["about-us__desc"]}>
              Xây dựng môi trường làm việc chuyên nghiệp, năng động, thúc đẩy sự sáng tạo nhằm phát huy hết năng lực làm việc của nhân viên và thu hút nhân tài.
              </p>
              <Button
                classNames={styles["about-us__btn"]}
                onClick={() => router.push("/about")}
              >
                Xem thêm
              </Button>
            </div>
            <div className="col l-6 c-12 m-6">
              <div className={styles["about-us__image"]}>
                <Image
                  alt=""
                  src={
                    "https://xaydungviettin.vn/wp-content/uploads/2021/04/BANG-HIEU-CONG-TY-1536x947.jpg"
                  }
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["feature"]}>
        <div
          className={styles["feature-parallax"]}
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="grid wide">
            <div className={styles["feature-heading"]}>
              <Title title="dự án nổi bật" positionLine={"center"} />
            </div>
            <FeatureFilters list={features} />
          </div>
        </div>
      </section>
      <section className={styles["services"]}>
        <div className="grid wide">
          <Title title="mẫu nhà" />
          <ListCardSlider list={models} classNames={styles["services-slider"]} />
        </div>
      </section>
      <section className={styles["projects-new"]}>
        <div className="grid wide">
          <Title title="kinh nghiệm xây nhà" />
          <ListCardGrid list={exp} cardType={"v2"} classNames={styles["projects-grid"]} />
        </div>
      </section>
    </>
  );
};

const Slider = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation]}
      className="c"
      loop={true}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
      }}
    >
      <SwiperSlide>
        <div className={styles["slider-item"]}>
          <Image alt="" layout="fill" src={slider1} />
          <div className={styles["slider-text"]}>
            <h1 className={styles["slider-heading"]}>Xây dựng Việt Tín</h1>
            <p className={styles["slider-desc"]}>Thiết kế, thi công các công trình xây dựng</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles["slider-item"]}>
          <Image alt="" layout="fill" src={slider2} />
          <div className={styles["slider-text"]}>
            <h2 className={styles["slider-heading"]}>Xây dựng Việt Tín</h2>
            <p className={styles["slider-desc"]}>Thiết kế, thi công các công trình xây dựng</p>
          </div>
        </div>
      </SwiperSlide>
      <button
        ref={navigationPrevRef}
        className={`${styles["slider-control"]} ${styles["control--prev"]}`}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        ref={navigationNextRef}
        className={`${styles["slider-control"]} ${styles["control--next"]}`}
      >
        <MdKeyboardArrowRight />
      </button>
    </Swiper>
  );
};

const FeatureFilters = ({ list }) => {
  const [posts, setPosts] = useState(list);
  const [index, setIndex] = useState(0);

  const handleFilter = (slug, index) => {
    if (!slug) {
      setPosts(list);
    } else {
      const newPosts = list.filter((post) => {
        return post.categories.find((cate) => cate.slug === slug);
      });
      
      setPosts(newPosts);
    }
    setIndex(index);
  };

  return (
    <>
      <div className={styles["feature-filters"]}>
        <span
          onClick={() => handleFilter("", 0)}
          className={`${styles["feature-filters__item"]} ${
            index === 0 ? styles["active"] : ""
          }`}
        >
          Tất cả
        </span>
        <span
          onClick={() => handleFilter("nha-pho", 1)}
          className={`${styles["feature-filters__item"]} ${
            index === 1 ? styles["active"] : ""
          }`}
        >
          Nhà phố
        </span>
        <span
          onClick={() => handleFilter("biet-thu", 2)}
          className={`${styles["feature-filters__item"]} ${
            index === 2 ? styles["active"] : ""
          }`}
        >
          biệt thự
        </span>
      </div>

      <ul className={styles["feature-list"]}>
        <motion.div layout className="row">
          <AnimatePresence>
            {posts.map((item, index) => (
              <div key={uuidv4()} className="col l-3 m-4 c-12">
                <FeatureCard item={item} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ul>
    </>
  );
};

const FeatureCard = ({ item }) => {
  return (
    <motion.div
      layout
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration: .5}}
    >
      <li className={styles["feature-card"]}>
        <div className={styles["feature-card__image"]}>
          <Image alt="" layout="fill" src={item.thumbnail} />
        </div>
        <div className={styles["feature-card__overlay"]}>
          <div className={styles["feature-card__overlay-inner"]}>
            <Link href={`/blog/${item.slug}`} passHref>
              <h3 className={styles["feature-card__title"]}>{item.title}</h3>
            </Link>
          </div>
        </div>
      </li>
    </motion.div>
  );
};

export async function getServerSideProps() {
  try {
    const [cateFeature, cateModels, cateExp] = await Promise.all(
     [ categoryApi.getBySlug('du-an'),
      categoryApi.getBySlug('mau-nha'),
      categoryApi.getBySlug('kinh-nghiem-xay-nha')]
    )
    const [postsFeature, postsModels, postsExp] = await Promise.all(
      [postApi.getPosts({limit: 6, category: cateFeature.element._id}),
      postApi.getPosts({limit: 6, category: cateModels.element._id}),
      postApi.getPosts({limit: 6, category: cateExp.element._id})]
    )
      
   
    return {
      props: {
        features: postsFeature.elements.posts,
        models: postsModels.elements.posts,
        exp : postsExp.elements.posts
        // features: [],
        // services: [],
        // exp : []
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        features: [],
        services: [],
        exp : []
      },
    };
  }
}

export default Home;
