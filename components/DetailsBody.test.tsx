import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { mockPhotos } from '../mocks/photos';
import { mockDownload, mockUseBreakpoint } from '../mocks/hooks';

import { DetailsBody } from '../components/DetailsBody';

describe('<DetailsBody />', () => {
  const photo = mockPhotos[0];

  beforeEach(() => {
    mockDownload.mockClear();
  });

  it('renders avatar, name, bio, description and likes', async () => {
    mockUseBreakpoint.mockReturnValue('mobile')
    const { findByTestId, findByText } = render(<DetailsBody photo={photo} />)

    const avatar = await findByTestId('avatar-image')
    expect(avatar.props.source)
      .toEqual({ uri: photo.user.profile_image.medium });

    const name = await findByTestId('user-name')
    expect(name.props.children).toBe(photo.user.name);

    const bio = await findByTestId('user-bio')
    expect(bio.props.children).toBe(photo.user.bio);

    const descNode = await findByTestId('photo-description');
    const expectedDesc = `${photo.user.name}: ${photo.description || photo.alt_description}`;
    expect(descNode.props.children.join('')).toBe(expectedDesc);

    await findByText(String(photo.likes));
})

  it('calls download with the correct URL when pressing Download', async () => {
    mockUseBreakpoint.mockReturnValue('mobile');
    const { getByTestId } = render(<DetailsBody photo={photo} />);

    fireEvent.press(getByTestId('download-button'));

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledTimes(1)
      expect(mockDownload).toHaveBeenCalledWith(photo.links.download)
    });
  });
});
