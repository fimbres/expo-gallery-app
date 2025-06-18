import React from 'react';
import { render } from '@testing-library/react-native';

import { mockPhotos } from '../mocks/photos';
import { mockUseBreakpoint } from '../mocks/hooks';

import { DetailsHead } from './DetailsHead';

describe('<DetailsHead />', () => {
  const photo = mockPhotos[0];

  it('renders the full photo URL', () => {
    mockUseBreakpoint.mockReturnValue('desktop');
    const { getByTestId } = render(<DetailsHead photo={photo} />);
    const img = getByTestId('details-head-image');
    expect(img.props.source).toEqual({ uri: photo.urls.full });
  });

  it('applies desktop style only when breakpoint is desktop', () => {
    mockUseBreakpoint.mockReturnValue('desktop');
    const { getByTestId } = render(<DetailsHead photo={photo} />);
    const img = getByTestId('details-head-image');
    const styleArray = img.props.style;
    
    expect(styleArray[0]).toMatchObject({ aspectRatio: 1, borderRadius: 10 });
    expect(styleArray[1]).toBe(false);
  });

  it('adds mobile styles when breakpoint is not desktop', () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const { getByTestId } = render(<DetailsHead photo={photo} />);
    const img = getByTestId('details-head-image');
    const [base, mobileStyle] = img.props.style;
    
    expect(base).toMatchObject({ width: '60%', aspectRatio: 1 });
    expect(mobileStyle).toMatchObject({
      width: '90%',
      marginVertical: 20,
      marginLeft: 'auto',
      marginRight: 'auto'
    });
  });
});
