import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


function Test({ data }) {
  if (data === [] || undefined) {
    return (
      <View>
        <ActivityIndicator size="small" color="white" />
      </View>
    )
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => console.log('Pressed Profile Grid Image')}>
          <Image
            source={{ uri: data.url }}
            style={{
              height: 150,
              flex: 1,
              marginEnd: 2,
              marginBottom: 2,
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

function ProfileGrid({ data }) {
  const { postsDetails } = data
  if (postsDetails === [] || undefined) {
    return (
      <View>
        <ActivityIndicator size="small" color="white" />
      </View>
    )
  } else {
    return (
      <FlatList
        data={postsDetails}
        style={{ marginTop: 2, marginStart: 2 }}
        renderItem={({ item, index }) => <Test data={item} />}
        numColumns={3}
        indicatorStyle={'white'}
        showsVerticalScrollIndicator={true}
      />
    );
  }
}

export default ProfileGrid;
