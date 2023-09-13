import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ title, color, onClick }) => {
  return (
    <button style={{ backgroundColor: color }}
      onClick={onClick}
      className='btn'
    >
      {title}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Button