import React, { Component } from "react"
import { View, Text, Alert, Image, StyleSheet } from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { LinearGradient } from "expo"

import * as editorActions from '../actions/editor'
import LargeTitle from '../components/LargeTitle'
import AuthButton from '../components/AuthButton'

class AuthControl extends Component {

  render() {
    return (
      <LinearGradient colors={['#f3a683', '#f39d83']} style={style.container}>

      <Image source={require('../assets/blimp.png')} style={{height: '14%',  marginTop: 'auto', marginBottom: '8%'}} resizeMode={'contain'} />

        <LargeTitle
          title={'Hey! \n Lets get you setup.'}
          subTitle={'Sign in with your Google or Facebook account to proceed. Blimp wont share your info or post to your feed.'}
        />

        <View style={style.buttonWrap}>
          <AuthButton
            onPress={() => this.props.navigation.navigate('AuthComplete')}
            style={style.button}
            title={'Sign in with Google'}
            icon={'google'}
            type={'brands'}
            color={'#d85b4b'}
          />
          <AuthButton
            onPress={() => this.props.navigation.navigate('AuthComplete')}
            style={style.button}
            title={'Sign in with Facebook'}
            icon={'facebook-f'}
            type={'brands'}
            color={'#3b5998'}
          />
        </View>
      </LinearGradient>
    )
  }

}

const mapStateToProps = state => ({
  state: state.editor
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...editorActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthControl)


const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '0%',
    backgroundColor: '#ffeedb',
  },
  buttonWrap: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '85%',
    marginBottom: 'auto'
  },
})
