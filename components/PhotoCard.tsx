import { FC } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import { UnsplashPhoto } from '../types/unsplash';
import { Styles } from '../constants/styles';
import { Link, useRouter } from 'expo-router';

interface PhotoCardProps {
    photo: UnsplashPhoto
}

export const PhotoCard: FC<PhotoCardProps> = ({ photo }) => {
  const router = useRouter();

  return (
    <TouchableHighlight style={{ flex: 1 }} onPress={() => router.push(`/details/${photo.id}`)}>
      <>
        <Image
          source={{
            uri: photo.urls.thumb
          }}
          style={styles.thumbnail}
        />
        <View style={styles.container}>
          <View>
            <Text style={Styles.textTitleRegular} numberOfLines={1}>{photo.alt_description}</Text>
            <Text style={Styles.textCaptionSmall} numberOfLines={1}>By {photo.user.name}</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '9e9e9e'
  },
  container: {

  },
});
