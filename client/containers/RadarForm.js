import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native'
import { MapView } from 'expo'

import * as radarFormActions from '../actions/radarform'
import MapStyle from '../style/map.json'

class RadarForm extends PureComponent {

  componentDidMount () {
    this.props.actions.changePinPosition(this.props.state.position)
    setTimeout(() => this.map._component.animateToCoordinate(this.props.state.pinPosition), 500)
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <MapView.Animated
          provider='google'
          ref={component => this.map = component}
          zoomControlEnabled={false}
          scrollEnabled
          minZoomLevel={8}
          maxZoomLevel={20}
          showsCompass={false}
          toolbarEnabled={false}
          customMapStyle={MapStyle}
          style={style.map}
          initialRegion={{
            latitude: 58.360438,
            longitude: 15.619863,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>

          <MapView.Marker.Animated
            coordinate={this.props.state.pinPosition}
            onDragEnd={e => this.props.actions.changePinPosition(e.nativeEvent.coordinate)}
            image={require('../assets/icons/radarIcon.png')}
            draggable />

          <MapView.Circle
            center={this.props.state.pinPosition}
            radius={this.props.state.radius}
            fillColor={'rgba(252, 92, 101, 0.4)'}
          />

        </MapView.Animated>

        <ScrollView style={{flex: 1, width: '100%'}}>

          <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 10}}>Users in radius: {this.props.state.yield.toString()}</Text>

          <TextInput
            style={style.input}
            placeholder='radius (meter)'
            value={this.props.state.radius.toString()}
            onChangeText={val => {
              this.props.actions.changeRadius(parseInt(val) || 0)
              this.props.actions.checkRadarYield(
                this.props.state.pinPosition,
                this.props.state.radius
              )
            }
            }
        />

          <TextInput
            style={style.input}
            placeholder='Issuer'
            value={this.props.state.issuer}
            onChangeText={this.props.actions.setIssuer}
        />

          <TextInput
            style={style.input}
            placeholder='Title'
            value={this.props.state.title}
            onChangeText={this.props.actions.setTitle}
        />

          <TextInput
            style={style.input}
            placeholder='Short description (max 37 chars.)'
            maxLength={37}
            value={this.props.state.short}
            onChangeText={this.props.actions.setShort}
        />

          <TextInput
            style={[style.input, {height: 100, paddingTop: 6 }]}
            placeholder='Long description'
            underlineColorAndroid={'transparent'}
            textAlignVertical={'top'}
            maxLength={200}
            multiline
            value={this.props.state.body}
            onChangeText={this.props.actions.setBody}
        />

          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 18}}>
            <Text style={{fontSize: 18, paddingRight: 14}}>Send push notifications</Text>
            <Switch
              value={this.props.state.do_notify}
              onValueChange={this.props.actions.toggleDoNotify} />
          </View>

          <View style={{flexDirection: 'row', alignSelf: 'center', width: '90%', paddingTop: 25, paddingBottom: 25}}>
            <TouchableOpacity style={style.button} onPress={() => this.props.actions.tryRadar(this.props.state.title, this.props.state.body)}>
              <Text style={[style.buttonText, {color: '#2bcbba'}]}>Try it</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.button, {backgroundColor: '#2bcbba'}]}>
              <Text style={[style.buttonText, {color: '#fff'}]}>Publish</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.radarform,
    ...state.user
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...radarFormActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarForm)

const style = StyleSheet.create({
  map: {
    width: '100%',
    height: '55%'
  },
  input: {
    height: 55,
    width: '96%',
    color: '#333',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: 15,
    paddingLeft: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#eee'
  },
  button: {
    height: 52,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#2bcbba',
    marginRight: 8,
    marginLeft: 8
  },
  buttonText: {
    fontSize: 17
  }
})
