/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameGrid from './GameGrid';
import { useInfiniteQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: () => 'uuid',
}));

jest.mock('../GameCard/GameCard', () => (props: any) => (
  <div data-testid="game-card">{props.name}</div>
));
jest.mock('./NoGamesFound', () => () => (
  <div data-testid="no-games-found">No Games Found</div>
));
jest.mock('@/components/Error/Error', () => () => (
  <div data-testid="error">Error</div>
));
jest.mock('@/components/ui/Skeleton/Skeleton', () => () => (
  <div data-testid="skeleton">Loading...</div>
));
jest.mock('@/components/ui/Button/Button', () => (props: any) => (
  <button {...props}>{props.children}</button>
));
jest.mock('@/components/ui/Button/ButtonGroup', () => (props: any) => (
  <div>{props.children}</div>
));
jest.mock('@/components/ui/icons/ArrowLeftIcon', () => () => <span>Left</span>);
jest.mock('@/components/ui/icons/ArrowRightIcon', () => () => (
  <span>Right</span>
));

jest.mock('./GameGrid.module.scss', () => ({
  'game-grid': 'game-grid',
  'game-grid__header': 'game-grid__header',
  heading: 'heading',
  controls: 'controls',
  'game-grid__body': 'game-grid__body',
  'game-list': 'game-list',
  vertical: 'vertical',
  horizontal: 'horizontal',
  nav_button: 'nav_button',
  'game-grid__gradient': 'game-grid__gradient',
}));

describe('GameGrid Component', () => {
  const defaultProps = {
    label: 'Test Games',
    icon: <div data-testid="icon" />,
    filter: 'test-filter',
    viewFullList: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when isLoading is true', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isPending: false,
      isSuccess: false,
    });
    render(<GameGrid {...defaultProps} />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders error state when isError is true', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isError: true,
      isFetchNextPageError: false,
      isLoading: false,
      isPending: false,
    });
    render(<GameGrid {...defaultProps} />);
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('renders game cards when data is available', () => {
    const mockData = {
      pages: [
        {
          data: {
            count: 1,
            items: [
              {
                name: 'Game 1',
                slug: 'game-1',
                thumbnail: 'thumb.jpg',
                favorite: false,
                borderColor: '#000',
                thumbnailBlur: 'blur',
              },
            ],
          },
        },
      ],
    };
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      isPending: false,
      data: mockData,
      isError: false,
      isFetchNextPageError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    render(<GameGrid {...defaultProps} />);
    const gameCards = screen.getAllByTestId('game-card');
    expect(gameCards).toHaveLength(1);
  });

  it('renders "No Games Found" when data is empty', () => {
    const mockData = {
      pages: [
        {
          data: {
            count: 0,
            items: [],
          },
        },
      ],
    };
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      isPending: false,
      data: mockData,
      isError: false,
      isFetchNextPageError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    render(<GameGrid {...defaultProps} />);
    expect(screen.getByTestId('no-games-found')).toBeInTheDocument();
  });

  it('toggles view state when "View All" button is clicked', () => {
    const mockData = {
      pages: [
        {
          data: {
            count: 1,
            items: [
              {
                name: 'Game 1',
                slug: 'game-1',
                thumbnail: 'thumb.jpg',
                favorite: false,
                borderColor: '#000',
                thumbnailBlur: 'blur',
              },
            ],
          },
        },
      ],
    };
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      isPending: false,
      data: mockData,
      isError: false,
      isFetchNextPageError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    render(<GameGrid {...defaultProps} viewFullList={false} />);
    const toggleButton = screen.getByRole('button', { name: /View All/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /Hide/i })).toBeInTheDocument();
  });

  it('calls fetchNextPage when observer is intersecting', async () => {
    const fetchNextPageMock = jest.fn();
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isSuccess: true,
      isLoading: false,
      isPending: false,
      data: {
        pages: [
          {
            data: {
              count: 1,
              items: [
                {
                  name: 'Game 1',
                  slug: 'game-1',
                  thumbnail: 'thumb.jpg',
                  favorite: false,
                  borderColor: '#000',
                  thumbnailBlur: 'blur',
                },
              ],
            },
          },
        ],
      },
      isError: false,
      isFetchNextPageError: false,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const observe = jest.fn();
    const disconnect = jest.fn();

    const intersectionObserverMock = jest.fn((callback) => {
      return {
        observe,
        disconnect,
        _callback: callback,
      };
    });
    window.IntersectionObserver = intersectionObserverMock as any;

    render(<GameGrid {...defaultProps} />);

    const instance = intersectionObserverMock.mock.results[0].value;

    instance._callback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(fetchNextPageMock).toHaveBeenCalled();
    });
  });
});
