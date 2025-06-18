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
        Alert.alert('Permiso denegado', 'No podemos guardar la imagen sin permiso');
        return;
      }

      const fileName = imageUrl.split('/').pop() ?? 'download.jpg';
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('MyApp Photos', asset, false);

      Alert.alert('¡Descargado!', 'La imagen se guardó en tu galería.');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo descargar la imagen.');
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, download };
}
