import React from 'react';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostLikes from './PostLikes';
import PostText from './PostText';
import PostComments from './PostComments';
import PostPublishDate from './PostPublishDate';

export default function Post({ data, getData }) {
  console.log("checking feedapi get data ", getData)


  // if (data === undefined) {
  //   return (
  //     <View style={{
  //       backgroundColor: "black", justifyContent: 'center',
  //       alignItems: "center", flex: 1
  //     }}>
  //       <ActivityIndicator size="small" color="white" />
  //     </View>
  //   )
  // } else {
  return (
    <React.Fragment>
      <PostHeader />
      <PostImage post={data} />
      <PostActions getData={getData} post={data} />
      {/* <PostLikes post={data} /> */}
      <PostText post={data} />
      <PostComments getData={getData} post={data} />
      <PostPublishDate post={data} />
    </React.Fragment>
  );
};
// };
