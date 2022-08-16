import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../Button'
import styles from './CardType1.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CardType1 = ({item}) => {

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
      </div>
    </div>
  )
}

CardType1.propTypes = {}

export default CardType1