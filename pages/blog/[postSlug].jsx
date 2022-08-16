import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import postApi from "../../api/postsApi";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import styles from '../../styles/DetailPost.module.css'
import draftToHtml from "draftjs-to-html";
import Head from "next/head";

const DetailPost = ({ post }) => {
  
  const { handleSetHeading } = useContext(HeadingContext);
  const [contentState, setContentState] = useState(() => {
    if (post) {
     return EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)));
    } else {
     return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    handleSetHeading(post?.title);
  }, []);

  return (
    <>
    <Head>
      <title>{post?.title} - Xây dựng Việt Tín</title>
      <meta name="description" content='Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín'/>
    </Head>
    <section
    >
      <h1 className={styles['heading']}>{post?.title}</h1>
      <div className={styles['content']} dangerouslySetInnerHTML={{
        __html: draftToHtml(convertToRaw(contentState.getCurrentContent())),
      }}></div>
    </section>
    </>
  );
};

export async function getServerSideProps({params}) {
  const {postSlug} = params
  try {
    const res = await postApi.getPost(postSlug)
    return {
      props: {
        post: res.element,
      },
    };
  } catch (error) {
    console.error(error.data);
    return {
      notFound: true,
    }
  }
}

DetailPost.layout = "sidebar";

export default DetailPost;
