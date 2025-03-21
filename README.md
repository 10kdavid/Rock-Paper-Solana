# Rock Paper Solana

A Solana-based Rock Paper Scissors 1v1 peer-to-peer wagering platform with the same aesthetic as Stake.com.

## Features

- Rock Paper Scissors game with real-time peer-to-peer gameplay
- Solana blockchain integration for secure wagering
- Smart contract escrow system to hold both players' funds
- Beautiful UI inspired by Stake.com
- Future plans for Connect Four and Blackjack games

## Technology Stack

- React with TypeScript for the frontend
- Styled Components for styling
- Solana Web3.js for blockchain integration
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Solana wallet (Phantom, Solflare, or Torus)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rock-paper-solana.git
cd rock-paper-solana
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Game Mechanics

- Connect your Solana wallet to start playing
- Choose Rock (✊), Paper (✋), or Scissors (✂️)
- Place your bet in SOL
- Wait for an opponent to match your bet and make their choice
- The winner takes 98% of the total pot (2% platform fee)

## Smart Contract

The Rock Paper Solana platform uses a Solana smart contract to:
- Hold funds from both players in escrow during gameplay
- Ensure fair gameplay with provably random outcomes
- Automatically distribute winnings to the winner

## Future Roadmap

- Connect Four game implementation
- Blackjack game implementation
- Tournament mode
- Leaderboards and achievements
- Mobile-optimized experience

## License

This project is licensed under the MIT License - see the LICENSE file for details. 