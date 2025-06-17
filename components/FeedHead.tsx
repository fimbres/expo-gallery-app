import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router';

import { useBreakpoint } from '../hooks/use-breakpoint';

export const FeedHead: FC = () => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <>
      <View style={[styles.container, !isMobile && styles.desktop]}>
        <Text style={styles.title}>Feed</Text>

        <Link
          href="/search"
          style={[
            styles.fakeInput,
            isMobile && styles.fakeInputMobile,
          ]}
        >
          <Text style={styles.placeholder}>Search photos...</Text>
        </Link>

      </View>
        <View style={styles.subtitleSection}>
          <Text style={[styles.title, styles.subtitle]}>
            All Photos
          </Text>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  desktop: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    width: '100%',
    alignSelf: 'center',
  },
  fakeInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 13,
    borderRadius: 12,
    marginBottom: 20,
  },
  fakeInputMobile: {
    width: '100%',
  },
  title: {
    flex: 1,
    fontFamily: 'Figtree',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
  subtitleSection: {
    width: '100%',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'left',
  },
  placeholder: {
    fontFamily: 'Figtree',
    fontSize: 14,
    color: '#9e9e9e',
  },
})
