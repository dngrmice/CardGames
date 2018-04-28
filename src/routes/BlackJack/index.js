import Page from './components/Game'

export default (store) => ({
  path : 'blackjack',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, Page)
    }, 'notes')
  }
})
