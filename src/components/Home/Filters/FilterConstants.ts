// Value strings inferred from the API documentation provided
export const FilterConstants = [
  {
    label: 'Jackpot Originals',
    value: 'vendor=JackpotOriginal',
  },
  {
    label: 'New Games',
    value: 'sort=createdAt&order=desc',
  },
  {
    label: 'Slots',
    value: 'category=VIDEOSLOTS', // games not found
  },
  {
    label: 'Featured Games',
    value: 'sort=featuredPriority', // returns featured: false
  },
  {
    label: 'Live Dealer',
    value: 'category=GAMESHOWSLIVEDEALER', // games not found
  },
  {
    label: 'Game Shows',
    value: 'category=GAMESHOWSLIVEDEALER', // games not found
  },
  {
    label: 'Table Games',
    value: 'category=TABLEGAMES', // games not found
  },
];
