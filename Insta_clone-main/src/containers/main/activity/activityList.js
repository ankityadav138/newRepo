import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ActivityListItem from './activityListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const datas = [
    {
        type: "Reply",
        seen: true,
        _id: "61c942a38ba42e5dd7220a46",
        to: "6194c432b0633202c848cb41",
        user: {
            accountType: "public",
            photo: {
                public_id: "uk2gwv9oyhofuu1wr9de",
                secure_url: "https://res.cloudinary.com/saccloud/image/upload/v1637917397/uk2gwv9oyhofuu1wr9de.png"
            },
            followers: {
                cointest551832: {
                    _id: "61c554898ba42e5dd721ef97",
                    user: "6194b9b972501806686653f8"
                }
            },
            following: {
                rtaide254: {
                    _id: "61c2f414ae00867d3ad9070e",
                    user: "619c75a1ca6b63473025adce"
                },
                cointest551832: {
                    _id: "61c2f433ae00867d3ad90713",
                    user: "6194b9b972501806686653f8"
                }
            },
            requests: [],
            _id: "6194c432b0633202c848cb41",
            user: "6194c3d8b0633202c848cb40",
            username: "sachin",
            name: "sachintalmale",
            email: "sachin.talmale.551832@gmail.com",
            __v: 1,
            id: "6194c432b0633202c848cb41"
        },
        createdAt: "2021-12-27T04:35:47.649Z",
        __v: 0
    },
    {
        type: "Follow",
        seen: true,
        _id: "61c554898ba42e5dd721ef98",
        to: "6194c432b0633202c848cb41",
        user: null,
        createdAt: "2021-12-24T05:03:05.384Z",
        __v: 0
    },
    {
        type: "Follow",
        seen: true,
        _id: "61c2e0ec828b755a25e81abb",
        to: "6194c432b0633202c848cb41",
        user: null,
        createdAt: "2021-12-22T08:25:16.650Z",
        __v: 0
    },
    {
        type: "Follow",
        seen: true,
        _id: "61c2a241e7cf8c0bac6d3eda",
        to: "6194c432b0633202c848cb41",
        user: null,
        createdAt: "2021-12-22T03:57:53.977Z",
        __v: 0
    },
    {
        type: "Follow",
        seen: true,
        _id: "61c29fd6e7cf8c0bac6d3ebb",
        to: "6194c432b0633202c848cb41",
        user: null,
        createdAt: "2021-12-22T03:47:34.958Z",
        __v: 0
    },
]

export default function ActivityList() {
    const [Data, setData] = useState([]);
    const [temp, setTemp] = useState(datas);

    const API = 'http://188.166.189.237:3001/api/v1/profile/notifications';
    useEffect(() => {
        async function getData() {

            const Demo_token = await AsyncStorage.getItem('TOKEN')
            console.log("demo Toekn", Demo_token);

            const request = fetch(API, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Demo_token}`,
                }
            });
            const response = await request;
            const parsed = await response.json();
            setData(parsed.data);
        }
        getData();
    }, []);


    return (
        <FlatList
            data={temp}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => <ActivityListItem data={item} />}
        />
    );
}
