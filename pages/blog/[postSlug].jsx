import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import postApi from "../../api/postsApi";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import styles from "../../styles/DetailPost.module.css";
import draftToHtml from "draftjs-to-html";
import Head from "next/head";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ListCardSlider } from "../../components/ListCard";
import Title from "../../components/Title";

const DetailPost = ({ post, domain, relatedPosts }) => {
  const router = useRouter();

  const { handleSetHeading } = useContext(HeadingContext);
  const [related, setRelated] = useState([]);
  const [contentState, setContentState] = useState(() => {
    if (post) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(post.content))
      );
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    handleSetHeading(post?.title);
  }, []);

  useEffect(() => {
    setRelated(relatedPosts);
  }, [relatedPosts]);

  const handleRemoveTag = () => {
    const html = draftToHtml(convertToRaw(contentState.getCurrentContent()));
    return html.replace(/<(.|\n)*?>/g, "").substr(0, 100);
  };

  return (
    <>
      <Head>
        <title>{post?.title} - Xây dựng Việt Tín</title>

        <meta name="description" content={handleRemoveTag()} />

        {/*<!-- Google / Search Engine Tags -->*/}
        <meta itemProp="name" content={post.title} />
        <meta itemProp="description" content={handleRemoveTag()} />
        <meta itemProp="image" content={post.thumbnail} />

        {/*<!-- Facebook Meta Tags -->*/}

        <meta property="og:url" content={`${domain}${router.asPath}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={handleRemoveTag()} />
        <meta property="og:image" content={post.thumbnail} />
        <meta property="og:type" content="website" />
      </Head>
      <section style={{ marginBottom: "2rem" }}>
        <h1 className={styles["heading"]}>{post?.title}</h1>
        <div
          className={styles["content"]}
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(contentState.getCurrentContent())),
          }}
        ></div>
        <div className={styles["share"]}>
          <span className={styles["share-text"]}>Chia sẽ:</span>
          <FacebookShareButton url={`https://${domain}${router.asPath}`}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>
        </div>
      </section>
      <section className={styles["related"]}>
        {related && related.length > 0 && (
          <>
            <Title title="cùng chuyên mục" />
            <ListCardSlider list={related} lg={3} />
          </>
        )}
      </section>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { postSlug } = params;
  try {
    const post = await postApi.getPost(postSlug);
    const relatedPosts = await postApi.getPosts({
      category: post.element?.categories[0]?._id,
      limit: 4,
    });

    return {
      props: {
        post: post.element,
        domain: process.env.DOMAIN,
        relatedPosts: relatedPosts.elements.posts,
      },
    };
  } catch (error) {
    console.error(error.data);
    return {
      notFound: true,
    };
  }
}

DetailPost.layout = "sidebar";

export default DetailPost;
