import React from 'react';
import { Image, Button, View, ScrollView, ListView, Text, StyleSheet } from 'react-native';

export default class Recommendations extends React.Component {

	render() {

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const data = this.props.currRecommendations;
		const data_source = ds.cloneWithRows(data);
		const styles = StyleSheet.create({

			list: {
				flexDirection: 'row',
				flexWrap: 'wrap'
			},
			item: {
				margin: 20
			},
			title: {
				fontSize: 19,
				fontWeight: 'bold',
				alignItems: 'center'
			}
		});

		return (
			<View style={{ flex: 1, flexDirection: 'column', height: 600, padding: 20 }}>

				<Text style={styles.title}>What do you feel like eating?</Text>

				<ScrollView>
					<ListView 
						contentContainerStyle={styles.list}
						dataSource={data_source}
						renderRow={(obj) => <View style={styles.item}><Button title={obj.cuisine.cuisine_name} onPress={() => this.props.getRestaurants(obj.cuisine.cuisine_id)}/></View>}
					/>
		      	</ScrollView>			
			</View>);
	}
}