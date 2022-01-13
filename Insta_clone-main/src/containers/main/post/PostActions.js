import React, { useEffect } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import images from '../../../res/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostLikes from './PostLikes';
import { useNavigation } from '@react-navigation/native';

export default function PostActions({ post }) {
  const navigation = useNavigation()
  // console.log("post in postactio", post)
  let didlike = post.didlike
  console.log("likessss", didlike)
  const ID = post.postId
  const Api = `http://188.166.189.237:3001/api/v1/post/like/${ID}`;

  const [count, setCount] = React.useState(post.likes)


  const increase = () => {
    if (!likeIcon) {
      return setCount(count + 1)
    } else if (likeIcon) {
      return setCount(count - 1)
    }
  }

  function tapToLike(likeIcon) {
    // console.log(likeIcon);
    if (!likeIcon) {
      return (images.like)
    } else {
      return (images.redHeart);
    }
  }
  function tapToBookmark(bookmarkIcon) {
    if (bookmarkIcon % 2 === 0) {
      return images.bookmarkWhite;
    } else {
      return images.bookmark;
    }
  }

  const likeOnPost = async () => {

    const Demo_token = await AsyncStorage.getItem('TOKEN')
    // console.log("like Toekn", Demo_token);

    await fetch(Api, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Demo_token}`
      },
    }).then(res => res.json())
      .then((response) => {
        console.log("didlike check", response)
      })
  }

  const likeCheck = () => {
    if (didlike === true) {
      return images.redHeart
    } else {
      return images.like
    }
  }

  useEffect(() => {
    likeCheck()
  }, [])

  const [likeIcon, setLikeIcon] = React.useState(post.didlike);
  const [bookmarkIcon, setBookmarkIcon] = React.useState(1);

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={Styles.container}>


        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

          <TouchableOpacity onPress={() => { setLikeIcon(!likeIcon); likeOnPost(); increase() }}>
            <Image source={tapToLike(likeIcon)} style={Styles.actionIcons} />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", { post })}>
            <Image source={images.comment} style={Styles.actionIcons} />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => console.log('Pressed Direct Message')}>
            <Image source={images.direct_message} style={Styles.actionIcons} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setBookmarkIcon(bookmarkIcon + 1)}>
          <Image
            source={tapToBookmark(bookmarkIcon)}
            style={Styles.actionIcons}
          />
        </TouchableOpacity>
      </View>
      <PostLikes post={count} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    //paddingStart: 20,
    marginEnd: 15,
    marginTop: 15,
  },
  actionIcons: {
    width: 23,
    height: 23,
    marginStart: 15,
  },
});
