import React from 'react'
import { Link } from 'react-router'
import Card from 'components/Cards/Card'
import './HomeView.scss'

export const HomeView = () => <div className='games-container'>
  <h1>Card Games</h1>

  <Link className='game' to='/blackjack'>
    <Card className='card1' value={0} visible />
    <Card className='card2' value={23} visible />

    <h4>Play Black Jack</h4>
  </Link>
</div>

export default HomeView
