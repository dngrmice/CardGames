import React, { Component } from 'react'
import './Cards.scss'

export default class Card extends Component {

  state = { played: false }

  componentDidMount() {
    const { delay = 500 } = this.props
    setTimeout(() => this.setState({ played: true }), delay)
  }

  get left () {
    const { value } = this.props
    return -1 * Math.floor((value % 12) * 112.75)
  }

  get top () {
    const { value } = this.props
    return -1 * (Math.floor(value / 13) * 157.75)
  }


  render () {
    const { played } = this.state
    const {
      value = 0,
      visible = false,
      className,
      delay,
      ...props
    } = this.props

    return <div className={className} {...props}>
      <div
        className={ played && visible ? 'card' : 'flipped' }
        title={visible ? value : ''}
      >
        <div className='front' style={{ backgroundPosition: visible ? `${this.left}px ${this.top}px` : '' }} />
        <div className='back' />
      </div>
    </div>
  }

}
