import shuffle from 'lodash/shuffle'

export function Deck (cards = []) {
  this.value = [...shuffle(cards)]
  this.length = cards.length
  this.discard = []
}

Deck.prototype.valueOf = function () {
  return this.value
}

Deck.prototype.pop = function () {
  const item = this.value.pop()
  this.discard = item
  this.length = this.value.length

  return item
}
