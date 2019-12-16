import React, { useState, useEffect } from 'react';
import { UIManager, Platform } from 'react-native';

import AppContainer from './routes';

var data = require('./assets/locations.json');

export interface carInfo {
	address: string;
	coordinates: Array<number>;
	engineType: string;
  exterior: string;
  fuel:number;
  interior: string;
  name: string;
  vin: string;
}

export interface carPinInfo {
	coordinates: Array<number>;
	id: string;
	name: string;
}

export default function App() {
	const [carsPlacemarks, setCarsPlacemarks] = useState(data.placemarks);
	const [carsPins, setCarsPins] = useState([]);

	const filterMapInfo = (car_info: carInfo) => {
		return {
			coordinates: car_info.coordinates,
			id: car_info.vin,
			name: car_info.name
		};
	};

	useEffect(() => {
		// Sort cars by name, if 2 names are identical then sort by VIN number
		data.placemarks.sort(
			(a: carInfo, b: carInfo) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.vin > b.vin) ? 1 : -1) : -1
		);

		let carsPinsInfo = data.placemarks.map(filterMapInfo);

		setCarsPlacemarks(data.placemarks);
		setCarsPins(carsPinsInfo);
	}, []); // passing an empty array ensures that this runs once only

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){ 
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <AppContainer screenProps={{carsPlacemarks: carsPlacemarks, carsPins: carsPins}}/>
  );
}
