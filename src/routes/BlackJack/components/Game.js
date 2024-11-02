import React, { Component, Fragment } from 'react'
import Card from 'components/Cards/Card'

import Rules from 'components/Modals/Rules'
import { newDeck, countHand, validCounts, isBusted } from 'utils/cards'

import Filligre from 'components/assets/Filligre'

import Settings from './Settings'

import './Game.scss'

const TURN_DELAY = 1500

const mapCountsToDisplay = (value) => <span className={`value ${value > 21 ? 'busted' : ''}`}>{value}</span>

export default class Game extends Component {
  state = {
    theme: 'theme-green-drop',
    started: false,
    deck: false,
    dealerHand: [],
    playerHand: [],
    turn: 'player',
    showRules: false,
    wins: 0,
    games: 0,
    totalDecks: 2,
    redCardIndex: 21,
    playerName: 'Guest'
  }

  toggleRules = () => {
    this.setState({ showRules: !this.state.showRules })
  }

  newGame = (name) => {
    const { playerName, totalDecks } = this.state
    const deck = newDeck(totalDecks || 1)

    const username = (name || playerName)
    this.setState({
      started: true,
      deck,
      playerName: username,
      games: 0,
      wins: 0,
      dealerHand: [],
      playerHand: []
    }, () => { this.deal() })
  }

  deal = () => {
    const { deck, games, redCardIndex } = this.state
    let playerHand = []
    let dealerHand = []

    if (deck.length > redCardIndex) {
      playerHand.push(deck.pop())
      dealerHand.push(deck.pop())
      playerHand.push(deck.pop())
      dealerHand.push(deck.pop())

      this.setState({ playerHand, dealerHand, started: true, games: (games + 1), turn: 'player' }, () => {
        if (countHand(playerHand).includes(21)) {
          this.hold()
        }
      })
    } else {
      // console.log('Deck', deck)
      this.setState({ turn: 'gameover' })
    }
  }

  hold = () => {
    // Dealers turn
    this.setState({ turn: 'dealer' })
    this.dealerHit()
  }

  onWinLose = () => {
    const { deck, redCardIndex } = this.state

    if (deck.length < redCardIndex) {
      this.setState({ turn: 'gameover' })
    }
  }

  dealerHit = () => {
    // Check to see if dealer has won or must hold
    const { deck, dealerHand, playerHand, wins } = this.state
    const toBeat = Math.max(...validCounts(playerHand))
    const dealerTotal = Math.max(...validCounts(dealerHand))

    if (dealerTotal >= toBeat) {
      console.warn('Dealer wins', dealerTotal)
      this.setState({ turn: 'lost' }, this.onWinLose)
    } else if (dealerTotal < 17) {
      dealerHand.push(deck.pop())
      const dealerBusted = isBusted(dealerHand)
      console.warn('Dealer hits', dealerBusted)

      if (dealerBusted) {
        this.setState({ dealerHand, turn: 'won', wins: wins + 1 }, this.onWinLose)
      } else {
        this.setState({ dealerHand })
        setTimeout(this.dealerHit, TURN_DELAY)
      }
    } else {
      console.warn('Dealer loses by default')
      this.setState({ turn: 'won', wins: wins + 1 }, this.onWinLose)
    }
  }

  hit = () => {
    const { deck, playerHand } = this.state
    playerHand.push(deck.pop())

    if (countHand(playerHand).includes(21)) {
      this.setState({ playerHand })
      this.hold()
      return
    }

    this.setState({ playerHand, turn: isBusted(playerHand) ? 'lost' : 'player' })
  }

  get dealerPublic () {
    const { turn } = this.state
    return turn !== 'player'
  }

