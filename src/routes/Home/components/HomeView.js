import React from 'react'
import { Link } from 'react-router'
import { Card as Model } from 'models/card'
import Card from 'components/Cards/Card'
import './HomeView.scss'

const Ace = new Model(0)
const Queen = new Model(23)

export const HomeView = () => <div className='games-container'>
  <h1>Card Games</h1>

  <Link className='game' to='/blackjack'>
    <Card className='card1' card={Ace} delay={200} visible />
    <Card className='card2' card={Queen} delay={600} visible />

    <h4>Play <br/> Black Jack</h4>
  </Link>
</div>

export default HomeView
