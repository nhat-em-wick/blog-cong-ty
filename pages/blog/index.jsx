import { useEffect } from "react";
import { ListCardGrid } from "../../components/ListCard";
import styles from "../../styles/Blog.module.css";
import Pagination from "../../components/Pagination";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import postApi from "../../api/postsApi";
import { useRouter } from "next/router";
import Head from "next/head";

const Blog = ({ posts, pagination, domain }) => {
  const router = useRouter();
  const { handleSetHeading } = useContext(HeadingContext);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { page: page, limit: router.query.limit || 9 },
    });
  };

  useEffect(() => {
    handleSetHeading("Blog");
  }, []);

  return (
    <>
      <Head>
        <title>Blog - Xây dựng Việt Tín</title>
        <meta
          name="description"
          content="Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín"
        />
      <link rel="shortcut icon" href="/public/favicon.ico" />

        {/*<!-- Google / Search Engine Tags -->*/}
        <meta itemProp="name" content={"Blog - Xây dựng Việt Tín"} />
        <meta
          itemProp="description"
          content={
            "Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín"
          }
        />
        <meta
          itemProp="image"
          content={
            "https://xaydungviettin.vn/wp-content/uploads/2021/04/BANG-HIEU-CONG-TY-1536x947.jpg"
          }
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property="og:url" content={`${domain}${router.asPath}`} />
        <meta property="og:title" content={"Blog - Xây dựng Việt Tín"} />
        <meta
          property="og:description"
          content={
            "Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín"
          }
        />
        <meta
          property="og:image"
          content={
            "https://xaydungviettin.vn/wp-content/uploads/2021/04/BANG-HIEU-CONG-TY-1536x947.jpg"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <section>
        <ListCardGrid list={posts} cardType={"v2"} grid={3} />
      </section>
      <div className={styles["pagination"]}>
        {posts.length > 0 && pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={(newPage) => handlePageChange(newPage)}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const res = await postApi.getPosts({
      page: query?.page || 1,
      limit: query?.limit || 9,
    });
    return {
      props: {
        posts: res.elements.posts,
        pagination: res.elements.pagination,
        domain: process.env.DOMAIN,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [],
        pagination: null,
      },
    };
  }
}

Blog.layout = "sidebar";

export default Blog;
