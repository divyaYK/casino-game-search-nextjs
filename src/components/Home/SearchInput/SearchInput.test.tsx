import { useFilterStore } from '@/providers/FilterStoreProvider';
import SearchInput from './SearchInput';
import { act, screen, render, fireEvent } from '@testing-library/react';

jest.mock('@/providers/FilterStoreProvider', () => {
  return {
    useFilterStore: jest.fn(),
  };
});

describe('SearchInput Component', () => {
  const setSearchStrMock = jest.fn();
  const setIsSearchQuerySetMock = jest.fn();
  const setIsFilterSetMock = jest.fn();
  const setFilterStrMock = jest.fn();
  const setSearchInputRefMock = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    (useFilterStore as jest.Mock).mockImplementation((selector) =>
      selector({
        setSearchStr: setSearchStrMock,
        setIsSearchQuerySet: setIsSearchQuerySetMock,
        setIsFilterSet: setIsFilterSetMock,
        setFilterStr: setFilterStrMock,
        setSearchInputRef: setSearchInputRefMock,
        searchStr: 'initial',
      })
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders input with initial value from the store', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search a game...');
    expect(input).toHaveValue('initial');
  });

  it('calls debounced functions on input change', () => {
    jest.useFakeTimers();
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search a game...');

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(setSearchStrMock).toHaveBeenCalledWith('hello');
    expect(setIsSearchQuerySetMock).toHaveBeenCalledWith(true);
    expect(setIsFilterSetMock).toHaveBeenCalledWith(false);
    expect(setFilterStrMock).toHaveBeenCalledWith('');
  });

  it('calls setIsSearchQuerySet with false when input is cleared', () => {
    jest.useFakeTimers();
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search a game...');

    fireEvent.change(input, { target: { value: '' } });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(setIsSearchQuerySetMock).toHaveBeenCalledWith(false);
  });

  it('sets search input ref on mount', () => {
    render(<SearchInput />);
    expect(setSearchInputRefMock).toHaveBeenCalled();
    const calledWith = setSearchInputRefMock.mock.calls[0][0];
    expect(calledWith.current).not.toBeNull();
  });
});
