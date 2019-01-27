import { Audio } from 'expo'

const sounds = {
  woo: require('../assets/sounds/woo.mp3'),
  cash: require('../assets/sounds/cash.mp3'),
  plop: require('../assets/sounds/plop.mp3'),
  pling: require('../assets/sounds/pling.mp3'),
  burst: require('../assets/sounds/burst.mp3')
}

export default async (name, autoPlay) => {
  try {
    var { sound: player, status } = await Audio.Sound.createAsync(sounds[name])
  } catch (err) {
    console.log(`Sound playback failed with error: ${err}`)
    return false
  }

  // Exit early if the sound already played
  if (autoPlay) {
    await player.playAsync()
    player.setOnPlaybackStatusUpdate((pbs) => pbs.didJustFinish && player.unloadAsync())
    return 0
  }

  // return .play() if autoPlay == false for later use
  return {
    play: async() => {
      await player.playAsync()
      player.setOnPlaybackStatusUpdate((pbs) => pbs.didJustFinish && player.unloadAsync())
    }
  }
}
