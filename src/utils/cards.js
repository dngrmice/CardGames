import { fill } from './arrays'
import shuffle from 'lodash/shuffle'

export const DECK_SIZE = 52

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

export const typeToValue = (suit, face) => {
  return suit * 12 + face
}

export const newDeck = () => {
  return shuffle(fill(DECK_SIZE))
}

export const countHand = (hand) => {

  return hand.reduce((counts, card) => {
    // Ace can be 1 or 11
    let value = card % 12

    if (value === 0) {
      let temp = []
      counts.forEach(item => {
        temp.push(item + 1)
        temp.push(item + 11)
      })
      return temp
    }

    if (value > 9) {
      value = 10
    } else {
      value++
    }

    for (let i = 0; i < counts.length; i++) {
      counts[i] += value
    }

    return counts

  }, [0])

}

export const validCounts = (hand) => {
  const counts = countHand(hand)
  return counts.filter(count => count < 22)
}

export const isBusted = (hand) => {
  const counts = validCounts(hand)
  return !counts.length
}

export const dealerHolds = (hand) => {
  const counts = validCounts(hand)
  counts.filter(count => count > 16)
  return !!counts.length
}