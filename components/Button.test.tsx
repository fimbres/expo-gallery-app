import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Button from '../components/Button';
import { Colors } from '../constants/colors';

const DummyIcon = () => <Text testID="dummy-icon">★</Text>;

describe('<Button />', () => {
  it('renders the title text', () => {
    const { getByText } = render(<Button title="Press me" />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('renders an icon when passed', () => {
    const { getByTestId } = render(
      <Button title="Icon" icon={<DummyIcon />} />
    );
    expect(getByTestId('dummy-icon')).toBeTruthy();
  });

  it('calls onPress when pressed and not disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Tap" onPress={onPress} />
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="NoTap" onPress={onPress} disabled />
    );
    fireEvent.press(getByText('NoTap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies primary styles by default', () => {
    const { getByTestId } = render(<Button title="Primary" testID='button' />);
    const btn = getByTestId('button').parent;
    const style = btn?.props.style;
    
    expect(style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: Colors.black }),
      ])
    );
  });

  it('applies ghost variant styles', () => {
    const { getByTestId } = render(
      <Button title="Ghost" variant="ghost" testID='button' />
    );
    const btn = getByTestId('button').parent;
    const style = btn?.props.style;
    expect(style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'transparent' }),
      ])
    ); 
  }); 
});
