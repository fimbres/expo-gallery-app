import React, { FC } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import { UnsplashPhoto } from '../types/unsplash'

import { useBreakpoint } from '../hooks/use-breakpoint'
import { useDownloadImage } from '../hooks/use-download-image'

import Button from './Button'

import { Styles } from '../constants/styles'
import { Colors } from '../constants/colors'

export const DetailsBody: FC<{ photo: UnsplashPhoto }> = ({ photo }) => {
	const bp = useBreakpoint();
	const { download, downloading } = useDownloadImage();

	return (
		<View style={styles.infoContainer}>
			<View style={styles.header}>
				<Image
					source={{
							uri: photo.user.profile_image.medium
					}}
					style={styles.avatar}
				/>
				<View style={{ flex: 1 }}>
					<Text style={Styles.textTitleRegular}>{photo.user.name}</Text>
					<Text style={[Styles.textCaptionSmall, { flex: 1, flexWrap: "wrap" }]}>{photo.user.bio}</Text>
				</View>
			</View>
			<Text style={[Styles.textCaptionSmall, { flex: 1, flexWrap: "wrap" }]}>{photo.user.name}: {photo.description || photo.alt_description}</Text>
			<View style={[styles.row, { justifyContent: bp === 'desktop' ? 'flex-start' : 'space-evenly', gap: 10 }]}>
				<View style={styles.row}>
					<AntDesign name={`heart${!photo.liked_by_user ? 'o' : ''}`} size={24} color={Colors.black} />
					<Text style={Styles.textTitleSmall}>{photo.likes}</Text>
				</View>
				<View style={styles.row}>
					<FontAwesome5 name="comments" size={24} color={Colors.black} />
					<Text style={Styles.textTitleSmall}>0</Text>
				</View>
				<Button
					variant='ghost'
					title='Download'
					icon={<AntDesign name="download" size={24} color={Colors.black} />}
					disabled={downloading}
					onPress={() => download(photo.links.download)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		gap: 10,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	row: { 
		flexDirection: 'row', 
		alignItems: 'center',
		gap: 5,
	},
	avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
	infoContainer: {
		flex: 1,
		paddingHorizontal: 10,
		gap: 10,
	}
});
