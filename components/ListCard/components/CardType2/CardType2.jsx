import {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '../../../Button'
import styles from './CardType2.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";


const CardType2 = ({item}) => {

  const [contentState, setContentState] = useState(() => {
    if (item) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(item.content))
      );
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleRemoveTag = () => {
    const html = draftToHtml(convertToRaw(contentState.getCurrentContent()))
    return html.replace(/<(.|\n)*?>/g, '')
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['image']}>
        <Image alt='' layout='fill' src={item.thumbnail} />
      </div>
      <div className={styles["content"]}>
        <h3 className={styles['title']}>
          <Link href={`/blog/${item.slug}`} passHref>
            {item.title}
          </Link>
        </h3>
        <p className={styles['description']}>
          {
            handleRemoveTag()
          }
        </p>
        <Link href={`/blog/${item.slug}`}>
          <a className={styles['link']}>Đọc thêm</a>
        </Link>
      </div>
    </div>
  )
}

CardType2.propTypes = {}

export default CardType2