import { FC } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { UnsplashPhoto } from '../types/unsplash';
import { Styles } from '../constants/styles';

interface PhotoCardProps {
    photo: UnsplashPhoto
}

export const PhotoCard: FC<PhotoCardProps> = ({ photo }) => {
  const router = useRouter();

  return (
    <Pressable style={{ flex: 1 }} onPress={() => router.push(`/details/${photo.id}`)}>
      <Image
        source={{
          uri: photo.urls.thumb
        }}
        style={styles.thumbnail}
      />
      <View>
        <Text style={Styles.textTitleRegular} numberOfLines={1}>{photo.alt_description}</Text>
        <Text style={Styles.textCaptionSmall} numberOfLines={1}>By {photo.user.name}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '9e9e9e'
  },
});
