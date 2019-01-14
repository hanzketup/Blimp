import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'

import * as radarActions from '../actions/radar'
import LargeModal from '../components/LargeModal'
const default_image = require('../assets/icons/scan.png')

class RadarModal extends Component {
  render () {
    return this.props.state.show_radar_modal && (
    <LargeModal>
      <Image style={{width: 140, height: 140}} resizeMode='contain' source={this.props.image ? '' : default_image} />
      <Text style={style.title}>{this.props.state.title}</Text>
      <Text style={style.desc}>{this.props.state.body}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={style.button} onPress={() => this.props.actions.toggleRadarModal(false)}>
          <Text style={[style.buttonText, {color: '#2bcbba'}]}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.button, {backgroundColor: '#2bcbba'}]}>
          <Text style={[style.buttonText, {color: '#fff'}]}>Go!</Text>
        </TouchableOpacity>
      </View>
    </LargeModal>
    )
  }
}

const mapStateToProps = state => ({
  state: {...state.radar}
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...radarActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadarModal)

const style = StyleSheet.create({
  title: {
    paddingTop: 5,
    fontSize: 27
  },
  desc: {
    paddingTop: 10,
    paddingBottom: 18,
    textAlign: 'center'
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
