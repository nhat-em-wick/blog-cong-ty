import Pagination from "../../components/Pagination";
import { useContext } from "react";
import { HeadingContext } from "../../contexts/HeadingProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import postApi from "../../api/postsApi";
import categoryApi from '../../api/categoryApi'
import { ListCardGrid } from "../../components/ListCard";
import styles from '../../styles/Category.module.css'


const Category = ({posts, pagination, category}) => {

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

export async function getServerSideProps({ query, params }) {
  try {
    const category = await categoryApi.getBySlug(params.categorySlug)
    console.log(category.element)
    const resPost = await postApi.getPosts({
      page: query.page || 1,
      limit: query.limit || 6,
      category: category.element._id
    });
   
    return {
      props: {
        posts: resPost.elements.posts,
        pagination: resPost.elements.pagination,
        category: category.element
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