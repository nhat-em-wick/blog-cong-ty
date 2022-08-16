import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import { ListCardGrid } from "../../components/ListCard";
import { HeadingContext } from "../../contexts/HeadingProvider";
import postApi from "../../api/postsApi";
import Head from "next/head";

const Search = ({ posts, pagination }) => {
  const { handleSetHeading } = useContext(HeadingContext);
  const router = useRouter();

  useEffect(() => {
    handleSetHeading("Tìm kiếm");
  }, []);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { page: page, limit: router.query.limit || 9 },
    });
  };

  return (
    <>
    <Head>
      <title>Tìm kiếm - Xây dựng Việt Tín</title>
      <meta name="description" content='Xây dựng Việt Tín'/>
    </Head>
      <section>
        <div style={{
          marginBottom: '2rem'
        }}>
          <h3
            style={{
              fontSize: "var(--h3-font-size)",
            }}
          >
            Tìm kiếm với từ khóa: {router.query.keyword}
          </h3>
          {posts.length <= 0 && <p>Không tìm thấy bài viết nào</p>}
        </div>
        <ListCardGrid list={posts} cardType={"v2"} grid={3} />
      </section>
      <div>
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

export async function getServerSideProps({ params, query }) {
  const { keyword } = params;
  try {
    const res = await postApi.getPosts({
      page: query.page || 1,
      limit: query.limit || 9,
      q: keyword,
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

Search.layout = "sidebar";

export default Search;
