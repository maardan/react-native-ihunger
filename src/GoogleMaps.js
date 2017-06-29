import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Modal, View } from 'react-native';

export default class GoogleMaps extends React.Component {

  	render() {

  		const lat = parseFloat(this.props.Lat);
  		const lng = parseFloat(this.props.Lon);

  		const styles = StyleSheet.create({
  			container: {
  				position: 'absolute',
  				top: 0,
  				left: 0,
  				right: 0,
  				bottom: 0,
  				justifyContent: 'flex-end',
  				alignItems: 'center',
  			},			
  			map: {
  				position: 'absolute',
  				top: 0,
  				left: 0,
  				right: 0,
  				bottom: 0,
  			},
  		});

	    return (
	      	<View style={{marginTop: 22}}>
		        <Modal
					animationType={"slide"}
					transparent={false}
					visible={this.props.modalVisible}
					onRequestClose={() => this.props.closeMap()}
	         	>

					<MapView
					  style={styles.map}
					    region={{
					          latitude: lat,
					          longitude: lng,
					          latitudeDelta: 0.0922,
					          longitudeDelta: 0.0421
					        }}			  
					>

					    <MapView.Marker
					      coordinate={{latitude: lat, longitude: lng}}
					    />
					</MapView>

	        	</Modal>
	      	</View>);
  	}
}