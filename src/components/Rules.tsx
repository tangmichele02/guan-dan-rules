import React from 'react'

type Tab = 'rules' | 'plays' | 'scoring'

interface RulesProps {
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>
}

const Rules: React.FC<RulesProps> = ({ setActiveTab }) => {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Title */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Guan Dan (掼蛋)</h2>
        <p className="leading-relaxed">
          A Chinese climbing + card-shedding game for 4–6 players played in fixed partnerships (sit
          across from your teammate).
        </p>
      </section>

      {/* Objective */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Objective</h3>

        <h4 className="font-semibold mt-3 mb-2">Each round</h4>
        <ul className="list-disc ml-5 space-y-1 ">
          <li>Get rid of all your cards as fast as possible</li>
        </ul>

        <h4 className="font-semibold mt-3 mb-2">Overall game</h4>
        <ul className="list-disc ml-5 space-y-1 ">
          <li>Advance through ranks</li>
          <li>
            Win an <b>Ace round</b> within 3 tries
          </li>
        </ul>
      </section>

      {/* Setup */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Setup</h3>

        <h4 className="font-semibold text-gray-800 mt-3 mb-2">Decks</h4>
        <ul className="list-disc ml-5 space-y-1 ">
          <li>4 players: 2 decks</li>
          <li>6 players: 3 decks</li>
        </ul>

        <h4 className="font-semibold text-gray-800 mt-3 mb-2">Cards</h4>
        <ul className="list-disc ml-5 space-y-1 ">
          <li>
            <b>27</b> cards per player
          </li>
        </ul>

        <h4 className="font-semibold text-gray-800 mt-3 mb-2">Teams</h4>
        <ul className="list-disc ml-5 space-y-1 ">
          <li>
            <b>2 teams</b>
          </li>
          <li>Sit every other person (partners across)</li>
        </ul>
      </section>

      {/* How to Play */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">How to Play</h3>

        <ul className="list-disc ml-5 space-y-2 ">
          <li>
            First player leads with any <b>valid combination</b>
          </li>

          <li>
            Others must:
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>
                Play the <b>same type</b> of combination AND
              </li>
              <li>
                Beat it with <b>higher value</b>, OR
              </li>
              <li>Pass</li>
            </ul>
          </li>

          <li>
            <b>Bombs</b> can beat any non-bomb combination (see{' '}
            <button
              onClick={() => setActiveTab('plays')}
              className="text-red-500 underline hover:opacity-80"
            >
              Plays
            </button>{' '}
            for bomb types)
          </li>

          <li>
            <b>Highest combination wins the round</b>
          </li>
          <li>
            Round winner <b>leads next round</b>
          </li>
        </ul>
      </section>

      {/* Rank Card */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
          Rank Card / Trump Card
        </h3>

        <ul className="list-disc ml-5 space-y-2 ">
          <li>
            Each round has a <b>rank card</b>:
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Higher than all regular cards</li>
              <li>Lower than jokers</li>
            </ul>
          </li>

          <li>
            Heart of the rank = <b>wild card</b>:
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Can act as any non-joker card</li>
            </ul>
          </li>
        </ul>

        {/* Example */}
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Example (Rank = 2)</h4>

          <ul className="list-disc ml-5 text-sm  space-y-1">
            <li>♥2 + 4-4-4 → 4-4-4-4</li>
            <li>♥2 + 3-3 → 3-3-3</li>
          </ul>

          <p className="text-sm text-gray-600 mt-2 italic">
            A good use is completing a straight flush by replacing the wrong suit.
          </p>
        </div>
      </section>

      {/* Rank Progression */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
          Rank Progression + Game Score
        </h3>

        <h4 className="font-semibold text-gray-800 mt-3 mb-2">General Scoring</h4>

        <ul className="list-disc ml-5 space-y-2 ">
          <li>
            Rank starts at <b>2</b> for both teams
          </li>

          <li>Winning team advances ranks based on finishing positions</li>

          <li>
            <b>Next round rank = previous rank + places advanced</b>
          </li>

          <li>
            4 person game:
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>1st + 2nd = 3 places</li>
              <li>1st + 3rd = 2 places</li>
              <li>1st + 4th = 1 place</li>
            </ul>
          </li>

          <li>
            6 person game (check lowest teammate first):
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>1st + 2nd + 3rd = 4 places</li>
              <li>1st + any + 6th = 1 place</li>
              <li>1st + any + 5th = 2 places</li>
              <li>1st + any + 4th = 3 places</li>
            </ul>
          </li>

          <li>
            Go to{' '}
            <button
              onClick={() => setActiveTab('scoring')}
              className="text-red-500 underline hover:opacity-80"
            >
              Scoring
            </button>{' '}
            for automatic scoring
          </li>
        </ul>

        {/* Example */}
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Example</h4>

          <ul className="list-disc ml-5 text-sm space-y-1">
            <li>Game 1 (Rank 2): Team A 1st & 3rd → advance 2 → rank 4</li>
            <li>Game 2 (Rank 4): Team B 1st & 2nd → advance 3 → rank 7</li>
            <li>Game 3 (Rank 7): Team A 1st & 2nd → advance 3 → rank 10</li>
          </ul>
        </div>

        {/* Ace Round */}
        <h4 className="font-semibold text-gray-800 mt-4 mb-2">Winning the Ace Round</h4>

        <ul className="list-disc ml-5 space-y-2">
          <li>
            Once a team reaches Ace rank, they have <b>3 tries</b>
          </li>
          <li>To win: get 1st and NOT last place</li>
          <li>If they fail 3 times, they return to rank 2</li>
        </ul>
      </section>

      {/* Card Ranking */}
      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Card Ranking</h3>

        <p className=" mb-2">From highest → lowest:</p>

        <ul className="list-disc ml-5 space-y-1 ">
          <li>Big Joker</li>
          <li>Little Joker</li>
          <li>Rank Card</li>
          <li>A</li>
          <li>K</li>
          <li>Q</li>
          <li>J</li>
          <li>10</li>
          <li>9</li>
          <li>8</li>
          <li>7</li>
          <li>6</li>
          <li>5</li>
          <li>4</li>
          <li>3</li>
          <li>2</li>
        </ul>

        {/* Example */}
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Example (Rank = 3)</h4>

          <p className="text-sm">
            Big Joker {'>'} Little Joker {'>'}{' '}
            <b>
              <u>3</u>
            </b>{' '}
            {'>'} A {'>'} K {'>'} Q {'>'} J {'>'} 10 {'>'} 9 {'>'} 8 {'>'} 7 {'>'} 6 {'>'} 5 {'>'} 4{' '}
            {'>'} 2
          </p>
        </div>
      </section>
    </div>
  )
}

export default Rules
