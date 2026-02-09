import React, { useState } from 'react';

type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

interface Team {
  name: string;
  currentRank: number; // Index in RANKS array
}

const Scoring: React.FC = () => {
  const [team1, setTeam1] = useState<Team>({ name: 'Team 1', currentRank: 0 });
  const [team2, setTeam2] = useState<Team>({ name: 'Team 2', currentRank: 0 });
  const [roundHistory, setRoundHistory] = useState<Array<{ 
    winner: 1 | 2; 
    advancement: number; 
    description: string;
  }>>([]);

  const getRankName = (rankIndex: number): string => {
    return rankIndex >= RANKS.length ? '完成!' : RANKS[rankIndex];
  };

  const recordRound = (winner: 1 | 2, advancement: number, description: string) => {
    const newHistory = [...roundHistory, { winner, advancement, description }];
    setRoundHistory(newHistory);

    if (winner === 1) {
      setTeam1({ ...team1, currentRank: Math.min(team1.currentRank + advancement, RANKS.length) });
    } else {
      setTeam2({ ...team2, currentRank: Math.min(team2.currentRank + advancement, RANKS.length) });
    }
  };

  const reset = () => {
    setTeam1({ ...team1, currentRank: 0 });
    setTeam2({ ...team2, currentRank: 0 });
    setRoundHistory([]);
  };

  const undo = () => {
    if (roundHistory.length === 0) return;
    
    const lastRound = roundHistory[roundHistory.length - 1];
    const newHistory = roundHistory.slice(0, -1);
    setRoundHistory(newHistory);

    if (lastRound.winner === 1) {
      setTeam1({ ...team1, currentRank: Math.max(team1.currentRank - lastRound.advancement, 0) });
    } else {
      setTeam2({ ...team2, currentRank: Math.max(team2.currentRank - lastRound.advancement, 0) });
    }
  };

  return (
    <div className="p-6 space-y-6 pb-32">
      <h2 className="text-2xl font-bold mb-4 text-bold-red">Score Tracker</h2>

      {/* Team Names */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team 1 Name</label>
          <input
            type="text"
            value={team1.name}
            onChange={(e) => setTeam1({ ...team1, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bold-red"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team 2 Name</label>
          <input
            type="text"
            value={team2.name}
            onChange={(e) => setTeam2({ ...team2, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bold-red"
          />
        </div>
      </div>

      {/* Current Ranks */}
      <div className="bg-gradient-to-br from-bold-red/5 to-gold/5 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Current Ranks</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">{team1.name}</div>
            <div className={`text-4xl font-bold ${team1.currentRank >= RANKS.length ? 'text-gold' : 'text-bold-red'}`}>
              {getRankName(team1.currentRank)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">{team2.name}</div>
            <div className={`text-4xl font-bold ${team2.currentRank >= RANKS.length ? 'text-gold' : 'text-bold-red'}`}>
              {getRankName(team2.currentRank)}
            </div>
          </div>
        </div>
      </div>

      {/* Record Round */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Record Round Result</h3>
        
        <button
          onClick={() => recordRound(1, 1, 'Single Up (单下)')}
          className="w-full py-3 bg-bold-red/10 hover:bg-bold-red/20 text-bold-red rounded-lg font-medium transition-colors"
        >
          {team1.name} Single Up (+1)
        </button>
        
        <button
          onClick={() => recordRound(1, 2, 'Double Up (双下)')}
          className="w-full py-3 bg-bold-red hover:bg-bold-red/90 text-white rounded-lg font-medium transition-colors"
        >
          {team1.name} Double Up (+2)
        </button>
        
        <button
          onClick={() => recordRound(1, 3, 'Triple Up (三下)')}
          className="w-full py-3 bg-gold hover:bg-gold/90 text-white rounded-lg font-medium transition-colors"
        >
          {team1.name} Triple Up (+3)
        </button>

        <div className="my-4 border-t border-gray-300"></div>
        
        <button
          onClick={() => recordRound(2, 1, 'Single Up (单下)')}
          className="w-full py-3 bg-bold-red/10 hover:bg-bold-red/20 text-bold-red rounded-lg font-medium transition-colors"
        >
          {team2.name} Single Up (+1)
        </button>
        
        <button
          onClick={() => recordRound(2, 2, 'Double Up (双下)')}
          className="w-full py-3 bg-bold-red hover:bg-bold-red/90 text-white rounded-lg font-medium transition-colors"
        >
          {team2.name} Double Up (+2)
        </button>
        
        <button
          onClick={() => recordRound(2, 3, 'Triple Up (三下)')}
          className="w-full py-3 bg-gold hover:bg-gold/90 text-white rounded-lg font-medium transition-colors"
        >
          {team2.name} Triple Up (+3)
        </button>
      </div>

      {/* History */}
      {roundHistory.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Round History</h3>
          <div className="space-y-2">
            {roundHistory.map((round, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    Round {idx + 1}:
                  </span>
                  <span className="ml-2 text-gray-700">
                    {round.winner === 1 ? team1.name : team2.name} - {round.description}
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  +{round.advancement}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={undo}
          disabled={roundHistory.length === 0}
          className="py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Undo Last
        </button>
        <button
          onClick={reset}
          className="py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
        >
          Reset Game
        </button>
      </div>

      {/* Scoring Guide */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Scoring Guide</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><span className="font-medium">Single Up (单下):</span> One partner finishes first, other second (+1 rank)</li>
          <li><span className="font-medium">Double Up (双下):</span> One partner finishes with no cards left (+2 ranks)</li>
          <li><span className="font-medium">Triple Up (三下):</span> Both partners finish first and second (+3 ranks)</li>
        </ul>
      </div>
    </div>
  );
};

export default Scoring;