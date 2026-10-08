import { emojis } from "../data/emojis";
import { shuffle } from "./shuffle";

export function createCards(dif) {
  const newArr = emojis.slice(0, dif);

  const pairs = [...newArr, ...newArr];
  const shuffled = shuffle(pairs);

  const cards = shuffled.map((emoji, idx) => ({
    id: idx,
    emoji: emoji,
  }));

  return cards;
}
