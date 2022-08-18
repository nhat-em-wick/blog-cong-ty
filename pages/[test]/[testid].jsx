import React from "react";
import Head from "next/head";
import categoryApi from "../../api/categoryApi";
import postApi from "../../api/postsApi";

const Test = ({ content, category }) => {
  return (
    <>
      <Head>
        <title>{category.name} - Xây dựng Việt Tín</title>
      </Head>
      <h1>
        Page test : {content} {category.name}
      </h1>
    </>
  );
};

export async function getStaticPaths() {
  const res = await categoryApi.getAll();
  const paths = res.elements.categories.map((cate) => ({
    params: {
      testid: `${cate.slug}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { testid } = params;
  try {
    const category = await categoryApi.getBySlug(testid);
    const post = await postApi.getPosts({ limit: 3 });
    console.log(post);
    return {
      props: {
        content: testid,
        category: category.element,
      },
    };
  } catch (error) {
    return {
      props: {
        content: "",
        category: { name: "rong" },
      },
    };
  }
}

export default Test;
