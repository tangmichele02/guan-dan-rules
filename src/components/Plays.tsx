import React from 'react'
import Card, { Suit, Rank } from './Card'

const Plays: React.FC = () => {
  const renderCardGroup = (cards: Array<{ rank: Rank; suit?: Suit }>, label: string) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{label}</h4>
      <div className="flex gap-1 flex-wrap">
        {cards.map((card, idx) => (
          <Card key={idx} rank={card.rank} suit={card.suit} size="sm" />
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Valid Plays</h2>

      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">
          Basic Combinations
        </h3>

        {renderCardGroup([{ rank: 'A', suit: '♠' }], 'Single Card')}

        {renderCardGroup(
          [
            { rank: '7', suit: '♥' },
            { rank: '7', suit: '♦' },
          ],
          'Double'
        )}

        {renderCardGroup(
          [
            { rank: 'Q', suit: '♠' },
            { rank: 'Q', suit: '♥' },
            { rank: 'Q', suit: '♦' },
          ],
          'Triple'
        )}
        {renderCardGroup(
          [
            { rank: 'J', suit: '♠' },
            { rank: 'J', suit: '♥' },
            { rank: 'J', suit: '♦' },
            { rank: '6', suit: '♠' },
            { rank: '6', suit: '♦' },
          ],
          'Full House (size determined solely by the triple value)'
        )}

        {renderCardGroup(
          [
            { rank: '3', suit: '♠' },
            { rank: '4', suit: '♥' },
            { rank: '5', suit: '♦' },
            { rank: '6', suit: '♣' },
            { rank: '7', suit: '♠' },
          ],
          'Straight (5 consecutive cards)'
        )}

        {renderCardGroup(
          [
            { rank: '8', suit: '♠' },
            { rank: '8', suit: '♥' },
            { rank: '9', suit: '♦' },
            { rank: '9', suit: '♣' },
            { rank: '10', suit: '♠' },
            { rank: '10', suit: '♥' },
          ],
          'Double Straight (3 consecutive pairs)'
        )}

        {renderCardGroup(
          [
            { rank: 'J', suit: '♠' },
            { rank: 'J', suit: '♥' },
            { rank: 'J', suit: '♦' },
            { rank: 'Q', suit: '♣' },
            { rank: 'Q', suit: '♠' },
            { rank: 'Q', suit: '♥' },
          ],
          'Triple Straight (2 consecutive triples)'
        )}
        <h3 className="font-semibold text-lg mt-3 mb-2">Notes</h3>
        <ul className="list-disc ml-5 space-y-2 ">
          <li>
            Straights <b>CANNOT</b> have more cards than listed above
          </li>

          <ul>
            <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
              <b>Example</b>: you cannot play 4 consecutive doubles or 3 consecutive triples or play
              a straight of 6
            </div>
          </ul>

          <li>
            Adding a <b>rank card</b> to a <b>straight</b> does <b>NOT</b> make it larger than a
            regular straight
            <ul>
              <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
                <b>Example (Rank = 5)</b>: A straight of 3-4-5-6-7 is still small
              </div>
            </ul>
          </li>
          <li>
            Adding a <b>rank</b> card at the <b>end of a straight</b> is <b>NOT</b> valid
          </li>

          <ul>
            <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
              <b>Example (Rank = 5)</b>: J-Q-K-A-5 is NOT a valid straight, even though 5 is larger
              than A
            </div>
          </ul>
          <li>
            <b>Aces</b> can be used as a <b>"1"</b> valued card
            <ul>
              <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
                <b>Example</b>: A-2-3-4-5 is a valid straight. It is the smallest straight possible
              </div>
            </ul>
          </li>
          <li>
            <b>Jokers</b> <b>CANNOT</b> be part of straights
            <ul>
              <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
                <b>Example (Rank = 5)</b>: 5-5-Small Joker-Small Joker-Big Joker-Big Joker is NOT a
                valid double straight
              </div>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Bombs</h3>
        <p className="mb-4">
          Bombs can beat any non-bomb combination. Higher-ranked bombs beat lower-ranked ones.
        </p>

        {renderCardGroup(
          [
            { rank: '9', suit: '♠' },
            { rank: '9', suit: '♥' },
            { rank: '9', suit: '♦' },
            { rank: '9', suit: '♣' },
          ],
          'Four of a Kind OR MORE'
        )}

        {renderCardGroup(
          [
            { rank: '3', suit: '♠' },
            { rank: '4', suit: '♠' },
            { rank: '5', suit: '♠' },
            { rank: '6', suit: '♠' },
            { rank: '7', suit: '♠' },
          ],
          'Straight Flush (5 cards, same suit)'
        )}

        {renderCardGroup(
          [
            { rank: 'Small Joker' },
            { rank: 'Small Joker' },
            { rank: 'Big Joker' },
            { rank: 'Big Joker' },
          ],
          'Joker Bomb (All Jokers in game, if 6 players, then all 6 jokers)'
        )}

        <div className="mt-4 p-4 text-sm bg-red-50 border-2 border-red-500 rounded-lg">
          <h4 className="font-semibold mb-2">Bomb Ranking (Weakest to Strongest)</h4>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Four of a Kind</li>
            <li>Five of a Kind</li>
            <li>5-card Straight Flush</li>
            <li>Six of a Kind</li>
            <li>Seven of a Kind</li>
            <li>Eight of a Kind</li>
            <li>9+ etc.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default Plays
