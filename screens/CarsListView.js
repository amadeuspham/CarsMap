import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import CarsList from '../components/CarsList';

export default function CarsListView(props) {
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
