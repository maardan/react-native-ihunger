import React from 'react';
import axios from 'axios';
import { StyleSheet, TouchableHighlight, Image, Button, Text, View, ScrollView, BackHandler, AppRegistry, Component } from 'react-native';
import Recommendations from './src/Recommendations';
import Restaurants from './src/Restaurants';
import GoogleMaps from './src/GoogleMaps';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			loading: true, 
			latitude: null,
			longitude: null,
			recommendations: [],
			searchResults: [],
			mapVisible: false,
			map_lat: '',
			map_lon: ''
		};
	}

	componentDidMount() {
		this.handleGeoService();
		
		BackHandler.addEventListener("hardwareBackPress", () => {
			if (this.state.searchResults.length > 1) {
				this.handleGoBack();
			    return true // do not exit app
			} 
			else {
			    return false // exit app
			}
		})
	}

	handleGeoService() {
		navigator.geolocation.getCurrentPosition((position) => {

			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, () => {
				this.getRecommendations();			
			});
		},
		(error) => {
			alert(error.message + '. Please enable it to use this app.');
		}, 
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });		
	}

	getRecommendations() {
        axios.get('https://developers.zomato.com/api/v2.1/cuisines?lat=' + this.state.latitude + '&lon=' + this.state.longitude, {
            headers: {
            	'Accept': 'application/json',
                'user-key': '5277739756fa7e4dec0cb0cacb48cbb4'
            }
        })
        .then((response) => {
			this.setState({ 
				recommendations: response.data.cuisines,
				loading: false 
			});
		})
        .catch(function (error) {
            alert(error); 
        });		
	}

	handleSearch(cuisine_id) {
		this.setState({ loading: true }, () => {

	        axios.get('https://developers.zomato.com/api/v2.1/search', 
	        {
	            headers: 
	            {
	            	'Accept': 'application/json',
	                'user-key': '5277739756fa7e4dec0cb0cacb48cbb4'
	            },
	            params: 
	            {
					lat: this.state.latitude,
					lon: this.state.longitude,
					cuisines: cuisine_id
				}
	        })
	        .then((response) => {
	        	this.setState({ 
	        		searchResults: response.data.restaurants,
	        		loading: false 
	        	});
	        })
	        .catch(function (error) {
	            alert(error); 
	        });				
		});
	}

	handleGoBack() {
		this.setState({ searchResults: [] });
	}

	handleMaps(lat, lon) {
		(lat && lon) ? this.setState({map_lat: lat, map_lon: lon, mapVisible: true}) : this.setState({map_lat: '', map_lon: '', mapVisible: false})
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	currMainView() {
	    if (this.state.searchResults.length > 0) {
	    	return (
				<View style={{ flex: 1 }}>
					<Restaurants restaurantResults={this.state.searchResults} openMap={(lat, lon) => this.handleMaps(lat, lon)} /> 

					<Button
						onPress={() => this.handleGoBack()}
						title="Back"
						color="#841584"
						style={{ flex: 0.2, padding: 3 }}
					/>
				</View>);
	    } 
	    else {
	    	return (<Recommendations currRecommendations={this.state.recommendations} getRestaurants={(cuisine_id) => this.handleSearch(cuisine_id)} />);
	    }
	}

	render() {
		const current_main_view = (this.state.loading ? <Text>LOADING</Text> : this.currMainView());

		return (
			<View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
				<GoogleMaps modalVisible={this.state.mapVisible} Lat={this.state.map_lat} Lon={this.state.map_lon} closeMap={() => this.handleMaps()} />
				{current_main_view}
			</View>);
	}
}

AppRegistry.registerComponent('iHunger', () => iHunger);