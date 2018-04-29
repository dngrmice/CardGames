import React, { Component } from 'react'
import { newDeck } from 'utils/cards'
import Card from 'components/Cards/Card'
import Rules from 'components/Modals/Rules'
import { countHand, validCounts, isBusted, dealerHolds } from 'utils/cards'
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
  }

  toggleRules = () => {
    this.setState({ showRules: !this.state.showRules })
  }

  newGame = () => {
    const deck = newDeck()
    const { games } = this.state
    this.setState({ started: true, deck })
    setTimeout(() => this.deal(), 50)
  }

  deal = () => {
    const { deck, games } = this.state
    let playerHand = [], dealerHand = []

    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())
    playerHand.push(deck.pop())
    dealerHand.push(deck.pop())

    this.setState({ playerHand, dealerHand, started: true, games: games + 1, turn: 'player' })
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
    return turn === 'dealer' || turn === 'lost' || turn === 'won'
  }

  render () {

    const { wins, games, started, deck, playerHand, dealerHand, showRules, turn } = this.state
    let dealerIndex = 1
    let playerIndex = 3

    return <div style={{ margin: '0 auto' }} >

      <h2>Black Jack</h2>

      { showRules && <Rules open={true} /> }

      {!started && <div className='start-game'>

        <hr/>
        <h3>Your Name</h3>
        <p><input type='text' /></p>

        <button
          className='btn btn-primary'
          onClick={this.newGame}
        >
          Start Game
        </button>

      </div>}

      { started && <div className='blackjack-game'>

        <h4>Won { wins.toString() } / Games { games.toString() }</h4>

        <div className='hand'>
          <h3>Dealer {this.dealerPublic && <span> | Hand {countHand(dealerHand).join(', ')}</span>}</h3>
          { dealerHand && dealerHand.map((card, i) => <Card
            className='hand-card'
            visible={this.dealerPublic || i > 0}
            value={card}
            delay={(dealerIndex++ % 2) * 500}
          />)}

        </div>

        <div className='hand'>
          <h3>Your Hand</h3>
          { playerHand && playerHand.map(card => <Card
            className='hand-card'
            visible={true}
            value={card}
            delay={(playerIndex++ % 2) * 500}
          />)}

          <h4>Hand: {countHand(playerHand).join(', ')}</h4>

          {turn === 'player' && <div>
            <button onClick={this.hold} className='btn btn-primary'>
              Hold
            </button>
            {' '}
            <button onClick={this.hit} className='btn btn-secondary'>
              Hit
            </button>
          </div>}

          {turn === 'lost' && <div>
            <p>You Lost! :(</p>
            <button className='btn btn-primary' onClick={this.deal}>
              Deal New Hand
            </button>
          </div>}

          {turn === 'won' && <div>
            <p>You Won!</p>
            <button className='btn btn-primary' onClick={this.deal}>
              Deal New Hand
            </button>
          </div>}
        </div>

      </div>}

      <hr/>
      <button className='btn btn-secondary' onClick={this.toggleRules}>Show Rules</button>

    </div>
  }

}
