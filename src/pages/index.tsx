import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

const HomeContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const SortSelect = styled.select`
  background-color: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.875rem;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const GameCard = styled.a`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameImageContainer = styled.div`
  background-color: var(--secondary-bg);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
`;

const GameInfo = styled.div`
  padding: 15px;
`;

const GameName = styled.h3`
  font-weight: 600;
  margin-bottom: 5px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
`;

const GameProvider = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-align: center;
`;

const PlayerCount = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--text-primary);
  font-size: 0.75rem;
  padding: 2px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 3px;
`;

interface Game {
  id: string;
  name: string;
  emoji: string;
  provider: string;
  players: number;
  path: string;
  comingSoon?: boolean;
}

export default function HomePage() {
  const games: Game[] = [
    {
      id: 'rps',
      name: 'Rock Paper Scissors',
      emoji: '✂️',
      provider: 'Rock Paper Solana',
      players: 42,
      path: '/game/rock-paper-scissors'
    },
    {
      id: 'connect4',
      name: 'Connect Four',
      emoji: '🟡',
      provider: 'Rock Paper Solana',
      players: 0,
      path: '/game/connect-four',
      comingSoon: true
    },
    {
      id: 'blackjack',
      name: 'Blackjack',
      emoji: '🃏',
      provider: 'Rock Paper Solana',
      players: 0,
      path: '/game/blackjack',
      comingSoon: true
    }
  ];

  return (
    <>
      <Head>
        <title>Rock Paper Solana - Home</title>
        <meta name="description" content="Play Rock Paper Scissors on the Solana blockchain" />
      </Head>
      
      <HomeContainer>
        <Header>
          <Title>Rock Paper Solana Originals</Title>
          <SortContainer>
            <SortLabel>Sort by</SortLabel>
            <SortSelect>
              <option>Popular</option>
              <option>A-Z</option>
              <option>Newest</option>
            </SortSelect>
          </SortContainer>
        </Header>

        <GameGrid>
          {games.map(game => (
            <Link key={game.id} href={game.comingSoon ? '#' : game.path} passHref>
              <GameCard>
                <GameImageContainer>
                  {game.emoji}
                  <PlayerCount>
                    👤 {game.players}
                  </PlayerCount>
                </GameImageContainer>
                <GameInfo>
                  <GameName>{game.name}</GameName>
                  <GameProvider>{game.provider}</GameProvider>
                </GameInfo>
              </GameCard>
            </Link>
          ))}
        </GameGrid>
      </HomeContainer>
    </>
  );
} 