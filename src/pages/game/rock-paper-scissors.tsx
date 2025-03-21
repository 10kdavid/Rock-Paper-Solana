import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useWallet } from '@/contexts/WalletContext';

const GameContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameSection = styled.section`
  background-color: var(--secondary-bg);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const GameTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GameTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

interface TabProps {
  active?: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  background-color: ${props => props.active ? 'var(--button-primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};

  &:hover {
    color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  }
`;

const GameContentContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const GameControls = styled.div`
  flex: 1;
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
`;

const GameVisuals = styled.div`
  flex: 2;
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const BetGroup = styled.div`
  margin-bottom: 20px;
`;

const BetLabel = styled.label`
  display: block;
  color: var(--text-secondary);
  margin-bottom: 5px;
  font-size: 0.875rem;
`;

const BetInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
`;

const BetAmountInput = styled.input`
  flex: 1;
  padding: 10px;
  background-color: var(--secondary-bg);
  color: var(--text-primary);
  border: none;
  font-size: 1rem;
`;

const BetCurrency = styled.div`
  padding: 10px;
  background-color: var(--primary-bg);
  color: var(--text-primary);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BetButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const BetButton = styled.button`
  padding: 5px 10px;
  background-color: var(--primary-bg);
  color: var(--text-primary);
  border-radius: 4px;
  font-size: 0.75rem;
`;

const PlayButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #00c382;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #00a76f;
  }

  &:disabled {
    background-color: #2a3744;
    cursor: not-allowed;
  }
`;

const ModeToggle = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: var(--primary-bg);
  border-radius: 4px;
  overflow: hidden;
`;

const ModeButton = styled.button<TabProps>`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.active ? 'var(--button-primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  font-weight: 600;

  &:hover {
    color: ${props => !props.active && 'var(--text-primary)'};
  }
`;

const GameVisualizer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const PlayerChoice = styled.div`
  font-size: 4rem;
  background-color: var(--primary-bg);
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const OpponentChoice = styled.div`
  font-size: 4rem;
  background-color: var(--primary-bg);
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Versus = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-secondary);
`;

const ChoiceButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

interface ChoiceButtonProps {
  active?: boolean;
}

const ChoiceButton = styled.button<ChoiceButtonProps>`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${props => props.active ? 'var(--button-primary)' : 'var(--primary-bg)'};
  color: var(--text-primary);
  font-size: 2.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

interface ResultBadgeProps {
  result?: 'win' | 'lose' | 'draw';
}

const ResultBadge = styled.div<ResultBadgeProps>`
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  background-color: ${props => {
    if (props.result === 'win') return 'var(--accent-green)';
    if (props.result === 'lose') return 'var(--accent-red)';
    return 'var(--accent-blue)';
  }};
  position: absolute;
  top: -10px;
  right: -10px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const StatBox = styled.div`
  flex: 1;
  background-color: var(--primary-bg);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
`;

const WaitingMessage = styled.div`
  color: var(--text-secondary);
  font-size: 1.25rem;
  text-align: center;
  margin-top: 20px;
`;

const DescriptionContainer = styled.div`
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: 8px;
  margin-top: 10px;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const DescriptionText = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ModeDescription = styled.div`
  margin-top: 20px;
`;

const ModeTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const ModeInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`;

const ModeCard = styled.div`
  flex: 1;
  background-color: var(--primary-bg);
  padding: 15px;
  border-radius: 6px;
`;

const ModeName = styled.h5`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModeDetail = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const WinListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const WinItem = styled.div`
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WinDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const WinAddress = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const WinAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-green);
`;

const WinSubtext = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const WinMoves = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 1.5rem;
`;

