/*global google*/
import React, { Component } from 'react';
import { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'

var distanceG= 0;
var timeG = 0;
export default class Map extends Component {
    constructor(props){
        super(props)
	this.state = {
	    distance:0,
	    time:0
	};
    }
    
    render() {
        //console.log('dest: ', JSON.stringify(this.props.dest));
        //console.log('src: ', JSON.stringify(this.props.src));
        //var src="Golden Gate Bridge, San Francisco, CA";
        //var dest="San Jose State University, San Jose, CA";
        var src=this.props.src;
        var dest=this.props.dest;
        const Directions = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?",
                loadingElement: <div style={{ height: `480px` }} />,
                containerElement: <div style={{ width: `100%` }} />,
                mapElement: <div style={{height: `640px`, width: `640px` }}  />
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
	         componentWillMount() {
		     this.refs = {}
		 },
                componentDidMount() {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode( { 'address': src}, function(resultsSrc, status) {
                        if (status == 'OK') {
                            geocoder.geocode( { 'address': dest}, function(resultsDest, status) {
                                if (status == 'OK') {
                                    const dirService = new google.maps.DirectionsService();
                                    dirService.route({
                                        origin: new google.maps.LatLng(resultsSrc[0].geometry.location.lat(), resultsSrc[0].geometry.location.lng()),
                                        destination: new google.maps.LatLng(resultsDest[0].geometry.location.lat(), resultsDest[0].geometry.location.lng()),
                                        travelMode: google.maps.TravelMode.DRIVING,
                                    }, (res, status) => {
                                        if (status === google.maps.DirectionsStatus.OK) {
					    this.setState({distance:res.routes[0].legs[0].distance.text,
							   time:res.routes[0].legs[0].duration.text})
					    distanceG = res.routes[0].legs[0].distance.text;
					    timeG = res.routes[0].legs[0].duration.text;
					    //console.log("DISTANCE: "+this.state.distance+", Travel Time "+this.state.time);
					    //console.log(this.refs.travel);

                                            this.setState({
                                                directions: {...res},
                                                markers: true
                                            })
                                        } else {
                                            console.error(`error unable to provide directions ${res}`);
                                        }
                                    });
                                } else {
                                    alert('Unable to get destination coordinates: ' + status);
                                }
                            }.bind(this));
                        } else {
                            alert('Unable to get source coordinates: ' + status);
                        }
                    }.bind(this));
                }
            })
        )(props =>
          <GoogleMap
                defaultZoom={3}
            >
          {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
	   {this.refs.travelInfo="Distance: "+distanceG+", Time: "+timeG}
           </GoogleMap>

        );
        return (
		<div>
		<Directions />
		<div ref="travelInfo"></div>
	        </div>
        )
    }
}
