import React from 'react'

export type Suit = '♠' | '♥' | '♦' | '♣'
export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'
  | 'Small Joker'
  | 'Big Joker'

interface CardProps {
  rank: Rank
  suit?: Suit
  size?: 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({ rank, suit, size = 'md' }) => {
  const isSmallJoker = rank === 'Small Joker'
  const isBigJoker = rank === 'Big Joker'
  const isJoker = isSmallJoker || isBigJoker

  const isRed = rank === 'Big Joker' || suit === '♥' || suit === '♦'

  const sizeClasses = {
    sm: 'w-10 h-14 text-xs',
    md: 'w-12 h-16 text-sm',
    lg: 'w-16 h-22 text-base',
  }

  return (
    <div className={`card ${isRed ? 'card-red' : 'card-black'} ${sizeClasses[size]}`}>
      <div className="flex flex-col items-center text-center">
        <span className={isJoker ? 'text-xs' : ''}>{rank}</span>
        {suit && <span className="text-lg leading-none">{suit}</span>}
      </div>
    </div>
  )
}

export default Card
