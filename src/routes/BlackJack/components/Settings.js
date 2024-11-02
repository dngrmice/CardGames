import React from 'react'

const Settings = ({ playerName, totalDecks, setDecks, onSubmit }) => <div className='hand start-game'>

  <h3>Howdy, Partner!</h3>

  <form onSubmit={() => onSubmit(this.username.value)}>
    <div className='row'>
      <div className='col-sm-12'>
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

    <button
      type='submit'
      className='btn btn-success btn-lg'
      onClick={this.newGame}
    >
      Start Game
    </button>
  </form>

</div>

export default Settings
