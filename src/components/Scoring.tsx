import React, { useState } from 'react'

type GameMode = '4-player' | '6-player'

interface PlayerRank {
  rank: string
  error?: string
}

const Scoring: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('4-player')
  const teamAName = 'Team A'
  const teamBName = 'Team B'

  // Player ranks for each team
  const [teamAPlayers, setTeamAPlayers] = useState<PlayerRank[]>([{ rank: '' }, { rank: '' }])
  const [teamBPlayers, setTeamBPlayers] = useState<PlayerRank[]>([{ rank: '' }, { rank: '' }])

  const [result, setResult] = useState<{
    winner: string
    advancement: number
  } | null>(null)

  const maxRank = gameMode === '4-player' ? 4 : 6
  const playersPerTeam = gameMode === '4-player' ? 2 : 3

  // Update number of players when switching modes
  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode)
    const count = mode === '4-player' ? 2 : 3
    setTeamAPlayers(
      Array(count)
        .fill(null)
        .map(() => ({ rank: '' }))
    )
    setTeamBPlayers(
      Array(count)
        .fill(null)
        .map(() => ({ rank: '' }))
    )
    setResult(null)
  }

  const updatePlayerRank = (team: 'A' | 'B', index: number, value: string) => {
    // Only allow empty string or valid numbers within range
    if (value !== '' && (isNaN(Number(value)) || Number(value) < 1 || Number(value) > maxRank)) {
      return // Don't update if invalid
    }

    const players = team === 'A' ? [...teamAPlayers] : [...teamBPlayers]
    players[index] = { rank: value }

    if (team === 'A') {
      setTeamAPlayers(players)
    } else {
      setTeamBPlayers(players)
    }

    // Clear result when any input changes
    setResult(null)

    // Validate for duplicates in real-time
    validateDuplicates(team === 'A' ? players : teamAPlayers, team === 'B' ? players : teamBPlayers)
  }

  const validateDuplicates = (teamA: PlayerRank[], teamB: PlayerRank[]) => {
    // Collect all non-empty ranks
    const allRanks: { value: number; team: 'A' | 'B'; index: number }[] = []

    teamA.forEach((player, idx) => {
      if (player.rank && !isNaN(Number(player.rank))) {
        allRanks.push({ value: Number(player.rank), team: 'A', index: idx })
      }
    })

    teamB.forEach((player, idx) => {
      if (player.rank && !isNaN(Number(player.rank))) {
        allRanks.push({ value: Number(player.rank), team: 'B', index: idx })
      }
    })

    // Find duplicates
    const rankCounts = new Map<number, number>()
    allRanks.forEach(({ value }) => {
      rankCounts.set(value, (rankCounts.get(value) || 0) + 1)
    })

    // Update errors for duplicates - clear all errors first
    const newTeamA: PlayerRank[] = teamA.map((p) => ({ rank: p.rank }))
    const newTeamB: PlayerRank[] = teamB.map((p) => ({ rank: p.rank }))

    allRanks.forEach(({ value, team, index }) => {
      if ((rankCounts.get(value) || 0) > 1) {
        if (team === 'A') {
          newTeamA[index].error = 'Duplicate'
        } else {
          newTeamB[index].error = 'Duplicate'
        }
      }
    })

    setTeamAPlayers(newTeamA)
    setTeamBPlayers(newTeamB)
  }

  const validateAndCalculate = () => {
    let hasError = false
    const newTeamA: PlayerRank[] = teamAPlayers.map((p) => ({ rank: p.rank }))
    const newTeamB: PlayerRank[] = teamBPlayers.map((p) => ({ rank: p.rank }))

    // Validate all inputs are filled
    newTeamA.forEach((player, idx) => {
      if (!player.rank) {
        newTeamA[idx].error = 'Required'
        hasError = true
      }
    })

    newTeamB.forEach((player, idx) => {
      if (!player.rank) {
        newTeamB[idx].error = 'Required'
        hasError = true
      }
    })

    // Check for duplicates one more time
    const allRanks: number[] = []
    newTeamA.forEach((player) => {
      if (player.rank) allRanks.push(Number(player.rank))
    })
    newTeamB.forEach((player) => {
      if (player.rank) allRanks.push(Number(player.rank))
    })

    const uniqueRanks = new Set(allRanks)
    if (allRanks.length !== uniqueRanks.size) {
      newTeamA.forEach((player, idx) => {
        if (player.rank && allRanks.filter((r) => r === Number(player.rank)).length > 1) {
          newTeamA[idx].error = 'Duplicate'
          hasError = true
        }
      })
      newTeamB.forEach((player, idx) => {
        if (player.rank && allRanks.filter((r) => r === Number(player.rank)).length > 1) {
          newTeamB[idx].error = 'Duplicate'
          hasError = true
        }
      })
    }

    setTeamAPlayers(newTeamA)
    setTeamBPlayers(newTeamB)

    if (hasError) return

    // Calculate winner and advancement
    const teamARanks = newTeamA.map((p) => Number(p.rank))
    const teamBRanks = newTeamB.map((p) => Number(p.rank))

    const teamABestRank = Math.min(...teamARanks)
    const teamBBestRank = Math.min(...teamBRanks)

    // Determine winner
    if (teamABestRank < teamBBestRank) {
      // Team A wins
      let advancement = 1 // Single up by default

      if (playersPerTeam === 2) {
        // 4-player game
        if (teamARanks.includes(1) && teamARanks.includes(2)) {
          advancement = 3 // Both finish 1st and 2nd
        } else if (teamARanks.includes(1)) {
          advancement = 2 // One finishes 1st (double up)
        }
      } else {
        // 6-player game
        if (teamARanks.includes(1) && teamARanks.includes(2) && teamARanks.includes(3)) {
          advancement = 3 // All three finish 1st, 2nd, 3rd
        } else if (teamARanks.filter((r) => r <= 2).length >= 2) {
          advancement = 2 // Two finish in top 2
        }
      }

      setResult({ winner: teamAName, advancement })
    } else {
      // Team B wins
      let advancement = 1 // Single up by default

      if (playersPerTeam === 2) {
        // 4-player game
        if (teamBRanks.includes(1) && teamBRanks.includes(2)) {
          advancement = 3 // Both finish 1st and 2nd
        } else if (teamBRanks.includes(1)) {
          advancement = 2 // One finishes 1st (double up)
        }
      } else {
        // 6-player game
        if (teamBRanks.includes(1) && teamBRanks.includes(2) && teamBRanks.includes(3)) {
          advancement = 3 // All three finish 1st, 2nd, 3rd
        } else if (teamBRanks.filter((r) => r <= 2).length >= 2) {
          advancement = 2 // Two finish in top 2
        }
      }

      setResult({ winner: teamBName, advancement })
    }
  }

  const reset = () => {
    setTeamAPlayers(
      Array(playersPerTeam)
        .fill(null)
        .map(() => ({ rank: '' }))
    )
    setTeamBPlayers(
      Array(playersPerTeam)
        .fill(null)
        .map(() => ({ rank: '' }))
    )
    setResult(null)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-bold-red">Round Scoring</h2>

      {/* Game Mode Tabs */}
      <div className="flex gap-2 bg-paper-white border-b-2 border-bold-red/20">
        <button
          onClick={() => handleModeChange('4-player')}
          className={`flex-1 px-6 py-3 font-semibold transition-all ${
            gameMode === '4-player'
              ? 'bg-bold-red text-white'
              : 'bg-transparent text-ink-black hover:bg-bold-red/10'
          }`}
        >
          4 Players
        </button>
        <button
          onClick={() => handleModeChange('6-player')}
          className={`flex-1 px-6 py-3 font-semibold transition-all ${
            gameMode === '6-player'
              ? 'bg-bold-red text-white'
              : 'bg-transparent text-ink-black hover:bg-bold-red/10'
          }`}
        >
          6 Players
        </button>
      </div>

      {/* Player Ranks Input */}
      <div className="grid grid-cols-2 gap-6">
        {/* Team A */}
        <div className="space-y-3 bg-bold-red/5 p-4 rounded-lg">
          <h3 className="text-sm font-bold text-ink-black text-center uppercase tracking-wide">
            {teamAName}
          </h3>
          {teamAPlayers.map((player, idx) => (
            <div key={`a-${idx}`}>
              <label className="block text-xs font-semibold text-ink-black/70 mb-1">
                Player {idx + 1}
              </label>
              <input
                type="number"
                min="1"
                max={maxRank}
                value={player.rank}
                onChange={(e) => updatePlayerRank('A', idx, e.target.value)}
                className={`w-full px-3 py-3 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 bg-white ${
                  player.error
                    ? 'border-bold-red text-bold-red focus:ring-bold-red'
                    : 'border-ink-black/20 text-ink-black focus:ring-bold-red'
                }`}
                placeholder={`1-${maxRank}`}
              />
              {player.error && (
                <p className="text-xs text-bold-red font-semibold mt-1">{player.error}</p>
              )}
            </div>
          ))}
        </div>

        {/* Team B */}
        <div className="space-y-3 bg-bold-red/5 p-4 rounded-lg">
          <h3 className="text-sm font-bold text-ink-black text-center uppercase tracking-wide">
            {teamBName}
          </h3>
          {teamBPlayers.map((player, idx) => (
            <div key={`b-${idx}`}>
              <label className="block text-xs font-semibold text-ink-black/70 mb-1">
                Player {idx + 1}
              </label>
              <input
                type="number"
                min="1"
                max={maxRank}
                value={player.rank}
                onChange={(e) => updatePlayerRank('B', idx, e.target.value)}
                className={`w-full px-3 py-3 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 bg-white ${
                  player.error
                    ? 'border-bold-red text-bold-red focus:ring-bold-red'
                    : 'border-ink-black/20 text-ink-black focus:ring-bold-red'
                }`}
                placeholder={`1-${maxRank}`}
              />
              {player.error && (
                <p className="text-xs text-bold-red font-semibold mt-1">{player.error}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={validateAndCalculate}
        className="w-full py-4 bg-bold-red hover:bg-bold-red/90 text-white rounded-lg font-bold text-lg transition-colors shadow-md"
      >
        Calculate Winner
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-6 rounded-xl border-2 border-light-red shadow-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-bold-red mb-4">{result.winner}</div>
            <div className="text-xl text-ink-black font-semibold">
              Advances{' '}
              <span className="font-bold text-light-red text-2xl">{result.advancement}</span> rank
              {result.advancement > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={reset}
        className="w-full py-3 bg-ink-black/10 hover:bg-ink-black/20 text-ink-black rounded-lg font-semibold transition-colors"
      >
        Reset Round
      </button>

      {/* Instructions */}
      <div className="mt-6 p-5 bg-paper-white border-2 border-bold-red/20 rounded-lg">
        <h4 className="font-bold mb-3 text-sm text-bold-red uppercase tracking-wide">How to Use</h4>
        <ol className="text-sm text-ink-black/80 space-y-2 list-decimal list-inside leading-relaxed">
          <li>Select game mode (4 or 6 players)</li>
          <li>Enter each player's finishing position (1 = first place)</li>
          <li>Click "Calculate Winner" to see results</li>
          <li>Advancement is automatic based on finish positions</li>
        </ol>
      </div>
    </div>
  )
}

export default Scoring
