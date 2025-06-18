import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Head from "expo-router/head";

import { SearchHead } from '../components/SearchHead';
import { PhotoCard } from '../components/PhotoCard';

import { fetchSearchPhotos } from '../state/slices/search-slice';

import { useBreakpoint } from '../hooks/use-breakpoint';
import { useAppSelector } from '../hooks/use-app-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';

export default function SearchScreen() {
  const bp = useBreakpoint();
  const dispatch = useAppDispatch();
  const { photos, hasMore, loading, searchQuery } = useAppSelector((s) => s.search);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchPhotos(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleEndReached = () => {
    if (!loading && hasMore && searchQuery) {
      dispatch(fetchSearchPhotos(searchQuery));
    }
  };
  
  return (
    <>
      <Head>
        <title>Expo Gallery | Search</title>
        <meta name="description" content="Search photos using keywords with React Native Web." />
      </Head>
      <FlatList
        key={bp === "mobile" ? "mobile" : "desktop"}
        numColumns={bp === "mobile" ? 2 : 3}
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
        ListHeaderComponent={() => <SearchHead />}
        renderItem={({ item }) => <PhotoCard photo={item} />}
      />
    </>
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
  desktopContainer: {
    maxWidth: 900,
    marginRight: 'auto',
    marginLeft: 'auto',
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
