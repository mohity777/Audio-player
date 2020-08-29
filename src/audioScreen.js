import React, {useEffect, useState} from 'react';
import {View, Text, Slider, Button} from 'react-native';
import {Player} from '@react-native-community/audio-toolkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

let player = null;
let interval;
const AudioScreen = (props) => {
  const [btn, setBttn] = useState('play');
  const [progress, setProgress] = useState(0);
  const [time, setTm] = useState(0);
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
      clearInterval(interval);
    };
  }, []);

  const init = () => {
    player = new Player('sample', {
      autoDestroy: false,
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      }
    });
    interval = setInterval(() => {
      let readableTm = readableTime(player.currentTime / 1000);
      setTm(readableTm);
    }, 100);
  };

  const seek = async (percentage) => {
    if (!player) {
      return;
    }

    let position = percentage * player.duration;

    await player.seek(position);
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
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
      }}>
      <View
        style={{
          backgroundColor: 'orange',
          width: '100%',
          padding: 2,
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text>{time}</Text>
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
        <TouchableOpacity
          onPress={togglePlayPause}
          style={{alignSelf: 'center'}}>
          <Icon size={25} name={btn} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioScreen;
