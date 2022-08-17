import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import categoryApi from "../../../../api/categoryApi";
import postApi from "../../../../api/postsApi";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter(); 

  useEffect(() => {
    const fetch = async () => {
      const [resPosts, resCate] = await Promise.all([
        postApi.getPosts({ limit: 6 }),
        categoryApi.getAll(),
      ]);
      setPosts(resPosts.elements.posts);
      const filterCate = resCate.elements.categories.filter(
        (cate) => cate.parent === null
      );
      setCategories(filterCate);
    };
    fetch();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNavigate = () => {
    if(search && search !== '') {
      router.push({
        pathname: `/search/${search.trim()}`,
      });
    }
  };

 

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["search"]}>
        <input
          value={search}
          onChange={(e) => handleSearch(e)}
          type="text"
          className={styles["search-input"]}
          placeholder="Tìm kiếm bài viết"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleNavigate()
            }
          }}
        />
        <button onClick={handleNavigate} className={styles["search-btn"]}>
          <BiSearch />
        </button>
      </div>
      <div className={styles["posts"]}>
        <h3 className={styles["heading"]}>Bài Viết mới</h3>
        <ul className={styles["list"]}>
          {posts.map((item) => (
            <li key={uuidv4()} className={styles["item"]}>
              <Link href={`/blog/${item.slug}`}>
                <a className={styles["link"]}>
                  <MdKeyboardArrowRight />
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["categories"]}>
        <h3 className={styles["heading"]}>danh mục</h3>
        <ul className={styles["list"]}>
          {categories.map((item) => (
            <li key={uuidv4()} className={styles["item"]}>
              <Link href={`/${item.slug}`}>
                <a className={styles["link"]}>
                  <MdKeyboardArrowRight />
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
