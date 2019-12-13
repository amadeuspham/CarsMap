import React, { useState, useEffect } from 'react';
import { UIManager, Platform } from 'react-native';

import AppContainer from './routes';

var data = require('./assets/locations.json');

export default function App() {
	const [carsPlacemarks, setCarsPlacemarks] = useState(data.placemarks);
	const [carsPins, setCarsPins] = useState([]);

	useEffect(() => {
		// Sort cars by name, if 2 names are identical then sort by VIN number
		data.placemarks.sort(
			(a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.vin > b.vin) ? 1 : -1) : -1
		);

		carsPinsInfo = data.placemarks.map(filterMapInfo);

		setCarsPlacemarks(data.placemarks);
		setCarsPins(carsPinsInfo);
	}, []); // passing an empty array ensures that this runs once only

	filterMapInfo = (carInfo) => {
		return {
			coordinates: carInfo.coordinates,
			id: carInfo.vin,
			name: carInfo.name
		};
	};

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){ 
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <AppContainer screenProps={{carsPlacemarks: carsPlacemarks, carsPins: carsPins}}/>
  );
}
