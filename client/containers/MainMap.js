import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MapView, Permissions, Audio } from 'expo'

import * as cloudAction from '../actions/clouds'
import MapCanvas from '../components/MapCanvas'
import CloudMarker from '../components/CloudMarker'
import UserMarker from '../containers/UserMarker'
import MapInterface from '../containers/MapInterface'

import Editor from '../containers/Editor'
import CloudPopOut from '../containers/CloudPopOut'
import NewDialog from '../containers/NewDialog'

class MainMap extends Component {

  componentDidMount () {
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='blue' barStyle='light-content' />
        <MapCanvas
          coords={this.props.state.position}
          follow={this.props.state.follow && !this.props.state.popout_open} >

          {this.props.state.clouds.map(cld =>
            <CloudMarker
              key={cld.id}
              coords={cld.coords}
              type={cld.type}
              onPress={() => {
                Audio.Sound.create(require('../assets/sounds/plop.mp3'), { shouldPlay: true })
                this.props.actions.setSelectedCloudAndPopout(cld.id)
              }}
            />
          )}

          <UserMarker />
        </MapCanvas>

        <CloudPopOut />

        <NewDialog navigation={this.props.navigation} />
        <MapInterface navigation={this.props.navigation} />
      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.clouds
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...cloudAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMap)
// <Editor />
