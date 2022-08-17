import Pagination from "../../components/Pagination";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import postApi from "../../api/postsApi";
import categoryApi from '../../api/categoryApi'
import { ListCardGrid } from "../../components/ListCard";
import styles from '../../styles/Category.module.css'
import Head from "next/head";

const Category = ({posts, pagination, category, domain}) => {

  const router = useRouter();
  const { handleSetHeading } = useContext(HeadingContext);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { page: page, limit: router.query.limit || 6 },
    });
  };

  useEffect(() => {
    handleSetHeading(category.name);
  }, [category]);

  return (
    <>
    <Head>
    <title>{category.name} - Xây dựng Việt Tín</title>
      <meta name="description" content='Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín'/>
      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp="name" content={`${category.name} - Xây dựng Việt Tín`} />
        <meta
          itemProp="description"
          content={
            'Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín'
          }
        />
        <meta
          itemProp="image"
          content={
            "https://xaydungviettin.vn/wp-content/uploads/2021/04/BANG-HIEU-CONG-TY-1536x947.jpg"
          }
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property="og:url" content={`https://${domain}${router.asPath}`} />
        <meta property="og:title" content={`${category.name} - Xây dựng Việt Tín`} />
        <meta
          property="og:description"
          content={
            'Nơi lưu trữ các bài viết về các dự án và công trình xây dựng của Việt Tín'
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
      <div>
        {posts.length > 0 && pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={(newPage) => handlePageChange(newPage)}
          />
        )}
      </div>
    </>
  )
}

export async function getServerSideProps({ query, params, req }) {
  try {
    const category = await categoryApi.getBySlug(params.categorySlug)
    const resPost = await postApi.getPosts({
      page: query.page || 1,
      limit: query.limit || 6,
      category: category.element._id
    });
   
    return {
      props: {
        posts: resPost.elements.posts,
        pagination: resPost.elements.pagination,
        category: category.element,
        domain: req.headers.host
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

Category.layout = 'sidebar'
export default Category