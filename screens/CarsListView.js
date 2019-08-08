import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import store from '../store';
import CarsList from '../components/CarsList';

export default class CarsListView extends React.Component {
	static navigationOptions = {
		title: 'List view',
	};

	state = {
		carsPlacemarks: store.getState().carsPlacemarks,
	};

	async componentDidMount(){
		//const {navigation} = this.props;

		this.unsubscribe = store.onChange(() => {
			this.setState({
				carsPlacemarks: store.getState().carsPlacemarks, 
			});
		});

		var data = require('../assets/locations.json');

		if (!data){
			console.log('cars data not found');
			return;
		} else {
			// Sort cars by name, if 2 names are identical then sort by VIN number
			data.placemarks.sort(
				(a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.vin > b.vin) ? 1 : -1) : -1
			);
			store.setState({carsPlacemarks: data.placemarks});
		}
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render(){
		const {carsPlacemarks} = this.state;

		return(
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<CarsList carsPlacemarks={carsPlacemarks}/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})