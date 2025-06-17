import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { PhotoCard } from '../components/PhotoCard';
import { FeedHead } from '../components/FeedHead';

import { fetchAllPhotos } from '../state/slices/feed-slice';

import { useBreakpoint } from '../hooks/use-breakpoint';
import { useAppSelector } from '../hooks/use-app-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';

export default function FeedScreen() {
  const d = useBreakpoint();
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
    <FlatList
        key={d === "mobile" ? "mobile" : "desktop"}
        numColumns={d === "mobile" ? 2 : 4}
        contentContainerStyle={styles.container}
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
        ListHeaderComponent={() => <FeedHead />}
        renderItem={({ item }) => <PhotoCard photo={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 60
  },
  column: {
    gap: 10
  },
  footer: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: 16,
  }
});
