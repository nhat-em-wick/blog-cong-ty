import React from 'react'
import PropTypes from 'prop-types'
import styles from './Title.module.css'


const Title = ({title, positionLine}) => {
  return (
    <h2 className={`${styles['heading']} ${styles[positionLine]}`}>{title}</h2>
  )
}
Title.defaultProps = {
  positionLine: 'left'
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string
}

export default Title