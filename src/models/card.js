export const SUITS = {
  heart: 0,
  spade: 1,
  diamond: 2,
  club: 3
}

export const FACES = {
  ace: 0,
  jack: 10,
  queen: 11,
  king: 12
}

export function Card (value) {
  this.value = Number(value)
  return this
}

Card.prototype.valueOf = function () {
  return this.value
}

Card.prototype.toString = function () {
  const value = this.value
  const suit = Math.floor(value / 13)
  const face = value % 12
  let string = []

  switch (face) {
    case FACES.ace:
      string.push('Ace')
      break
    case FACES.jack:
      string.push('Jack')
      break
    case FACES.queen:
      string.push('Queen')
      break
    case FACES.king:
      string.push('King')
      break
    default:
      string.push(value + 1)
  }

  switch (suit) {
    case SUITS.heart:
      string.push('Hearts')
      break
    case SUITS.spade:
      string.push('Spades')
      break
    case SUITS.diamond:
      string.push('Diamonds')
      break
    case SUITS.club:
      string.push('Clubs')
      break
  }

  return string.join(' of ')
}
