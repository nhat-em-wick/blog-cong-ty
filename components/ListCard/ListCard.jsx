import { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ListCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import CardType1 from "./components/CardType1";
import CardType2 from "./components/CardType2";
import { v4 as uuidv4 } from "uuid";

const ListCardSlider = ({ list, cardType, classNames }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const checkCardType = (item) => {
    if (cardType === "v1") {
      return <CardType1 item={item} />;
    }
    if (cardType === "v2") {
      return <CardType2 item={item} />;
    }
  };

  return (
    <div className={`${styles["wrapper"]} ${classNames}`}>
      <div className={styles["slider-control"]}>
        <button
          ref={navigationPrevRef}
          className={`${styles["slider-control__btn"]} ${styles["control--prev"]}`}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          ref={navigationNextRef}
          className={`${styles["slider-control__btn"]} ${styles["control--next"]}`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        modules={[Navigation]}
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
        {list
          .map((item) => (
            <SwiperSlide key={uuidv4()}>{checkCardType(item)}</SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

ListCardSlider.propTypes = {
  list: PropTypes.array.isRequired,
  cardType: PropTypes.string,
  classNames: PropTypes.string,
};
ListCardSlider.defaultProps = {
  cardType: "v1",
  classNames: "",
};

const ListCardGrid = ({ list, cardType, classNames, grid }) => {
  const checkCardType = (item) => {
    if (cardType === "v1") {
      return <CardType1 item={item} />;
    }
    if (cardType === "v2") {
      return <CardType2 item={item} />;
    }
  };

  const showGrid = useMemo(() => {
    switch (grid) {
      case 1:
        return "col l-12 m-12 c-12";
        break;
      case 2:
        return "col l-6 m-6 c-12";
        break;
      case 3:
        return "col l-4 m-4 c-12";
        break;
      case 4:
        return "col l-3 m-3 c-12";
        break;
      default:
        return "col l-3 m-3 c-12";
        break;
    }
  }, [grid]);

  return (
    <div className={`${styles["wrapper"]} ${classNames}`}>
      <div className="row">
        {list
          .map((item) => (
            <div key={uuidv4()} className={showGrid}>
              {checkCardType(item)}
            </div>
          ))}
      </div>
    </div>
  );
};
ListCardGrid.propTypes = {
  list: PropTypes.array.isRequired,
  cardType: PropTypes.string,
  classNames: PropTypes.string,
};
ListCardGrid.defaultProps = {
  cardType: "v1",
  classNames: "",
};

export { ListCardSlider, ListCardGrid };
