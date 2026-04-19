export const quotes = [
  { text: "The earth has music for those who listen.", author: "George Santayana" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi" },
  { text: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson" },
  { text: "He that plants trees loves others besides himself.", author: "Thomas Fuller" },
  { text: "The clearest way into the Universe is through a forest wilderness.", author: "John Muir" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
];

export function quoteOfTheDay() {
  const day = Math.floor(Date.now() / 86_400_000);
  return quotes[day % quotes.length];
}
