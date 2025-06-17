import { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Link } from 'expo-router';

import { useBreakpoint } from '../hooks/use-breakpoint';

import avatar from '../assets/avatar.avif'

export const FeedHead: FC = () => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <View style={[styles.container, !isMobile && styles.desktop]}>
      <Text style={styles.title}>Feed</Text>
      <View style={[styles.holder, isMobile && { minHeight: 40, flexDirection: 'row-reverse' }]}>
        <Link
          href="/search"
          style={[
            styles.fakeInput,
            isMobile && styles.fakeInputMobile,
          ]}
        >
          <Text style={styles.placeholder}>Search photos...</Text>
        </Link>
        <Image
          source={avatar}
          style={styles.avatar}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  desktop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    gap: 15,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  holder: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  fakeInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 13,
    borderRadius: 12,
  },
  fakeInputMobile: {
    width: '100%',
  },
  title: {
    flex: 1,
    fontFamily: 'Figtree',
    fontWeight: 'bold',
    fontSize: 24,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  placeholder: {
    fontFamily: 'Figtree',
    fontSize: 14,
    color: '#9e9e9e',
  },
})
