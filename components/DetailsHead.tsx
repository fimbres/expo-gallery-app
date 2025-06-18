import React, { FC } from 'react'
import { Image, StyleSheet } from 'react-native'

import { UnsplashPhoto } from '../types/unsplash'
import { useBreakpoint } from '../hooks/use-breakpoint'

export const DetailsHead: FC<{ photo: UnsplashPhoto }> = ({ photo }) => {
  const bp = useBreakpoint();

  return (
    <Image 
      source={{ uri: photo.urls.full }}
      style={[styles.image, bp !== "desktop" && styles.imageMobile]}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '60%', 
    aspectRatio: 1,
    borderRadius: 10,
  },
  imageMobile: {
    width: '90%',
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
