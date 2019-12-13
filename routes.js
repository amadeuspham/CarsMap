import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';

import CarsMapView from './screens/CarsMapView';
import CarsListView from './screens/CarsListView';

const TabNavigator = createBottomTabNavigator(
  {
		CarsListView: {
			screen: screenProps => <CarsListView carsPlacemarks={screenProps.screenProps.carsPlacemarks}/>,
		},
		CarsMapView: {
			screen: screenProps => <CarsMapView carsPlacemarks={screenProps.screenProps.carsPins}/>,
		},
	},
	{
		initialRouteName: 'CarsListView',
		defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'CarsMapView') {
          iconName = 'map';
        } else if (routeName === 'CarsListView') {
          iconName = 'list';
        }

        return <Entypo name={iconName} size={26} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'indigo',
      inactiveTintColor: 'gray',
    },
	},
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;