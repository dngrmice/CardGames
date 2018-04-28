import React, { Component } from 'react'

export default class Game extends Component {

  render () {
    return <div style={{ margin: '0 auto' }} >

      <h2>Black Jack</h2>
      <button className='btn btn-primary'>
        Hold
      </button>
      {' '}
      <button className='btn btn-secondary'>
        Hit
      </button>

    </div>
  }

}
