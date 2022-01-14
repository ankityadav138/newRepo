import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import ProfileHeader from './ProfileHeader';
import UserBio from './UserBio';
import EditProfileButton from './EditProfileButton';
import ConstantStories from './ConstantStories';
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../../res/colors';
import GridIcon from './gridIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './profileBottomMenu/Header';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import BottomContent from './profileBottomMenu/BottomContent';
import { useNavigation } from '@react-navigation/native';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';

const data = [{ "key": "1" }];

export default function profileScreen(props) {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  var renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


  const getData = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('TOKEN')
    await fetch('http://188.166.189.237:3001/api/v1/users/me', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(res => res.json())
      .then((response) => {

        console.log(response)
        try {
          if (response.status === "OK") {
            setData(response.data)
            setLoading(false)
          }
        } catch (error) {

        }
      })
  }



  const API = 'http://188.166.189.237:3001/api/v1/users/me';
  useEffect(() => {
    getData();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      getData();
    });

    // async function getData() {

    //   const Demo_token = await AsyncStorage.getItem('TOKEN')

    //   const request = fetch(API, {
    //     method: "GET",
    //     headers: {
    //       "Authorization": `Bearer ${Demo_token}`,
    //     }
    //   });
    //   const response = await request;
    //   const parsed = await response.json();
    //   setData(parsed.data);
    // }
    return willFocusSubscription;
  }, []);

  if (loading) {
    return (
      <CustomActivityIndicator />
    )
  } else {
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: colors.bottomBackGround }}
        ListHeaderComponent={<Header bs={bs} data={Data} />}
        stickyHeaderIndices={[0]}
        data={data}
        renderItem={({ item, index }) => (
          <>
            <BottomSheet
              ref={bs}
              snapPoints={[450, 0]}
              renderContent={() => <BottomContent navigation={navigation} />}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}
            />
            <ProfileHeader data={Data} />
            <UserBio data={Data} />
            <EditProfileButton />
            <ConstantStories />
            <LineSeperator />
            <GridIcon />
            <ProfileGrid data={Data} />
          </>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 10
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 55,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    bottom: 10
  },
})
