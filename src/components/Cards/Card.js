import React, { Component } from 'react'
import { TOTAL_FACES } from 'utils/cards'
import './Cards.scss'

export default class Card extends Component {

  state = { played: false }

  componentDidMount() {
    const { delay = 500 } = this.props
    setTimeout(() => this.setState({ played: true }), delay)
  }

  get left () {
    const { card } = this.props
    return -1 * Math.floor((card.value % TOTAL_FACES) * 112.75)
  }

  get top () {
    const { card } = this.props
    return -1 * (Math.floor(card.value / TOTAL_FACES) * 157.75)
  }


  render () {
    const { played } = this.state
    const {
      card,
      visible = false,
      className,
      delay,
      ...props
    } = this.props

    return <div className={className} {...props}>
      <div
        className={ played && visible ? 'card' : 'flipped' }
        title={card && visible ? card.toString() : ''}
      >
        <div className='front' style={{ backgroundPosition: visible ? `${this.left}px ${this.top}px` : '' }} />
        <div className='back' />
      </div>
    </div>
  }

}
