import styles from "../styles/Contact.module.css";
import Title from "../components/Title";
import PageHeader from "../components/PageHeader";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { FormText, FormArea } from "../components/Form";
import Button from "../components/Button";
import { useContext, useEffect } from "react";
import { HeadingContext } from "../contexts/HeadingProvider";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const { handleSetHeading } = useContext(HeadingContext);

  useEffect(() => {
    handleSetHeading("Liên hệ");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Bắt buộc"),
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      message: Yup.string().required("Bắt buộc"),
      phone: Yup.string()
        .required("Bắt buộc")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không hợp lệ"),
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  });

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  return (
    <>
      <Head>
        <title>Liên hê - Xây dựng Việt Tín</title>
        <meta
          name="description"
          content="Mọi thắc mắc xin liên hệ qua qua email: viettinconstructions@gmail.com."
        />
      <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>
      <PageHeader />
      <div className={styles["wrapper"]}>
        <div className="grid wide">
          <div className="row">
            <div className="col l-8 m-12 c-12">
              <section className={styles["info"]}>
                <Title title="Thông tin liên hệ" />
                <div className="row">
                  <div className="col l-6 m-6 c-12">
                    <li className={styles["info-item"]}>
                      <span className={styles["info-icon"]}>
                        <FaMapMarkerAlt />
                      </span>
                      <p className={styles["info-desc"]}>
                        Tầng 5, Dream Home 2, Đường 59, P.14, Gò Vấp, Tp.HCM
                      </p>
                    </li>
                  </div>
                  <div className="col l-6 m-6 c-12">
                    <li className={styles["info-item"]}>
                      <span className={styles["info-icon"]}>
                        <GrMail />
                      </span>
                      <p className={styles["info-desc"]}>
                        viettinconstructions@gmail.com
                      </p>
                    </li>
                  </div>
                  <div className="col l-6 m-6 c-12">
                    <li className={styles["info-item"]}>
                      <span className={styles["info-icon"]}>
                        <BsTelephoneFill />
                      </span>
                      <p className={styles["info-desc"]}>
                        0787223939 - 0962581867
                      </p>
                    </li>
                  </div>
                  <div className="col l-6 m-6 c-12">
                    <li className={styles["info-item"]}>
                      <span className={styles["info-icon"]}>
                        <FaClock />
                      </span>
                      <p className={styles["info-desc"]}>8:00 - 17:00</p>
                    </li>
                  </div>
                </div>
              </section>
            </div>
            <div className="col l-4 m-12 c-12">
              <section className={styles["form-wrapper"]}>
                <Title title="Form liên hệ" />
                <div className={styles["form-list"]}>
                  <FormText
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder={"Họ và tên"}
                    error={formik.errors.name}
                    id="name"
                  />
                  <FormText
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder={"Email"}
                    error={formik.errors.email}
                    id="email"
                  />
                  <FormText
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    placeholder={"Số điện thoại"}
                    error={formik.errors.phone}
                    id="phone"
                  />
                  <FormArea
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    placeholder={"Lời nhắn"}
                    error={formik.errors.message}
                    id="message"
                  />
                  <Button onClick={handleSubmit}>Gửi</Button>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section className={styles["map"]}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.2124544838748!2d106.650682836771!3d10.85525110731124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b6073338e7%3A0xbd1c7eaf3bc58f8f!2sChung%20c%C6%B0%20Dreamhome%202%20-%20Residence!5e0!3m2!1svi!2s!4v1660039030980!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default Contact;
