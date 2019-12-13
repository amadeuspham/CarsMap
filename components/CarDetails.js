import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CarDetails(props) {
	const {carInfo} = props;

	return(
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Address </Text>
				<Text>{carInfo.address}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Coordinates </Text>
				<Text>{
					carInfo.coordinates[0] + ', ' +
					carInfo.coordinates[1] + ', ' +
					carInfo.coordinates[2]
				}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Engine type </Text>
				<Text>{carInfo.engineType}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Exterior condition </Text>
				<Text>{carInfo.exterior}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Interior condition </Text>
				<Text>{carInfo.interior}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>Fuel count </Text>
				<Text>{carInfo.fuel}</Text>
			</View>
			<View style={styles.card}>
				<Text style={styles.nameTitle}>VIN number </Text>
				<Text>{carInfo.vin}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 5,
	},
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	nameTitle: {
		fontWeight: 'bold',
	},
});