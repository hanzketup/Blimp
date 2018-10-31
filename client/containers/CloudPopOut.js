import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { Audio } from 'expo'

import * as cloudActions from '../actions/clouds'
import PopOutBase from '../components/PopOutBase'
import PopOutPost from '../components/PopOutPost'

class CloudPopOut extends Component {
  constructor (props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentWillMount () {
    // Find the corrosponding object for selected_cloud on update
    if (this.props.state.selected_cloud) {
      this.cloud = this.props.state.clouds.filter(cld => cld.id === this.props.state.selected_cloud)[0]
    }
  }

  componentDidUpdate () {
    this.props.state.popout_open
    ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    : BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress () {
    this.props.actions.togglePopout(false)
    return true
  }

  render () {
    return (
      <PopOutBase
        open={this.props.state.popout_open}
        close={() => this.props.actions.togglePopout(false)}
        coords={this.props.state.selected_cloud && this.cloud.coords}
        type={this.props.state.selected_cloud && this.cloud.type}
        visits={this.props.state.selected_cloud && this.cloud.visits}
        timestamp={this.props.state.selected_cloud && this.cloud.timestamp}>

        {this.props.state.selected_cloud && this.cloud.posts.map(cld =>
          <PopOutPost
            key={cld.id}
            id={cld.id}
            username={cld.user.name}
            body={cld.body}
            points={cld.points}
            timestamp={cld.timestamp}
            reportAction={this.props.actions.reportCloudPost} />
        )}

      </PopOutBase>
    )
  }
}

const mapStateToProps = state => ({
  state: state.clouds
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(cloudActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudPopOut)
