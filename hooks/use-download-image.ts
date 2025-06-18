import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export function useDownloadImage() {
  const [downloading, setDownloading] = useState(false);

  const download = async (imageUrl: string) => {
    if (Platform.OS === 'web') {
      window.open(imageUrl, '_blank');
      return;
    }

    try {
      setDownloading(true);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission must be granted');
        return;
      }

      const urlWithoutParams = imageUrl.split('?')[0];
      let fileName = urlWithoutParams.split('/').pop() ?? 'download';
      if (!fileName.includes('.')) {
        fileName += '.jpg';
      }

      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Expo Gallery Photos', asset, false);

      Alert.alert('Photo Downloaded', 'The download was successful.');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, download };
}
