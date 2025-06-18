import { FC, useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

import { Input } from './Input'

import { clearSearch, setQuery } from '../state/slices/search-slice'

import { useAppDispatch } from '../hooks/use-app-dispatch'
import { useAppSelector } from '../hooks/use-app-selector'

import { Styles } from '../constants/styles'

import avatar from '../assets/avatar.avif'

export const SearchHead: FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.search.searchQuery);
  const [queryText, setQueryText] = useState('');

  const submit = () => {
    dispatch(clearSearch());
    dispatch(setQuery(queryText));
  };

  return (
    <>
      <View style={styles.container}>
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
      <Text style={Styles.textTitleRegular}>Results for: {query}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    gap: 15,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
