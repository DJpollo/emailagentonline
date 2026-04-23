import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { seedProfiles, seedVotes, type StudentProfile, type VoteRecord } from '../data/mockData';

interface MatchupPair {
  left: StudentProfile;
  right: StudentProfile;
}

interface UTDAppContextValue {
  profiles: StudentProfile[];
  votes: VoteRecord[];
  featuredMatchup: MatchupPair | null;
  leaderboard: StudentProfile[];
  voteForWinner: (winnerId: string, loserId: string) => void;
  addNominee: (profile: Omit<StudentProfile, 'id' | 'elo' | 'wins' | 'losses' | 'streak' | 'lastDelta'>) => void;
  getProfile: (id?: string) => StudentProfile | undefined;
}

const BASE_ELO = 1400;
const K_FACTOR = 28;

const UTDAppContext = createContext<UTDAppContextValue | undefined>(undefined);

function expectedScore(playerRating: number, opponentRating: number) {
  return 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));
}

function buildFeaturedMatchup(profiles: StudentProfile[], voteCount: number): MatchupPair | null {
  if (profiles.length < 2) {
    return null;
  }

  const ordered = [...profiles].sort((a, b) => {
    const winGap = (b.wins - b.losses) - (a.wins - a.losses);
    if (winGap !== 0) {
      return winGap;
    }

    return b.elo - a.elo;
  });

  const anchorIndex = voteCount % ordered.length;
  const anchor = ordered[anchorIndex];
  const opponentPool = ordered.filter((profile) => profile.id !== anchor.id);

  const closestOpponent = opponentPool.sort((a, b) => {
    const deltaA = Math.abs(a.elo - anchor.elo);
    const deltaB = Math.abs(b.elo - anchor.elo);
    return deltaA - deltaB;
  })[0];

  return closestOpponent ? { left: anchor, right: closestOpponent } : null;
}

export function UTDAppProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<StudentProfile[]>(seedProfiles);
  const [votes, setVotes] = useState<VoteRecord[]>(seedVotes);

  const leaderboard = useMemo(
    () => [...profiles].sort((a, b) => b.elo - a.elo || b.wins - a.wins),
    [profiles]
  );

  const featuredMatchup = useMemo(
    () => buildFeaturedMatchup(leaderboard, votes.length),
    [leaderboard, votes.length]
  );

  const voteForWinner = (winnerId: string, loserId: string) => {
    setProfiles((current) => {
      const winner = current.find((profile) => profile.id === winnerId);
      const loser = current.find((profile) => profile.id === loserId);

      if (!winner || !loser) {
        return current;
      }

      const winnerExpectation = expectedScore(winner.elo, loser.elo);
      const loserExpectation = expectedScore(loser.elo, winner.elo);
      const winnerDelta = Math.round(K_FACTOR * (1 - winnerExpectation));
      const loserDelta = Math.round(K_FACTOR * (0 - loserExpectation));

      setVotes((existing) => [
        {
          id: `vote-${existing.length + 1}`,
          winnerId,
          loserId,
          winnerDelta,
          loserDelta,
          createdAt: new Date().toISOString(),
        },
        ...existing,
      ]);

      return current.map((profile) => {
        if (profile.id === winnerId) {
          return {
            ...profile,
            elo: profile.elo + winnerDelta,
            wins: profile.wins + 1,
            streak: profile.streak >= 0 ? profile.streak + 1 : 1,
            lastDelta: winnerDelta,
          };
        }

        if (profile.id === loserId) {
          return {
            ...profile,
            elo: profile.elo + loserDelta,
            losses: profile.losses + 1,
            streak: profile.streak <= 0 ? profile.streak - 1 : -1,
            lastDelta: loserDelta,
          };
        }

        return profile;
      });
    });
  };

  const addNominee = (profile: Omit<StudentProfile, 'id' | 'elo' | 'wins' | 'losses' | 'streak' | 'lastDelta'>) => {
    const slug = profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    setProfiles((current) => [
      {
        ...profile,
        id: `${slug}-${current.length + 1}`,
        elo: BASE_ELO,
        wins: 0,
        losses: 0,
        streak: 0,
        lastDelta: 0,
      },
      ...current,
    ]);
  };

  const getProfile = (id?: string) => profiles.find((profile) => profile.id === id);

  return (
    <UTDAppContext.Provider
      value={{
        profiles,
        votes,
        featuredMatchup,
        leaderboard,
        voteForWinner,
        addNominee,
        getProfile,
      }}
    >
      {children}
    </UTDAppContext.Provider>
  );
}

export function useUTDApp() {
  const context = useContext(UTDAppContext);
  if (!context) {
    throw new Error('useUTDApp must be used within UTDAppProvider');
  }

  return context;
}
