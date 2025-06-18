import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';

import { selectPhotoById } from '../../state/selectors/select-photo-by-id';
import { fetchPhotoDetails } from '../../state/slices/details-slice';

import { useBreakpoint } from '../../hooks/use-breakpoint';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { FeedbackScreen } from '../../components/FeedbackScreen';
import { DetailsHead } from '../../components/DetailsHead';
import { DetailsBody } from '../../components/DetailsBody';

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
        <DetailsHead photo={photo} />
        <DetailsBody photo={photo} />
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
});
