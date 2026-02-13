import React from 'react'
import Card, { Suit, Rank } from './Card'

const Plays: React.FC = () => {
  const renderCardGroup = (cards: Array<{ rank: Rank; suit?: Suit }>, label: string) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-600 mb-2">{label}</h4>
      <div className="flex gap-1 flex-wrap">
        {cards.map((card, idx) => (
          <Card key={idx} rank={card.rank} suit={card.suit} size="sm" />
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-bold-red">Valid Plays</h2>

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
          'Pair'
        )}

        {renderCardGroup(
          [
            { rank: 'K', suit: '♠' },
            { rank: 'K', suit: '♥' },
            { rank: 'K', suit: '♦' },
          ],
          'Triple'
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
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Bombs (炸弹)</h3>
        <p className="text-sm text-gray-600 mb-4">
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
          [{ rank: '小王' }, { rank: '小王' }, { rank: '大王' }, { rank: '大王' }],
          'Joker Bomb (All Jokers in game, if 6 players, then all 6 jokers)'
        )}

        <div className="mt-4 p-4 bg-red-100 border-2 border-bold-red rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Bomb Ranking (Weakest to Strongest)</h4>
          <ol className="text-sm  space-y-1 list-decimal list-inside">
            <li>Four of a Kind</li>
            <li>Five of a Kind</li>
            <li>Six of a Kind</li>
            <li>Seven of a Kind</li>
            <li>Eight of a Kind</li>
            <li>5-card Straight Flush</li>
            <li>6-card Straight Flush</li>
            <li>7-card Straight Flush (and longer)</li>
            <li>Joker Bomb (最高)</li>
          </ol>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Special Rules</h3>
        <ul className="space-y-3 ">
          <li className="flex items-start">
            <span className="text-bold-red mr-2">•</span>
            <div>
              <span className="font-medium">Current Rank Wildcards:</span> Can substitute for any
              card in combinations
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-bold-red mr-2">•</span>
            <div>
              <span className="font-medium">Passing:</span> Once you pass, you cannot play again
              until the trick is won
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-bold-red mr-2">•</span>
            <div>
              <span className="font-medium">Following:</span> Must play the same type and number of
              cards (unless bombing)
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-bold-red mr-2">•</span>
            <div>
              <span className="font-medium">Lead After Win:</span> Winner of a trick leads the next
              play
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Plays
