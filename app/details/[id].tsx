import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { selectPhotoById } from '../../state/selectors/select-photo-by-id';
import { fetchPhotoDetails } from '../../state/slices/details-slice';

import { useBreakpoint } from '../../hooks/use-breakpoint';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useDownloadImage } from '../../hooks/use-download-image';

import { FeedbackScreen } from '../../components/FeedbackScreen';
import Button from '../../components/Button';

import { Styles } from '../../constants/styles';
import { Colors } from '../../constants/colors';

const PhotoDetailsScreen: FC = () => {
  const bp = useBreakpoint();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { photo, loading, error } = useAppSelector(state => {
    const fromFeedOrSearch = selectPhotoById(state, id);
    return {
      photo: fromFeedOrSearch ?? state.details.photo,
      loading: state.details.loading,
      error: state.details.error,
    };
  });
  const {download, downloading} = useDownloadImage();

  useEffect(() => {
    if (!photo) {
      dispatch(fetchPhotoDetails(id));
    }
  }, [dispatch, id, photo]);

  if (loading) return <FeedbackScreen type='loading' title='One Moment Please' description='We are loading the data' />;
  if (error) return <FeedbackScreen type='error' title='Something Went Wrong!' description={error ?? 'Unexpected error.'} />;
  if (!photo) return <FeedbackScreen type='info' title='No Photo Found!' description='No data in the app.' />;

  return (
    <>
      <Head>
        <title>{!!photo ? `Expo Gallery | ${photo.description}` : "Loading..."}</title>
        <meta name="description" content="Search photos using keywords with React Native Web." />
      </Head>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.container, bp === "desktop" && styles.desktopContainer]}>
        <Image source={{ uri: photo.urls.full }} style={[styles.image, bp !== "desktop" && styles.imageMobile]} />
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Image
              source={{
                  uri: photo.user.profile_image.medium
              }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={Styles.textTitleRegular}>{photo.user.name}</Text>
              <Text style={[Styles.textCaptionSmall, { flex: 1, flexWrap: "wrap" }]}>{photo.user.bio}</Text>
            </View>
          </View>
          <Text style={[Styles.textCaptionSmall, { flex: 1, flexWrap: "wrap" }]}>{photo.user.name}: {photo.description || photo.alt_description}</Text>
          <View style={[styles.row, { justifyContent: bp === 'desktop' ? 'flex-start' : 'space-evenly', gap: 10 }]}>
            <View style={styles.row}>
              <AntDesign name={`heart${!photo.liked_by_user ? 'o' : ''}`} size={24} color={Colors.black} />
              <Text style={Styles.textTitleSmall}>{photo.likes}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome5 name="comments" size={24} color={Colors.black} />
              <Text style={Styles.textTitleSmall}>0</Text>
            </View>
            <Button
              variant='ghost'
              title='Download'
              icon={<AntDesign name="download" size={24} color={Colors.black} />}
              disabled={downloading}
              onPress={() => download(photo.links.download)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default PhotoDetailsScreen;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column-reverse',
      paddingTop: 50,
      width: '100%',
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    desktopContainer: {
      flexDirection: 'row',
      gap: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      gap: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    row: { 
      flexDirection: 'row', 
      alignItems: 'center',
      gap: 5,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
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
    },
    infoContainer: {
      flex: 1,
      paddingHorizontal: 10,
      gap: 10,
    }
});
