import { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Link } from 'expo-router';

import { useBreakpoint } from '../hooks/use-breakpoint';

import avatar from '../assets/avatar.avif'
import { Styles } from '../constants/styles';

export const FeedHead: FC = () => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  return (
    <View style={[styles.container, !isMobile && styles.desktop]}>
      <Text style={[Styles.textTitleExtraLarge, { flex: 1 }]}>Feed</Text>
      <View style={[styles.holder, isMobile && styles.mobileHolder]}>
        <Link
          href="/search"
          style={[
            styles.fakeInput,
            isMobile && styles.fakeInputMobile,
          ]}
        >
          <Text style={Styles.textCaptionSmall}>Search photos...</Text>
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
    height: 40
  },
  mobileHolder: { 
    flexDirection: 'row-reverse',
    marginVertical: 10
  },
  fakeInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 12,
    height: 40
  },
  fakeInputMobile: {
    width: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})
