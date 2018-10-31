import React from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image, Text, View, Alert } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-fontawesome-pro'

import icon from '../assets/icons/arrow.png'

export default props =>
  <View style={style.container}>

    <View style={style.main}>

      <View style={style.user}>
        <Image style={style.userAvatar} source={icon} resizeMode='contain' />
        <Text style={style.userName}>{props.username}</Text>
        <Text style={style.timeStamp}>{moment(props.timestamp, 'X').fromNow()}</Text>
      </View>

      <Text style={style.body}>{props.body}</Text>
    </View>

    <View style={style.vote}>
      <Icon containerStyle={style.upvoted} name='arrow-alt-up' color={props.upvoted ? '#ff9a2a' : 'rgba(0, 0, 0, 0.5)'} type={props.upvoted ? 'solid' : 'regular'} size={23} />
      <Text style={style.voteCount}>{props.points}</Text>
      <Icon containerStyle={style.downvoted} name='arrow-alt-down' color={props.downvoted ? '#e17055' : 'rgba(0, 0, 0, 0.5)'} type={props.downvoted ? 'solid' : 'regular'} size={23} />

      <Icon onPress={() => {
        Alert.alert(
           `Report post by ${props.username}?`,
           `Are you sure you want to report this post?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Confirm', onPress: () => props.reportAction(props.id)}
          ]
         )
      }}
        containerStyle={style.report} name='exclamation-circle' color='rgba(0, 0, 0, 0.3)' type='regular' size={19} />

    </View>

  </View>

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '92%',
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    elevation: 5,
    marginTop: 'auto',
    overflow: 'hidden'
  },
  user: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginBottom: -0
  },
  userAvatar: {
    height: 28,
    width: 28,
    marginLeft: 0
  },
  userName: {
    fontSize: 21,
    color: '#6c757d',
    fontWeight: 'bold',
    marginLeft: 4,
    marginBottom: -4
  },
  timeStamp: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 'auto',
    marginRight: -2,
    marginBottom: 0
  },
  vote: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 9,
    paddingBottom: 9
  },
  upvoted: {
    opacity: 0.6
  },
  downvoted: {
    opacity: 0.6
  },
  report: {
    padding: 4,
    opacity: 0.6,
    marginLeft: 'auto'
  },
  voteCount: {
    fontSize: 21,
    fontWeight: 'normal',
    opacity: 0.8,
    color: '#333',
    margin: 0,
    paddingRight: 8,
    paddingLeft: 8
  },
  main: {
    width: '100%',
    height: 'auto',
    padding: '5%',
    paddingLeft: '3%',
    paddingTop: '3%',
    paddingBottom: '2%',
    backgroundColor: '#fafafa'
  },
  body: {
    fontSize: 18,
    color: '#212529',
    paddingTop: 4,
    paddingLeft: 0,
    paddingRight: 12
  }
})
