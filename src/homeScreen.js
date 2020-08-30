import React from 'react';
import {Text, FlatList, TouchableOpacity, Image, View} from 'react-native';

const HomeScreen = (props) => {
  const data = [
    {
      title: 'Pop Song',
      fileName: 'sample',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
      imageUrl: 'https://i.ytimg.com/vi/qKpy5Uy3i-Y/maxresdefault.jpg',
    },
    {
      title: 'Beat Song',
      fileName: 'sample2',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
      imageUrl:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/11/02113017/Bolly-Songs-F.jpg',
    },
    {
      title: 'Rock Song',
      fileName: 'sample3',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
      imageUrl:
        'https://static.toiimg.com/thumb/msid-71472093,imgsize-596693,width-800,height-600,resizemode-75/71472093.jpg',
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Audio', {
              fileName: item.fileName,
              imageUrl: item.imageUrl,
            })
          }
          style={{
            backgroundColor: 'white',
            margin: 10,
            padding: 10,
            borderWidth: 0.5,
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.imageUrl}}
            style={{height: 60, width: 55}}
          />
          <View style={{marginHorizontal: 10, flex: 1}}>
            <Text style={{fontWeight: 'bold', color: 'orange'}}>
              title:{' '}
              <Text style={{fontWeight: '100', color: 'black'}}>
                {item.title}
              </Text>
            </Text>
            <Text style={{fontWeight: 'bold', color: 'orange'}}>
              description:{' '}
              <Text style={{fontWeight: '100', color: 'black'}}>
                {item.description}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default HomeScreen;
