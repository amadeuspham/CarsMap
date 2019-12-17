import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';

import CarCard from './CarCard';
import {carInfo} from '../App';

interface Props {
	carsPlacemarks: Array<carInfo>
}

export default function CarsList(props: Props) {
	const keyExtractor = (item: any) => item.vin;

	const listItemSeparator = () => {
		return (
			<View style={styles.listSeparator}/>
		);
	}
		
	const renderItem = (listItem: any) => {
		const carInfo = listItem.item;

		return (
			<CarCard carInfo={carInfo}/>
		);
	}

	const {carsPlacemarks} = props;

	return (
		<FlatList
			style={styles.containerList}
			data={carsPlacemarks}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			ItemSeparatorComponent={listItemSeparator}
			removeClippedSubviews={true}
		/>
	);
}

const styles = StyleSheet.create({
	containerList: {
		flex: 1,
		margin: 10,
	},
	infoRow: {
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listSeparator: {
		borderBottomColor: 'gainsboro',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
	},
});