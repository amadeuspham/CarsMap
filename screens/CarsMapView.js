import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import store from '../store';

export default class CarsListView extends React.Component {
	static navigationOptions = {
		title: 'Map view',
	};

	state = {
		carsPlacemarks: store.getState().carsPlacemarks,
		region: {
			latitude: 53.57213,
      longitude: 10.043035,
      latitudeDelta: 0.08634,
      longitudeDelta: 0.178945,
		},
		pickingPin: false,
		marginBottom: 1,
	};

	async componentDidMount(){
		this.unsubscribe = store.onChange(() => {
			this.setState({
				carsPlacemarks: store.getState().carsPlacemarks, 
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onPinChosen = (e) => {
		const {carsPlacemarks, pickingPin} = this.state;

		if (!pickingPin) {
			const coordinate = e.nativeEvent.coordinate;
			const chosenPin = carsPlacemarks.find(function(placemark) {
			  return placemark.coordinates[1] == coordinate.latitude && 
			  	placemark.coordinates[0] == coordinate.longitude;
			});

			const appearingPlacemark = [chosenPin];

			this.setState({carsPlacemarks: appearingPlacemark, pickingPin: true});

		} else {
			this.chosenCar.hideCallout();
			this.setState({carsPlacemarks: store.getState().carsPlacemarks, pickingPin: false});
		}
	}

	renderPin = (placemark) => {
		const coord = {
			latitude: placemark.coordinates[1],
			longitude: placemark.coordinates[0]}
		;

		return (
	    <Marker
	    	ref={ref => { this.chosenCar = ref }}
	    	key={placemark.vin}
	      coordinate={coord}
	      title={placemark.name}
	      onPress={this.onPinChosen}
	    >
	    	<Ionicons 
					name='md-car'
					size={30} 
					style={{ color: 'indigo' }}
				/>
	    </Marker>
	  );
	}

	// adjust the map margin to display the user location button
	onMapReady = () => this.setState({marginBottom: 0})

	render(){
		const {region, carsPlacemarks, marginBottom} = this.state;

		return(
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<MapView
					style={{flex: 1, marginBottom: marginBottom}}
    			onMapReady={this.onMapReady} 
    			provider='google' // user location button only works when Google Maps is used
    												// tap the pin again to close car name only works with Google Maps
		      initialRegion={region}
		      showsUserLocation={true}
		      showsMyLocationButton={true}
		    >
		    	{carsPlacemarks.map(this.renderPin)}
		    </MapView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})