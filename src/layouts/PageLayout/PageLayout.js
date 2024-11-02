import React from 'react'
import { Link } from 'react-router'
import './PageLayout.scss'

export const PageLayout = ({ children }) => <div className='cardTable'>
    <div className='container text-center'>
      {children}

      <footer>
        <Link to='/'>CARD GAMES</Link>
        {' • '}
        <a target='_blank' href='http://joek.me'>JOEK.ME</a>
      </footer>
    </div>
</div>

export default PageLayout
