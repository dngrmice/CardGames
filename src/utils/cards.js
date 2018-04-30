import { Card } from 'models/card'
import shuffle from 'lodash/shuffle'

export const DECK_SIZE = 52

export const fill = (size) => {
  let arr = new Array(size)
  for (let i = 0; i < size; i++) {
    arr[i] = new Card(i)
  }
  return arr
}

export const newDeck = () => {
  return shuffle(fill(DECK_SIZE))
}

export const countHand = (hand) => {

  return hand.reduce((counts, card) => {
    // Ace can be 1 or 11
    let value = card.value % 12

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