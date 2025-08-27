import { Contest, CountryMap, VoteMap } from '../../models/contest';

export const mockCountries: CountryMap = {
  AL: 'Albania',
  AD: 'Andorra',
  AM: 'Armenia',
};

export const mockVote: VoteMap = {
  AL: 0,
  AD: 0,
  AM: 0,
};

export const mockContest: Contest = {
  year: 2025,
  arena: 'test',
  city: 'test',
  country: 'test',
  intendedCountry: 'test',
  slogan: 'test',
  logoUrl: 'test',
  presenters: ['test'],
  broadcasters: ['test'],
  contestants: [
    {
      id: 0,
      country: 'test',
      artist: 'test',
      song: 'test',
      url: 'test',
    },
  ],
  rounds: [
    {
      name: 'test',
      date: new Date('10/10/2000'),
      time: new Date('10/10/2000'),
      performances: [
        {
          contestantId: 0,
          running: 0,
          country:'test',
          artist: 'test',
          song: 'test',
          url: 'test',
          scores: [
            {
              name: 'test',
              points: 0,
              votes: mockVote,
            },
          ],
        },
      ],
    },
  ],
};

export const mockExtendedRound = [
    {
      name: 'test',
      date: new Date('10/10/2000'),
      time: new Date('10/10/2000'),
      performances: [
        {
          contestantId: 0,
          running: 0,
          country: 'ES',
          artist: 'test',
          song: 'test',
          url: 'test',
          scores: [
            {
              name: 'test',
              points: 0,
              votes: mockVote,
            },
          ],
        },
      ],
    },
];

export const mockContestDetails = {
  year: 2025,
  arena: 'test',
  city: 'test',
  country: 'test',
  intendedCountry: 'test',
  slogan: 'test',
  logoUrl: 'test',
  presenters: ['test'],
  broadcasters: ['test'], 
}

export const mockPerformanceContestant = {
    contestantId: 0,
    running: 0,
    country: 'ES',
    artist: 'test',
    song: 'test',
    url: 'test',
    scores: [
      {
        name: 'test',
        points: 0,
        votes:mockVote,
      },
    ],
  }