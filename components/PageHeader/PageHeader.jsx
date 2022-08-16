import {useContext} from 'react'
import styles from './PageHeader.module.css'
import banner from '../../assets/images/page-tittle.jpg'
import { HeadingContext } from '../../contexts/HeadingProvider'

const PageHeader = () => {

  const {heading} = useContext(HeadingContext)

  return (
      <section className={styles['wrapper']} style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: 'cover',
      }}>
        <h2 className={styles['heading']}>{heading}</h2>
      </section>
   
  )
}

export default PageHeader