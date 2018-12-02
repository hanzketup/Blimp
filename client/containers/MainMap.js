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
import CloudFeed from '../containers/CloudFeed'

class MainMap extends Component {

  componentDidUpdate () {
    console.log('## MAINMAP UPDATED ##')
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='blue' barStyle='light-content' />
        <MapCanvas
          coords={this.props.state.position}
          follow={this.props.state.follow && !this.props.state.feed_open} >

          {this.props.state.clouds.map(cld =>
            <CloudMarker
              key={cld.id}
              coords={cld.position}
              type={cld.type}
              onPress={() => {
                Audio.Sound.createAsync(require('../assets/sounds/plop.mp3'), { shouldPlay: true })
                this.props.actions.setHighlightedAndOpen(cld.id)
              }}
            />
          )}

          <UserMarker />
        </MapCanvas>

        <CloudFeed />
        <Editor />
        <MapInterface navigation={this.props.navigation} />

      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.clouds,
    ...state.ui
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