const WinMove = styled.div`
  background-color: var(--primary-bg);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WinTime = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

type Choice = '✊' | '✋' | '✂️' | null;
type GameResult = 'win' | 'lose' | 'draw' | null;

// Interface for Big Win data
interface BigWin {
  id: number;
  walletAddress: string;
  bet: number;
  win: number;
  playerMove: Choice;
  opponentMove: Choice;
  timeAgo: string;
}

export default function RockPaperScissorsGame() {
  const { connected } = useWallet();
  const [betAmount, setBetAmount] = useState<string>("0.10");
  const [isRealTimeMode, setIsRealTimeMode] = useState<boolean>(true);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice>(null);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState<boolean>(false);
  const [gameLink, setGameLink] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  
  // Sample big wins data
  const bigWins: BigWin[] = [
    {
      id: 1,
      walletAddress: "8f3d7a",
      bet: 5.0,
      win: 9.9,
      playerMove: "✊",
      opponentMove: "✂️",
      timeAgo: "2 minutes ago"
    },
    {
      id: 2,
      walletAddress: "3e5f9c",
      bet: 12.5,
      win: 24.75,
      playerMove: "✋",
      opponentMove: "✊", 
      timeAgo: "15 minutes ago"
    },
    {
      id: 3,
      walletAddress: "7a2b4d",
      bet: 8.0,
      win: 15.84,
      playerMove: "✂️",
      opponentMove: "✋",
      timeAgo: "45 minutes ago"
    },
    {
      id: 4,
      walletAddress: "1f9e2c",
      bet: 20.0,
      win: 39.6,
      playerMove: "✊",
      opponentMove: "✂️",
      timeAgo: "2 hours ago"
    },
    {
      id: 5,
      walletAddress: "6d8f4e",
      bet: 15.0,
      win: 29.7,
      playerMove: "✋",
      opponentMove: "✊",
      timeAgo: "3 hours ago"
    }
  ];

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setBetAmount(value);
    }
  };
  
  const setBetQuick = (amount: string) => {
    setBetAmount(amount);
  };

  const generateGameLink = () => {
    // In a real app, this would generate a unique game ID and create a shareable link
    const gameId = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.origin}/game/rock-paper-scissors?id=${gameId}`;
    setGameLink(link);
    return link;
  };

  const copyLinkToClipboard = () => {
    const link = gameLink || generateGameLink();
    navigator.clipboard.writeText(link);
    alert("Game link copied to clipboard! Share it with your opponent.");
  };
  
  const handlePlay = () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }
    
    if (!isRealTimeMode && !playerChoice) {
      alert("Please select rock, paper, or scissors for Prefire mode!");
      return;
    }
    
    setIsPlaying(true);
    
    // Generate a game link if not already generated
    if (!gameLink) {
      generateGameLink();
    }
    
    // In a real app, this would trigger a transaction on Solana
    // to deposit funds into the smart contract
    
    if (isRealTimeMode) {
      // Simulate waiting for opponent to join
      setWaitingForOpponent(true);
      setTimeout(() => {
        // In Real-Time mode, both players would now be in the same game
        // and would select their moves after this point
        setWaitingForOpponent(false);
        // The real implementation would wait for both players to make their choices
        // Here we'll just simulate it for demonstration
        setTimeout(() => {
          const opponentMove: Choice = ['✊', '✋', '✂️'][Math.floor(Math.random() * 3)] as Choice;
          if (playerChoice) {
            playGame(playerChoice, opponentMove);
          }
        }, 1000);
      }, 2000);
    } else {
      // Prefire mode - player already selected their move
      // Now waiting for opponent to join and make their move
      setWaitingForOpponent(true);
      setTimeout(() => {
        // Simulate opponent joining and making a choice
        const opponentMove: Choice = ['✊', '✋', '✂️'][Math.floor(Math.random() * 3)] as Choice;
        playGame(playerChoice, opponentMove);
      }, 2000);
    }
  };
  
  const playGame = (choice: Choice, opponentMove: Choice) => {
    if (!choice || !opponentMove) return;
    
    setOpponentChoice(opponentMove);
    setWaitingForOpponent(false);
    
    // Determine game result
    let result: GameResult = 'draw';
    
    if (choice === opponentMove) {
      result = 'draw';
    } else if (
      (choice === '✊' && opponentMove === '✂️') ||
      (choice === '✋' && opponentMove === '✊') ||
      (choice === '✂️' && opponentMove === '✋')
    ) {
      result = 'win';
    } else {
      result = 'lose';
    }
    
    setGameResult(result);
    
    // Reset after a few seconds
    setTimeout(() => {
      setIsPlaying(false);
      if (isRealTimeMode) {
        setPlayerChoice(null);
      }
      setOpponentChoice(null);
      setGameResult(null);
    }, 3000);
  };
  
  // Calculate winnings based on bet amount
  const calculateWinnings = () => {
    const bet = parseFloat(betAmount) || 0;
    return (bet * 1.98).toFixed(2);
  };

  return (
    <>
      <Head>
        <title>Rock Paper Scissors Game | Rock Paper Solana</title>
        <meta name="description" content="Play Rock Paper Scissors with SOL wagering on the Solana blockchain" />
      </Head>
      
      <GameContainer>
        <GameSection>
          <GameHeader>
            <GameTitle>
              ✂️ Rock Paper Scissors
            </GameTitle>
          </GameHeader>
          
          <GameContentContainer>
            <GameControls>
              <ModeToggle>
                <ModeButton 
                  active={isRealTimeMode} 
                  onClick={() => setIsRealTimeMode(true)}
                >
                  Real-Time
                </ModeButton>
                <ModeButton 
                  active={!isRealTimeMode} 
                  onClick={() => setIsRealTimeMode(false)}
                >
                  Prefire
                </ModeButton>
              </ModeToggle>
              
              <BetGroup>
                <BetLabel>Amount</BetLabel>
                <BetInput>
                  <BetAmountInput 
                    type="text" 
                    value={betAmount} 
                    onChange={handleBetChange}
                  />
                  <BetCurrency>
                    💰 SOL
                  </BetCurrency>
                </BetInput>
                <BetButtons>
                  <BetButton onClick={() => setBetQuick("0.10")}>0.1</BetButton>
                  <BetButton onClick={() => setBetQuick("0.50")}>0.5</BetButton>
                  <BetButton onClick={() => setBetQuick("1.00")}>1.0</BetButton>
                  <BetButton onClick={() => setBetQuick("5.00")}>5.0</BetButton>
                </BetButtons>
              </BetGroup>
              
              {!isPlaying && (
                <div>
                  <BetLabel>
                    {isRealTimeMode 
                      ? "Create a game and choose after opponent joins" 
                      : "Choose your move before creating the game"}
                  </BetLabel>
                  {(!isRealTimeMode || gameLink) && (
                    <ChoiceButtonsContainer>
                      <ChoiceButton 
                        active={playerChoice === '✊'} 
                        onClick={() => setPlayerChoice('✊')}
                        disabled={isRealTimeMode && !gameLink}
                      >
                        ✊
                      </ChoiceButton>
                      <ChoiceButton 
                        active={playerChoice === '✋'} 
                        onClick={() => setPlayerChoice('✋')}
                        disabled={isRealTimeMode && !gameLink}
                      >
                        ✋
                      </ChoiceButton>
                      <ChoiceButton 
                        active={playerChoice === '✂️'} 
                        onClick={() => setPlayerChoice('✂️')}
                        disabled={isRealTimeMode && !gameLink}
                      >
                        ✂️
                      </ChoiceButton>
                    </ChoiceButtonsContainer>
                  )}
                </div>
              )}
              
              {gameLink && !isPlaying && (
                <div style={{ marginTop: "15px" }}>
                  <BetLabel>Game link (share with opponent)</BetLabel>
                  <div style={{ 
                    backgroundColor: "var(--primary-bg)", 
                    padding: "8px", 
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    wordBreak: "break-all",
                    marginBottom: "8px"
                  }}>
                    {gameLink}
                  </div>
                  <button 
                    onClick={copyLinkToClipboard}
                    style={{
                      backgroundColor: "var(--accent-blue)",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "0.8rem"
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}
              
              <PlayButton 
                disabled={isPlaying || (!isRealTimeMode && !playerChoice)} 
                onClick={handlePlay}
              >
                {gameLink ? "Play Now" : "Create Game"}
              </PlayButton>
            </GameControls>
            
            <GameVisuals>
              <GameVisualizer>
                <PlayerChoice>
                  {playerChoice ? playerChoice : '?'}
                  {gameResult && (
                    <ResultBadge result={gameResult}>
                      {gameResult === 'win' ? 'WIN' : gameResult === 'lose' ? 'LOSE' : 'DRAW'}
                    </ResultBadge>
                  )}
                </PlayerChoice>
                
                <Versus>VS</Versus>
                
                <OpponentChoice>
                  {opponentChoice ? opponentChoice : '?'}
                </OpponentChoice>
              </GameVisualizer>
              
              {waitingForOpponent && (
                <WaitingMessage>
                  {isRealTimeMode && !playerChoice 
                    ? "Waiting for opponent to join..." 
                    : "Waiting for opponent&apos;s move..."}
                </WaitingMessage>
              )}
              
              <StatsContainer>
                <StatBox>
                  <StatLabel>Potential Winnings</StatLabel>
                  <StatValue>{calculateWinnings()} SOL</StatValue>
                </StatBox>
              </StatsContainer>
            </GameVisuals>
          </GameContentContainer>
        </GameSection>
        
        <GameSection>
          <GameTabs>
            <Tab active={activeTab === "description"} onClick={() => setActiveTab("description")}>Description</Tab>
            <Tab active={activeTab === "big-wins"} onClick={() => setActiveTab("big-wins")}>Big Wins</Tab>
            <Tab active={activeTab === "lucky-wins"} onClick={() => setActiveTab("lucky-wins")}>Lucky Wins</Tab>
            <Tab active={activeTab === "challenges"} onClick={() => setActiveTab("challenges")}>Challenges</Tab>
          </GameTabs>
          
          {activeTab === "description" && (
            <DescriptionContainer>
              <DescriptionTitle>Rock Paper Scissors on Solana</DescriptionTitle>
              <DescriptionText>
                Experience the classic Rock Paper Scissors game reimagined on the Solana blockchain. Our platform 
                offers a secure, transparent, and decentralized gaming experience with instant settlements and
                minimal transaction fees.
              </DescriptionText>
              
              <DescriptionText>
                Players can wager SOL tokens against opponents, with winners receiving a 1.98x payout on successful 
                plays. All game outcomes are secured by blockchain technology, ensuring complete fairness and 
                preventing manipulation.
              </DescriptionText>
              
              <ModeDescription>
                <ModeTitle>Game Modes</ModeTitle>
                <ModeInfo>
                  <ModeCard>
                    <ModeName>
                      🕒 Real-Time Mode
                    </ModeName>
                    <ModeDetail>
                      Create a game session and share the link with your opponent. Once they join, both players 
                      select their moves simultaneously. This mode offers a traditional real-time gaming experience
                      where neither player knows the other&apos;s move until both have committed.
                    </ModeDetail>
                  </ModeCard>
                  
                  <ModeCard>
                    <ModeName>
                      🔥 Prefire Mode
                    </ModeName>
                    <ModeDetail>
                      Select your move before creating the game, then share the link with your opponent. This mode 
                      allows for asynchronous play, where you can commit to your move and let your opponent respond 
                      at their convenience. Perfect for challenging friends across different time zones.
                    </ModeDetail>
                  </ModeCard>
                </ModeInfo>
              </ModeDescription>
            </DescriptionContainer>
          )}

          {activeTab === "big-wins" && (
            <WinListContainer>
              {bigWins.map(win => (
                <WinItem key={win.id}>
                  <WinDetails>
                    <WinAddress>{win.walletAddress}</WinAddress>
                    <WinAmount>{win.win} SOL</WinAmount>
                    <WinSubtext>Bet: {win.bet} SOL</WinSubtext>
                  </WinDetails>
                  <WinMoves>
                    <WinMove>{win.playerMove}</WinMove>
                    <span>vs</span>
                    <WinMove>{win.opponentMove}</WinMove>
                  </WinMoves>
                  <WinTime>{win.timeAgo}</WinTime>
                </WinItem>
              ))}
            </WinListContainer>
          )}
        </GameSection>
      </GameContainer>
    </>
  );
} 