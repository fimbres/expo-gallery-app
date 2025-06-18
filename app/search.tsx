import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { SearchHead } from '../components/SearchHead';
import { PhotoCard } from '../components/PhotoCard';

import { clearSearch, fetchSearchPhotos } from '../state/slices/search-slice';

import { useBreakpoint } from '../hooks/use-breakpoint';
import { useAppSelector } from '../hooks/use-app-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';

export default function SearchScreen() {
  const d = useBreakpoint();
  const dispatch = useAppDispatch();
  const { photos, hasMore, loading, searchQuery } = useAppSelector((s) => s.search);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchPhotos(searchQuery));
    }

    return () => {
      dispatch(clearSearch())
    };
  }, [dispatch, searchQuery]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      dispatch(fetchSearchPhotos(searchQuery));
    }
  };
  
  return (
    <FlatList
        key={d === "mobile" ? "mobile" : "desktop"}
        numColumns={d === "mobile" ? 2 : 3}
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
        ListHeaderComponent={() => <SearchHead />}
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
