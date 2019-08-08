import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CarDetails from './CarDetails';

export default class CarCard extends React.PureComponent {

	state = {
		cardOpened: false,
	};

	componentDidUpdate(){
		const animation = LayoutAnimation.create(
			200,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.scaleY,
		);

		LayoutAnimation.configureNext(animation);
	}

	render() {
		const {carInfo} = this.props;
		const {cardOpened} = this.state;

		return (
			<View style={styles.container}>
				<TouchableOpacity 
					style={styles.card}
					onPress={() => this.setState({cardOpened: !cardOpened})}
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