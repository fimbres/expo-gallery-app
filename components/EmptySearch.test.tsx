import { render } from '@testing-library/react-native';

import { mockUseAppSelector } from '../mocks/hooks';

import { EmptySearch } from '../components/EmptySearch';
import { Colors } from '../constants/colors';

describe('<EmptySearch />', () => {
  beforeEach(() => {
    mockUseAppSelector.mockReset();
  });

  it('shows the "search" icon and prompt when query is empty', async () => {
    mockUseAppSelector.mockReturnValueOnce('');

    const { findByTestId, findByText } = render(<EmptySearch />);
    const icon = await findByTestId('empty-search-icon');
    const text = await findByText('Search By Keyword');
    const styleArray = icon.props.style;

    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 80 }),
        expect.objectContaining({ color: Colors.black }),
      ])
    );
    expect(text).toBeTruthy();
  });

  it('shows the "search-off" icon and no-results text when query is non-empty', async () => {
    mockUseAppSelector.mockReturnValueOnce('example query');

    const { findByTestId, findByText } = render(<EmptySearch />);
    const icon = await findByTestId('empty-search-icon');
    const text = await findByText('No Photos Found!');
    const styleArray = icon.props.style;

    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 80 }),
        expect.objectContaining({ color: Colors.black }),
      ])
    );
    expect(text).toBeTruthy();
  });
});
