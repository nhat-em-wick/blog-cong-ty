import { useEffect } from "react";
import { ListCardGrid } from "../../components/ListCard";
import styles from "../../styles/Blog.module.css";
import Pagination from "../../components/Pagination";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import postApi from "../../api/postsApi";
import { useRouter } from "next/router";
import Head from "next/head";

const Blog = ({ posts, pagination }) => {
  
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
    console.log(posts)
  }, []);

  return (
    <>
    <Head>
      <title>Blog - Xây dựng Việt Tín</title>
      <meta name="description" content='Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín'/>
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
      page: query.page || 1,
      limit: query.limit || 9,
    });
    return {
      props: {
        posts: res.elements.posts,
        pagination: res.elements.pagination,
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
