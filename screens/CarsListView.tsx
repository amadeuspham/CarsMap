import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import CarsList from '../components/CarsList';
import {carInfo} from '../App';

interface Props {
	carsPlacemarks: Array<carInfo>
}

export default function CarsListView(props: Props) {
	console.log("update view")
	return(
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<CarsList carsPlacemarks={props.carsPlacemarks}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

CarsListView.navigationOptions = {
	title: 'List view',
};
