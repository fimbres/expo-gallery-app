import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { mockPhotos } from '../mocks/photos';
import { mockDownload, mockUseBreakpoint } from '../mocks/hooks';

import { DetailsBody } from '../components/DetailsBody';

describe('<DetailsBody />', () => {
  const photo = mockPhotos[0];

  beforeEach(() => {
    mockDownload.mockClear();
  });

  it('renders avatar, name, bio, description and likes', () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const { getByTestId, getByText } = render(<DetailsBody photo={photo} />);

    const avatar = getByTestId('avatar-image');
    expect(avatar.props.source).toEqual({ uri: photo.user.profile_image.medium });

    expect(getByTestId('user-name').props.children).toBe(photo.user.name);
    expect(getByTestId('user-bio').props.children).toBe(photo.user.bio);

    const expectedDesc = `${photo.user.name}: ${photo.description || photo.alt_description}`;
    expect(getByTestId('photo-description').props.children.join('')).toBe(expectedDesc);

    expect(getByText(String(photo.likes))).toBeTruthy();
  });

  it('calls download with the correct URL when pressing Download', () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const { getByTestId } = render(<DetailsBody photo={photo} />);

    fireEvent.press(getByTestId('download-button'));

    expect(mockDownload).toHaveBeenCalledTimes(1);
    expect(mockDownload).toHaveBeenCalledWith(photo.links.download);
  });
});
