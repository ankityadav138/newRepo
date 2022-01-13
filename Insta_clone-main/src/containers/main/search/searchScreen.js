import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import SearchGrid from './SearchGrid';
import SearchTopTags from './SearchTopTags';
import colors from '../../../res/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function searchScreen() {
  const [text, setText] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      const api = 'http://188.166.189.237:3001/api/v1/profile/';
      const token = await AsyncStorage.getItem("TOKEN")
      await fetch(api + text, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setDataSource(responseJson.data)
          // console.log("Search Data", responseJson);
        })
        .catch((error) => {
          console.log("Seach error", error);
        })
    };
    getData();
  }, [text]);

  return (
    <View style={{ backgroundColor: '#000', paddingTop: 20, }}>
      <View style={{
        marginHorizontal: 5, marginVertical: 10, justifyContent: "center",
        alignItems: "center",
      }}>
        <TextInput
          style={{
            backgroundColor: colors.textInputBackground,
            height: 40,
            width: Dimensions.get('screen').width - 10,
            fontWeight: 'bold',
            borderRadius: 10,
            paddingStart: 20,
            fontSize: 16,
            color: 'white',
          }}
          onChangeText={(text) => setText(text)}
          placeholder="Search"
          placeholderTextColor={colors.textFaded2}
        />
        {text <= 0 || dataSource === undefined ? (
          <View style={{ marginTop: 5 }}>
            <SearchTopTags />
            <SearchGrid />
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("SearchedUser", {
            id: dataSource.id,
            UserName: dataSource.username,
            Name: dataSource.name,
            ImageUrl: dataSource.profilePhotoUrl,
            Posts: dataSource.posts,
            Followers: dataSource.followers,
            Followings: dataSource.following,
            didFollow: dataSource.didFollow
          })}
            style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{
              flex: 1,
              flexDirection: "row", margin: 10, backgroundColor: "black"
            }}>
              <Image source={{ uri: dataSource.profilePhotoUrl }}
                style={{ width: 60, height: 60, borderRadius: 30, borderColor: "white", borderWidth: 1 }} />
              <View style={{ flexDirection: "column", flex: 1, paddingLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                  {dataSource.name}
                </Text>
                <Text style={{ color: "grey", fontSize: 17 }}>
                  {dataSource.username}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
