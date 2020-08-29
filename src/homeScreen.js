import React from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';

const HomeScreen = (props) => {
  const data = [
    {
      title: 'Pop Song',
      fileName: 'sample',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
    },
    {
      title: 'Beat Song',
      fileName: 'sample2',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
    },
    {
      title: 'Rock Song',
      fileName: 'sample3',
      description:
        'This is a very popular pop song. Listen the melody and enjoy your day',
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
            })
          }
          style={{
            backgroundColor: 'white',
            margin: 10,
            padding: 10,
            borderWidth: 0.5,
            elevation: 5,
          }}>
          <Text>title: {item.title}</Text>
          <Text>description: {item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default HomeScreen;
