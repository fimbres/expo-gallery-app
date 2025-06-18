import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { Colors } from '../constants/colors';
import { Styles } from '../constants/styles';

import Button from './Button';

interface FeedbackScreenProps {
  title: string
  description: string
  type: 'error' | 'loading' | 'info'
}

export const FeedbackScreen: FC<FeedbackScreenProps> = ({
  title,
  description,
  type,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        {type === "loading" ? (
          <ActivityIndicator size={50} color={Colors.black} />
        ) : (
          <Ionicons
            name={type === "info" ? "alert-circle-outline" : "close-circle-outline"}
            size={63}
            color={type === "info" ? Colors.black : Colors.danger}
          />
        )}
      </View>
      <Text style={Styles.textTitleLarge}>{title}</Text>
      <Text style={[Styles.textCaptionSmall, { marginTop: 5, marginBottom: 25 }]}>{description}</Text>
      <Button title='Go Back' onPress={router.back}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconWrapper: {
    marginBottom: 24,
  },
});
