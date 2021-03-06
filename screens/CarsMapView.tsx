import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from '@bam.tech/react-native-component-map-clustering';
import { Ionicons } from '@expo/vector-icons';

import {carPinInfo} from "../App"

const initialRegion = {
	latitude: 53.57213,
  longitude: 10.043035,
  latitudeDelta: 0.08634,
  longitudeDelta: 0.178945,
};

interface Props {
	carsPlacemarks: Array<carPinInfo>
}

var chosenCar: Marker | null;

export default function CarsMapView(props: Props) {
	const [appearingPlacemark, setAppearingPlacemark] = useState();
	const [pickingPin, setPickingPin] = useState(false);
	const [marginBottom, setMarginBottom] = useState(1);

	// adjust the map margin to display the user location button
	const onMapReady = () => setMarginBottom(0);

	const renderPin = (placemark: carPinInfo) => {
		const coord = {
			latitude: placemark.coordinates[1],
			longitude: placemark.coordinates[0]
		};

		return (
	    <Marker
	    	ref={ref => { chosenCar = ref }}
	    	key={placemark.id}
	      coordinate={coord}
	      title={placemark.name}
	      onPress={onPinChosen}
	      tracksViewChanges={false}
	    >
	    	<Ionicons 
					name='md-car'
					size={30} 
					style={{ color: 'indigo' }}
				/>
	    </Marker>
	  );
	}

	const onPinChosen = (e: any) => {
		if (!pickingPin) {
			const coordinate = e.nativeEvent.coordinate;
			const chosenPin = props.carsPlacemarks.find(function(placemark) {
			  return placemark.coordinates[1] == coordinate.latitude && 
			  	placemark.coordinates[0] == coordinate.longitude;
			});

			setAppearingPlacemark(chosenPin);
			setPickingPin(true);
		} else {
			if (chosenCar) chosenCar.hideCallout();
			setPickingPin(false);
		}
	}

	return(
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<MapView
				style={{flex: 1, marginBottom: marginBottom}}
  			onMapReady={onMapReady} 
  			provider='google'
				// user location button only works when Google Maps is used
				// tap the pin again to close car name only works with Google Maps
	      initialRegion={initialRegion}
	      showsUserLocation={true}
	      showsMyLocationButton={true}
	      clustering={true}
	    >
	    	{pickingPin ? renderPin(appearingPlacemark) : props.carsPlacemarks.map(renderPin)}
	    </MapView>
		</SafeAreaView>
	);
}

CarsMapView.navigationOptions = {
	title: 'Map view',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})