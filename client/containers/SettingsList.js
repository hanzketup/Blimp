import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, AsyncStorage, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class SettingsList extends Component {

  async signOut () {
    await AsyncStorage.removeItem('authToken')
    await AsyncStorage.removeItem('hasRegistedNotificationToken')
    this.props.navigation.navigate('Auth')
  }

  render () {
    return (
      <ScrollView style={{flex: 1}}>

        <TouchableOpacity
          style={style.item}
          onPress={() => null}>
          <Text style={style.itemText}>Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.item}
          onPress={() => null}>
          <Text style={style.itemText}>Privacy Policy</Text>
        </TouchableOpacity>

        {this.props.state.me.is_moderator &&
          <TouchableOpacity
            style={style.item}
            onPress={() => this.props.navigation.navigate('RadarModeration')}>
            <Text style={style.itemText}>Create Radar</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity
          style={style.item}
          onPress={this.signOut.bind(this)}>
          <Text style={style.itemText}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.ui,
    ...state.user
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsList)

const style = StyleSheet.create({
  item: {
    width: '100%',
    height: 75,
    borderColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: '10%'
  },
  itemText: {
    fontSize: 18
  }
})
