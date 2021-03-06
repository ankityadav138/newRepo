import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import colors from '../../../res/colors';
import { useNavigation } from '@react-navigation/native';


export default function PostComments({ post, getData }) {
  console.log("checking getdata on postcomments", getData)
  const navigation = useNavigation()
  if (post === undefined) {
    return (
      <View>
        <Text>
          {" "}
        </Text>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        style={{ marginTop: 5, marginStart: 15 }}
        onPress={() => navigation.navigate("CommentsScreen", { post, getData })}>
        <Text style={{ color: colors.textFaded2 }}>
          View all {post.comments} comments
        </Text>
      </TouchableOpacity>
    );
  }
}
