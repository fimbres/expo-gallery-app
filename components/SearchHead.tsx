import { FC, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { Input } from './Input'

import { fetchSearchPhotos, clearSearch } from '../state/slices/search-slice'

import { useBreakpoint } from '../hooks/use-breakpoint'
import { useAppDispatch } from '../hooks/use-app-dispatch'

import avatar from '../assets/avatar.avif'
import { useDebounce } from '../hooks/use-debounce'

export const SearchHead: FC = () => {
  const bp = useBreakpoint();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const { debounced, flush } = useDebounce((q: string) => {
    if (q.trim()) {
      dispatch(clearSearch())
      dispatch(fetchSearchPhotos(q))
    } else {
      dispatch(clearSearch())
    }
  }, 500);

  const onChange = (text: string) => {
    setQuery(text)
    debounced(text)
  }

  return (
    <View style={[styles.desktop]}>
      <Input 
        placeholder='Search photos...'
        returnKeyType='search'
        value={query}
        onChangeText={onChange}
        onSubmitEditing={() => flush()}
      />
      <Image
        source={avatar}
        style={styles.avatar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
