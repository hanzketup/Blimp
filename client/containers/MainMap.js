import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Permissions } from 'expo'

import * as cloudAction from '../actions/clouds'
import MapCanvas from '../components/MapCanvas'
import CloudMarker from '../components/CloudMarker'
import MapCoin from '../components/MapCoin'

import UserMarker from '../containers/UserMarker'
import MapInterface from '../containers/MapInterface'
import Editor from '../containers/Editor'
import CloudFeed from '../containers/CloudFeed'
import RadarModal from '../containers/RadarModal'

class MainMap extends Component {

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
  actions: bindActionCreators({...cloudAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMap)
// <Editor />
