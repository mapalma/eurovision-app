export interface Contest {
    year: number;
    arena: string;
    city: string;
    country: string;
    intendedCountry: string | null;
    slogan: string;
    logoUrl: string;
    presenters: string[];
    broadcasters: string[];
    contestants: Contestant[];
    rounds: Round[];
  }

  export interface ContestDetails {
    year: number;
    arena: string;
    city: string;
    country: string;
    intendedCountry: string | null;
    slogan: string;
    logoUrl: string;
    presenters: string[];
    broadcasters: string[];
  }
  
  export interface Contestant {
    id: number;
    country: string;
    artist: string;
    song: string;
    url: string;
  }

  export interface Round {
    name: string;
    date: Date;
    time: Date;
    performances: PerformanceContestant[] | null
  }

  export interface Performance {
    contestantId: number;
    running: number;
    scores: Score[];
  }

  export interface PerformanceContestant {
    contestantId: number;
    running: number;
    country: string;
    artist: string;
    song: string;
    url: string;
    scores: Score[];
    juryPoints?: number;
    publicPoints?: number;
    totalPoints?: number;
  }

  export interface Score {
    name: string;
    points: number;
    votes?: VoteMap;
  }

  export interface VoteMap {
    [key: string]: number;
  }
  export interface CountryMap {
    [key: string]: string;
}