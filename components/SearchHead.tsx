import { FC, useState } from 'react'
import { Image, StyleSheet, View, Text, Platform } from 'react-native'

import { Input } from './Input'

import { clearSearch, setQuery } from '../state/slices/search-slice'

import { useBreakpoint } from '../hooks/use-breakpoint'
import { useAppDispatch } from '../hooks/use-app-dispatch'
import { useAppSelector } from '../hooks/use-app-selector'

import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

import avatar from '../assets/avatar.avif'

export const SearchHead: FC = () => {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.search.searchQuery);
  const [queryText, setQueryText] = useState('');

  const submit = () => {
    dispatch(clearSearch());
    dispatch(setQuery(queryText));
  };

  return (
    <View style={[styles.container, !isMobile && styles.desktop, Platform.OS === "web" && { paddingTop: 20 }]}>
      {Platform.OS === "web" && (
        <Text style={[Styles.textTitleExtraLarge, { marginBottom: 20, textAlign: "center" }]}>Search</Text>
      )}
      <View style={[styles.holder, isMobile && styles.mobileHolder]}>
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
      {!!query.length && (
        <Text style={Styles.textTitleRegular}>Results for: {query}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  desktop: {
    width: '100%',
    alignSelf: 'center',
    gap: 15,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    borderRadius: 12,
    marginTop: 10,
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
