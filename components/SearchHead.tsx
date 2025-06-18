import { FC, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { Input } from './Input'

import { clearSearch, setQuery } from '../state/slices/search-slice'

import { useAppDispatch } from '../hooks/use-app-dispatch'

import avatar from '../assets/avatar.avif'

export const SearchHead: FC = () => {
  const dispatch = useAppDispatch();
  const [queryText, setQueryText] = useState('');

  const submit = () => {
    dispatch(clearSearch());
    dispatch(setQuery(queryText));
  };

  return (
    <View style={[styles.desktop]}>
      <Input 
        placeholder='Search photos...'
        returnKeyType='search'
        value={queryText}
        onChangeText={setQueryText}
        onSubmitEditing={submit}
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
