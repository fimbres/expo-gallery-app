import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Head from 'expo-router/head';

import { PhotoCard } from '../../components/PhotoCard';
import { FeedHead } from '../../components/FeedHead';

import { fetchAllPhotos } from '../../state/slices/feed-slice';

import { useBreakpoint } from '../../hooks/use-breakpoint';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

export default function FeedScreen() {
  const bp = useBreakpoint();
  const dispatch = useAppDispatch();
  const { photos, hasMore, loading } = useAppSelector((s) => s.feed);

  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      dispatch(fetchAllPhotos());
    }
  };
  
  return (
    <>
      <Head>
        <title>Expo Gallery | Feed</title>
        <meta name="description" content="Discover photos with React Native Web." />
      </Head>
      <FlatList
          key={bp === "mobile" ? "mobile" : "desktop"}
          numColumns={bp === "mobile" ? 2 : 3}
          style={{ flex: 1 }}
          contentContainerStyle={[styles.container, bp !== "mobile" && styles.desktopContainer]}
          columnWrapperStyle={styles.column}
          data={photos}
          extraData={loading}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
              loading ? (
              <View style={styles.footer}>
                  <ActivityIndicator size="large" />
              </View>
              ) : null
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => <FeedHead />}
          renderItem={({ item }) => <PhotoCard photo={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    gap: 10,
    paddingBottom: 60
  },
  desktopContainer: {
    maxWidth: 900,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  column: {
    paddingHorizontal: 10,
    gap: 10
  },
  footer: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: 16,
  }
});
