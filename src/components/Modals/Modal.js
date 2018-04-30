import React, { Component } from 'react'
import './Modals.scss'

export default class Modal extends Component {

  close = () => {
    this.props.onClose && this.props.onClose()
  }

  render () {
    const {
      open = false,
      onClose = () => {},
      className,
      children,
      ...props
    } = this.props

    return <div className={open ? 'visible' : 'hidden'} {...props}>
      <div className='window'>
        <div className='dialog'>
          <a className='cancel' onClick={onClose}>×</a>
          <hr/>
          { children }
        </div>
      </div>
    </div>
  }

}