  render () {
    const {
      theme,
      deck,
      playerName,
      wins,
      games,
      started,
      playerHand,
      dealerHand,
      showRules,
      turn,
      totalDecks,
      redCardIndex
    } = this.state
    let dealerIndex = 1
    let playerIndex = 3

    const isLastGame = (deck.length < redCardIndex)

    return <div className='app-game container' style={{ margin: '0 auto' }}>

      <div className='header'>
        <Filligre className='filligre' />
        <h1>Black Jack</h1>
        <Filligre className='filligre flip-h' />
      </div>

      <div className='game-info'>
        {started ? <h2>Won {wins.toString()} / {games.toString()}</h2> : <h2>Settings</h2>}
        <div className='options'>
          <div className='dropdown'>
            {started && <button
              aria-label='Back'
              className='btn btn btn-outline-info btn-rules m1-1'
              data-toggle='tooltip'
              title='Back'
              onClick={() => { this.setState({ started: false }) }}
            >
              <i className='fa-light fa-sliders' />
            </button>}

            {started && <button
              aria-label='Restart'
              className='btn btn btn-outline-info btn-rules m1-1'
              data-toggle='tooltip'
              title='Restart'
              onClick={() => { this.newGame() }}
            >
              <i className='fa-light fa-redo' />
            </button>}

            <button
              aria-label='Show Rules'
              className='btn btn btn-outline-info btn-rules'
              data-toggle='tooltip'
              title='Show Rules'
              onClick={this.toggleRules}
            >
              <i className='fa-light fa-book' />
            </button>

          </div>
        </div>
      </div>

      {showRules && <Rules open onClose={this.toggleRules} />}

      {!started && <Settings
        theme={theme}
        playerName={playerName}
        totalDecks={totalDecks}
        setDecks={(decks) => { this.setState({ totalDecks: decks }) }}
        setTheme={(theme) => { this.setState( { theme }) }}
        onSubmit={this.newGame}
      />}

      {started && <div className={`blackjack-game ${theme}`}>

        {deck && <div
          className={`card-shoe ${isLastGame ? 'last-game' : 'active'} ${totalDecks > 3 ? 'shoe-large' : ''}`}
        >
          <div ref={(el) => { this.shoe = el }} className='shoe-cards'>
            {deck.value.slice(0, redCardIndex).map((card, i) => <Card
              className='hand-card back-half'
              visible={false}
              card={card}
            />)}
            {deck.value.length > redCardIndex && <Fragment>
              <div className='red-card' />
              {deck.value.slice(redCardIndex).map((card, i) => <Card
                className={`hand-card ${i < deck.value.length - 40 ? 'back-half' : ''}`}
                visible={false}
                card={card}
              />)}
            </Fragment>}
          </div>
        </div>}

        <div className='hand'>

          <h3>
            Dealer
            {this.dealerPublic && <span> |
              Hand <span className='hand-values'>{dealerHand && countHand(dealerHand).map(mapCountsToDisplay)}</span>
            </span>}
          </h3>
          <div className='cards'>
            {dealerHand && dealerHand.map((card, i) => <Card
              // key={card.valueOf()}
              className='hand-card'
              visible={this.dealerPublic || i > 0}
              card={card}
              delay={(dealerIndex++ % 2) * 500}
            />)}
          </div>

        </div>

        <div className='hand'>
          <h3>
            {playerName} |
            Hand <span className='hand-values'>{playerHand && countHand(playerHand).map(mapCountsToDisplay)}</span>
          </h3>
          <div className='cards'>
            {playerHand && playerHand.map(card => <Card
              // key={card.valueOf()}
              className='hand-card'
              visible
              card={card}
              delay={(playerIndex++ % 2) * 500}
            />)}
            {turn === 'player' && <button type='button' onClick={this.hit} className='card-hit'>
              <Card
                key={-1}
                className='hand-card'
                card={0}
              />
              <span className='overlay'>
                <i className='fa-light fa-hand-point-down' />
                <span className='label'>HIT</span>
              </span>
            </button>}
          </div>

          <div className='playerActions'>

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
              <button className='btn btn-success btn-lg' onClick={() => { this.newGame() }}>
                Start New Game
              </button>
            </div>}
          </div>

        </div>

      </div>}

    </div>
  }
}
