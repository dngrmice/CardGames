import React from 'react'
import Card from 'components/Cards/Card'

import './Settings.scss'

const themes = [
  { name: 'Stellar Saturn', className: 'theme-stellar-saturn' },
  { name: 'Stellar Satellite', className: 'theme-stellar-satellite' },
  { name: 'Green Drop', className: 'theme-green-drop' },
  { name: 'Blue Drop', className: 'theme-blue-drop' },
  { name: 'Conspiracy', className: 'theme-conspiracy' },
]

const Settings = ({ theme, playerName, totalDecks, setDecks, setTheme, onSubmit }) => <div className='hand game-settings start-game'>

  <h3>Howdy, Partner!</h3>

  <form onSubmit={() => onSubmit(this.username.value)}>
    <div className='row'>
      <div className='col-md-6'><h4>Name</h4></div>
      <div className='col-md-6 '>
        <input
          defaultValue={playerName === 'Guest' ? '' : playerName}
          ref={(input) => {
            this.username = input
          }}
          className='nameInput'
          placeholder="What's Your Name"
          type='text'
        />
      </div>
    </div>

    <div className='row theme-options'>
      <div className='col-md-6'><h4>Theme</h4></div>
      <div className='col-md-6'>
        {themes.map(({ name, className }) => <button className={`theme-option ${className}`} type='button' onClick={() => {
          setTheme(className)
        }}>
          <Card
            className={className}
          />
          {className === theme ? <i className='fa-solid fa-circle-check' /> : ''}
          <small>{name}</small>
        </button>)}
      </div>
    </div>

    <div className='row deck-options'>
      <div className='col-md-6'><h4>Decks</h4></div>
      <div className='col-md-6 '>
        <button className='deck-total-btn' type='button' onClick={() => {
          setDecks(Math.max(totalDecks - 1, 1))
        }}>
          <i className='fa-light fa-circle-minus' />
        </button>
        {totalDecks}
        <button className='deck-total-btn' type='button' onClick={() => {
          setDecks(Math.min(totalDecks + 1, 8))
        }}>
          <i className='fa-light fa-circle-plus' />
        </button>
      </div>
    </div>

    <div className='playerActions'>
      <button
        type='submit'
        className='btn btn-success btn-lg'
        onClick={this.newGame}
      >
        Start Game
      </button>
    </div>
  </form>

</div>

export default Settings
