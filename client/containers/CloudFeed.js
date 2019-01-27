import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import geolib from 'geolib'

import * as cloudActions from '../actions/clouds'
import CloudList from '../components/CloudList'
import CloudPost from '../components/CloudPost'

class CloudFeed extends Component {
  constructor (props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentDidUpdate () {
    this.props.state.feed_open
    ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    : BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress () {
    this.props.actions.toggleFeed(false)
    return true
  }

  render () {
    return (
      <CloudList
        open={this.props.state.feed_open}
        openAction={() => this.props.actions.toggleFeed(true)}
        closeAction={() => this.props.actions.toggleFeed(false)}
        nearbyCount={this.props.state.clouds.length}>

        {this.props.state.clouds
          // sort after proximity, but bring hightlighted to top
          .sort((a, b) =>
          a.id == this.props.state.hightlighted_cloud ? -1
          : b.id == this.props.state.hightlighted_cloud ? 1
          : geolib.getDistanceSimple(a.position, this.props.state.position) > geolib.getDistanceSimple(b.position, this.props.state.position)
        )
          .map(message =>
            <CloudPost
              key={message.id}
              {...message}
              me={this.props.state.me.id}
              voteAction={this.props.actions.voteCloud}
              reportAction={this.props.actions.reportCloud} />
            )
      }

      </CloudList>
    )
  }
}

const mapStateToProps = state => ({
  state: {
    ...state.clouds,
    ...state.user
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(cloudActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudFeed)
