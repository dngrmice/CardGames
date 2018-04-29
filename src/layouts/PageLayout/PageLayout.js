import React from 'react'
import './PageLayout.scss'

export const PageLayout = ({ children }) => <div className='cardTable'>
    <div className='container text-center'>
      {children}
    </div>
</div>

export default PageLayout
