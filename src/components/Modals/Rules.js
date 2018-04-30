import React from 'react'
import Modal from './Modal'

export default (props) => <Modal {...props}>
  <h3>Rules</h3>
  <hr/>

  <h4>The Pack</h4>
  <p>The standard 52-card pack is used, but in most casinos several decks of cards are shuffled together. </p>

  <h4>Object of the Game</h4>
  <p>Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.</p>

  <h4>Card Values + Scoring</h4>
  <p>It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value.</p>

</Modal>