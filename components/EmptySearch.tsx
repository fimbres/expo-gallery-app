import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { useAppSelector } from '../hooks/use-app-selector'

import { Colors } from '../constants/colors';
import { Styles } from '../constants/styles';

export const EmptySearch: FC = () => {
  const querySearch = useAppSelector(state => state.search.searchQuery);

  return (
    <View style={styles.container}>
      <MaterialIcons 
        name={querySearch.length ? "search-off" : "search"}
        color={Colors.black}
        size={80}
      />
      <Text style={Styles.textTitleRegular}>{querySearch.length ? "No Photos Found!" : "Search By Keyword"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
