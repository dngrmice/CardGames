import React, { Component } from 'react'
import './Cards.scss'

export default class Card extends Component {

  get left () {
    const { value } = this.props
    return -1 * Math.floor((value % 12) * 112.75)
  }

  get top () {
    const { value } = this.props
    return -1 * (Math.floor(value / 13) * 157.75)
  }

  render () {
    const {
      value = 0,
      className,
      ...props
    } = this.props

    return <div className={className} {...props}>
      <div
        className='card'
        title={value}
        style={{ backgroundPosition: `${this.left}px ${this.top}px` }}
      />
    </div>
  }

}
