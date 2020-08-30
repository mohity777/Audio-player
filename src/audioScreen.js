import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Slider,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Player} from '@react-native-community/audio-toolkit';
import Icon from 'react-native-vector-icons/FontAwesome';

let player = null;
let progressInterval;
let lastSeek = 0;
const AudioScreen = (props) => {
  const [btn, setBttn] = useState('play');
  const [progress, setProgress] = useState(0);

  const togglePlayPause = async () => {
    try {
      if (player.isPlaying) {
        setBttn('play');
        await player.pause();
      } else {
        setBttn('pause');
        await player.play();
      }
    } catch (error) {
      console.log('error at play', error);
    }
  };

  useEffect(() => {
    init();
    return () => {
      player.destroy();
      clearInterval(progressInterval);
    };
  }, []);

  const init = () => {
    console.log(props.route.params.imageUrl);
    player = new Player(props.route.params.fileName, {
      autoDestroy: false,
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      }
    });
    progressInterval = setInterval(() => {
      if (player && shouldUpdateProgressBar()) {
        if (readableTime(player.currentTime) == readableTime(player.duration))
          setBttn('play');
        let currentProgress = Math.max(0, player.currentTime) / player.duration;
        if (isNaN(currentProgress)) {
          currentProgress = 0;
        }
        setProgress(currentProgress);
      }
    }, 100);
  };

  const seek = async (percentage) => {
    if (!player) {
      return;
    }
    lastSeek = Date.now();
    let position = percentage * player.duration;
    await player.seek(position);
  };
  const shouldUpdateProgressBar = () => {
    // Debounce progress bar update by 200 ms
    return Date.now() - lastSeek > 200;
  };
  function readableTime(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = '';

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  const seekBackward = async () => {
    if (!player) {
      return;
    }
    lastSeek = Date.now();
    let position =
      player.currentTime - 5000 <= 0 ? 0 : player.currentTime - 5000;
    await player.seek(position);
  };

  const seekForward = async () => {
    if (!player) {
      return;
    }
    lastSeek = Date.now();
    let position =
      player.currentTime + 5000 >= player.duration
        ? player.duration
        : player.currentTime + 5000;
    await player.seek(position);
  };

  const slow = async () => {
    if (player.isPaused || player.isStopped || player.speed - 0.25 <= 0) return;
    player.speed = player.speed - 0.25;
  };

  const fast = async () => {
    if (player.isPaused || player.isStopped || player.speed + 0.25 >= 2) return;
    player.speed = player.speed + 0.25;
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // padding: 20,
      }}>
      <Image
        source={{uri: props.route.params.imageUrl}}
        style={{flex: 1, margin: 25, height: '100%', width: '100%'}}
      />
      <View
        style={{
          backgroundColor: 'orange',
          width: '100%',
          padding: 2,
          flex: 0.14,
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Animated.Text>
            {player ? readableTime(player.currentTime / 1000) : readableTime(0)}
          </Animated.Text>
          <View style={{width: '80%'}}>
            <Slider
              step={0.0001}
              onValueChange={(percentage) => seek(percentage)}
              value={progress}
            />
          </View>
          <Text>
            {player && player.duration != -1
              ? readableTime(player.duration / 1000)
              : readableTime(0)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={slow}
            hitSlop={{right: 20}}
            style={{marginRight: 20}}>
            <Icon size={25} name="fast-backward" color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={seekBackward} hitSlop={{right: 20}}>
            <Icon size={25} name="backward" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={{alignSelf: 'center', marginHorizontal: 40}}>
            <Icon size={25} name={btn} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={seekForward} hitSlop={{left: 20}}>
            <Icon size={25} name="forward" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fast}
            hitSlop={{left: 20}}
            style={{marginLeft: 20}}>
            <Icon size={25} name="fast-forward" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AudioScreen;
