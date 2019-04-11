import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

import * as cloudAction from '../actions/clouds'
import * as uiAction from '../actions/ui'
import MapCanvas from '../components/MapCanvas'
import CloudMarker from '../components/CloudMarker'
import MapCoin from '../components/MapCoin'

import UserMarker from '../containers/UserMarker'
import MapInterface from '../containers/MapInterface'
import Editor from '../containers/Editor'
import CloudFeed from '../containers/CloudFeed'
import RadarModal from '../containers/RadarModal'
import WelcomeGuide from '../containers/WelcomeGuide'

class MainMap extends Component {

  async componentDidMount () {
    // open the welcome dialog if HasSeenWelcome is blank in local storage
    let welcomed = await AsyncStorage.getItem('HasSeenWelcome')
    if (welcomed !== 'done') {
      this.props.actions.setWelcomeActive(true)
      await AsyncStorage.setItem('HasSeenWelcome', 'done')
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='blue' barStyle='light-content' />
        <MapCanvas
          coords={this.props.state.position}
          follow={this.props.state.follow && !this.props.state.feed_open} >

          <UserMarker />

          {this.props.state.clouds.map(cld =>
            <CloudMarker
              key={1 + cld.id}
              coords={cld.position}
              type={cld.type}
              votes={cld.votes.length}
              onPress={() => this.props.actions.setHighlightedAndOpen(cld.id)}
            />
          )}

          {this.props.state.coins.map(cn =>
            <MapCoin
              key={2 + cn.id}
              coords={cn.position}
              onPress={() => null}
            />
          )}

        </MapCanvas>

        <CloudFeed />
        <Editor />
        <MapInterface navigation={this.props.navigation} />

        <RadarModal />
        {this.props.state.welcome_active && <WelcomeGuide />}

      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.clouds,
    ...state.coins,
    ...state.ui
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...cloudAction, ...uiAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMap)
// <Editor />
