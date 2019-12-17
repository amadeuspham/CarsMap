import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CarDetails from './CarDetails';
import {carInfo} from '../App';

interface Props {
	carInfo: carInfo
}

function CarLabel(props: Props) {
	const [cardOpened, setCardOpened] = useState(false);

	const {carInfo} = props;

	return (
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.card}
				onPress={() => setCardOpened(!cardOpened)}
			>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Ionicons 
						name='md-car' 
						size={30} 
						style={{ marginRight: 10, color: 'indigo' }}
					/>
					<Text style={{fontSize: 16}}>{carInfo.name}</Text>
				</View>
				<Ionicons 
					name={cardOpened ? 'md-arrow-dropup' : 'md-arrow-dropdown'} 
					size={30} 
					style={{ color: 'indigo' }}
				/>
			</TouchableOpacity>
			{cardOpened &&
				<CarDetails carInfo={carInfo}/>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

const CarCard = React.memo(CarLabel);
export default CarCard;