import React from 'react';
import { StyleSheet, Image, TouchableHighlight, View, Text, ScrollView } from 'react-native';

export default class Restaurants extends React.Component {

	render() {

		var styles = StyleSheet.create({
			container: {
				padding: 30,
				flex: 0.8
			},
			results: {
				flexDirection: 'column',
				borderRadius: 5,
	            borderWidth: 1,
	            borderStyle: 'solid',
				borderColor: '#d6d7da',				
				margin: 10
			},
			img: {
				width: 300, 
				height: 300
			},
			info: {
				flexDirection: 'row', 
				backgroundColor: '#FAEBD7', 
				height: 50, 
				width: 300,
			},
			mapimg: {
				height: 50,
				width: 50
			},
			name: {flex: 0.3},
			addr: {flex: 0.5},
			mapbtn: {flex: 0.2}			
		});

		return (
			<View style={styles.container}>
				<ScrollView>

					{this.props.restaurantResults.map((obj, i) => 

					<View key={i} style={styles.results}>

						<Image 
							source={obj.restaurant.featured_image === '' ? require('./img/default_food.png') : {uri: obj.restaurant.featured_image}}
							style={styles.img}
						/>

						<View style={styles.info} >

							<Text style={styles.name}>{obj.restaurant.name}</Text>
							<Text style={styles.addr}>{obj.restaurant.location.address}</Text>
							<TouchableHighlight style={styles.mapbtn} onPress={() => this.props.openMap(obj.restaurant.location.latitude, obj.restaurant.location.longitude)}>
								<Image
									style={styles.mapimg}
									source={require('./img/maps_icon.png')}
								/>
							</TouchableHighlight>

						</View>		

					</View>)}

				</ScrollView>
			</View>);
	}
}