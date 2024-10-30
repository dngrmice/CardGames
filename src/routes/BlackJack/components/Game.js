import React, { Component } from 'react'
import Card from 'components/Cards/Card'
import Rules from 'components/Modals/Rules'
import { newDeck, countHand, validCounts, isBusted } from 'utils/cards'

import Filligre from 'components/assets/Filligre'

import './Game.scss'

export default class Game extends Component {
  state = {
    started: false,
    deck: false,
    dealerHand: [],
    playerHand: [],
    turn: 'player',
    showRules: false,
    wins: 0,
    games: 0,
    playerName: 'Guest'
  }

  toggleRules = () => {
    this.setState({ showRules: !this.state.showRules })
  }

  newGame = () => {
    const deck = newDeck()
    const { playerName } = this.state
    const username = (this.username && this.username.value) || playerName
    this.setState({ started: true, deck, playerName: username, games: 0, wins: 0 })
    setTimeout(() => this.deal(), 50)
  }

  deal = () => {
    const { deck, games } = this.state
    let playerHand = [], dealerHand = []
    console.log('New Deck', deck)

    if (deck.length > 21) {
      playerHand.push(deck.pop())
      dealerHand.push(deck.pop())
      playerHand.push(deck.pop())
      dealerHand.push(deck.pop())

      this.setState({ playerHand, dealerHand, started: true, games: games + 1, turn: 'player' })
    } else {
      this.setState({ turn: 'gameover' })
    }
  }

  hold = () => {
    // Dealers turn
    this.setState({ turn: 'dealer' })
    this.dealerHit()
  }

  dealerHit = () => {
    // Check to see if dealer has won or must hold
    const { deck, dealerHand, playerHand, wins } = this.state
    const toBeat = Math.max(...validCounts(playerHand))
    const dealerTotal = Math.max(...validCounts(dealerHand))

    if (dealerTotal >= toBeat) {
      console.warn('Dealer wins', dealerTotal)
      this.setState({ turn: 'lost' })
    } else if (dealerTotal < 17) {
      dealerHand.push(deck.pop())
      const dealerBusted = isBusted(dealerHand)
      console.warn('Dealer hits', dealerBusted)

      if (dealerBusted) {
        this.setState({ dealerHand, turn: 'won', wins: wins + 1 })
      } else {
        this.setState({ dealerHand })
        setTimeout(this.dealerHit, 1500)
      }
    } else {
      console.warn('Dealer loses by default')
      this.setState({ turn: 'won', wins: wins + 1 })
    }
  }

  hit = () => {
    const { deck, playerHand } = this.state
    playerHand.push(deck.pop())
    this.setState({ playerHand, turn: isBusted(playerHand) ? 'lost' : 'player' })
  }

  get dealerPublic () {
    const { turn } = this.state
    return turn !== 'player'
  }

  render () {
    const { playerName, wins, games, started, playerHand, dealerHand, showRules, turn } = this.state
    let dealerIndex = 1
    let playerIndex = 3

    return <div className='app-game container' style={{ margin: '0 auto' }}>

      <div className='header'>
        <Filligre className='filligre' />
        <h2>Black Jack</h2>
        <Filligre className='filligre flip-h' />
      </div>

      <div className='row'>
        <div className='col-md-6 text-left'>
          {started && <h4>Won {wins.toString()} / Games {games.toString()}</h4>}
        </div>
        <div className='col-md-6 text-right'>
          <button className='btn btn-outline-info' onClick={this.toggleRules}>Show Rules</button>
        </div>
      </div>

      {showRules && <Rules open onClose={this.toggleRules} />}

      {!started && <div className='start-game'>

        <hr />

        <h4>Howdy, Partner!</h4>

        <form onSubmit={this.newGame}>
          <div>
            <input
              ref={input => this.username = input}
              className='nameInput'
              placeholder="What's Your Name"
              type='text'
            />
          </div>

          <button
            type='submit'
            className='btn btn-success btn-lg'
            onClick={this.newGame}
          >
            Start Game
          </button>
        </form>

      </div>}

      {started && <div className='blackjack-game'>

        <div className='hand'>
          <h3>Dealer {this.dealerPublic && <span> | Hand {countHand(dealerHand).join(', ')}</span>}</h3>
          <div className='cards'>
            {dealerHand && dealerHand.map((card, i) => <Card
              key={card.valueOf()}
              className='hand-card'
              visible={this.dealerPublic || i > 0}
              card={card}
              delay={(dealerIndex++ % 2) * 500}
            />)}
          </div>

        </div>

        <div className='hand'>
          <h3>{playerName} | Hand {countHand(playerHand).join(', ')}</h3>
          <div className='cards'>
            {playerHand && playerHand.map(card => <Card
              key={card.valueOf()}
              className='hand-card'
              visible
              card={card}
              delay={(playerIndex++ % 2) * 500}
            />)}
            {turn === 'player' && <button type='button' onClick={this.hit} className="card-hit">
              <Card
                key={-1}
                className='hand-card'
                card={0}
              />
              <span className='overlay'>
                <i className="fa-light fa-hand-point-down" />
                <span className='label'>HIT</span>
              </span>
            </button>}
          </div>

          <div className="playerActions">

            {turn === 'dealer' && <h2>Dealer's Turn</h2>}

            {turn === 'player' && <div>
              <button onClick={this.hold} className='btn btn-primary btn-lg'>
                <i className='fa-light fa-hand' /> Stand
              </button>
            </div>}

            {turn === 'lost' && <div>
              <h2 className='text-danger'>You Lost! :(</h2>
              <button className='btn btn-success btn-lg' onClick={this.deal}>
                Deal New Hand
              </button>
            </div>}

            {turn === 'won' && <div>
              <h2 className='text-success'>You Won!</h2>
              <button className='btn btn-success btn-lg' onClick={this.deal}>
                Deal New Hand
              </button>
            </div>}

            {turn === 'gameover' && <div>
              <h2 className='text-alert'>Game Over</h2>
              <p>Final Score: Won {wins.toString()} / Games {games.toString()}</p>
              <button className='btn btn-success btn-lg' onClick={this.newGame}>
                Start New Game
              </button>
            </div>}
          </div>
        </div>

      </div>}

    </div>
  }
}
