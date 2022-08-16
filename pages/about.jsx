import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { HeadingContext } from "../contexts/HeadingProvider";
import pageApi from "../api/pageApi";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import Head from "next/head";

const About = ({ page }) => {
  const { handleSetHeading } = useContext(HeadingContext);
  const [contentState, setContentState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(page.content))));

  useEffect(() => {
    handleSetHeading("Giới thiệu");
  }, []);


  return <>
    <Head>
      <title>Giới thiệu - Xây dựng Việt Tín</title>
      <meta name="description" content='Đội ngũ Kiến Trúc Sư và Kỹ Sư với mong muốn mang lại những “giá trị không gian sống đích thực”, cho bất cứ gia chủ nào trên mảnh đất Việt Nam với vẻ đẹp, hiện đại, đầy sáng tạo, tính hợp lý cho căn nhà của mình nên đã thành lập Công Ty Cổ Phần Tư Vấn Thiết Kế Xây Dựng Việt Tín, để phục vụ quý khách hàng. Từ đó Việt Tín ra đời.'/>
    </Head>
   <section dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(contentState.getCurrentContent()))}}></section>;
    
    </>
};

export async function getServerSideProps() {
  try {
    const res = await pageApi.getPage("gioi-thieu");
    return {
      props: {
        page: res.element,
      },
    };
  
  } catch (error) {
    console.error(error);
    return {
      props: {
        page: null,
      },
    };
  }
}

About.layout = "sidebar";

export default About;
