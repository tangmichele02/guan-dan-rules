import React from 'react';

const Rules: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-bold-red">掼蛋 (Guàn Dàn)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Guan Dan is a popular Chinese climbing game for four players in fixed partnerships. 
          Partners sit across from each other and work together to finish their hands first.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Objective</h3>
        <p className="text-gray-700 leading-relaxed">
          Teams advance through ranks (2 through A) by finishing rounds first. 
          The first team to complete all ranks wins.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Setup</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Two decks of cards (108 cards total including jokers)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Four players in two teams</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>27 cards dealt to each player</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Teams start at rank 2 and progress upward</span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Current Rank Cards</h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          The current rank cards (e.g., all 5s when playing at rank 5) are special:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Act as wild cards and can be used as any card</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Rank higher than regular cards but lower than jokers</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Can form bombs and powerful combinations</span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Tribute (进贡)</h3>
        <p className="text-gray-700 leading-relaxed mb-2">
          After each round, the losing team pays tribute to the winning team:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Each loser gives their highest card to their opponent</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Winners return any card of their choice</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>If one player finishes first with no cards left (双下), double tribute is paid</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>If players finish first and last simultaneously, no tribute</span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Basic Gameplay</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>First player leads any valid combination</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Others must follow with the same type of combination or pass</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Bombs can be played on any combination</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Highest combination wins the trick</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Winner of trick leads the next</span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">Card Ranking</h3>
        <p className="text-gray-700 leading-relaxed">
          Big Joker {'>'} Little Joker {'>'} Current Rank {'>'} A {'>'} K {'>'} Q {'>'} J {'>'} 10 {'>'} 9 {'>'} 8 {'>'} 7 {'>'} 6 {'>'} 5 {'>'} 4 {'>'} 3 {'>'} 2
        </p>
        <p className="text-sm text-gray-500 mt-2 italic">
          (Note: Current rank cards are promoted above all natural cards but below jokers)
        </p>
      </section>
    </div>
  );
};

export default Rules;