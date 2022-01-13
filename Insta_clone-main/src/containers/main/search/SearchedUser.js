import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import ConstantStories from '../profile/ConstantStories';
import LineSeperator from '../profile/LineSeperator';
import GridIcon from '../profile/gridIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../res/colors';

const data = [
    { key: "1" }
]

function SearchedUser({ route, navigation }) {

    console.log("props on searched user", route.params.id)
    let id = route.params.id
    let didFollow = route.params.didFollow
    let followingLength = Object.keys(route.params.Followings).length


    const [followingCount, setFollowingCount] = React.useState(followingLength)

    const increase = () => {
        if (!followButton) {
            return setFollowingCount(followingCount + 1)
        } else if (followButton) {
            return setFollowingCount(followingCount - 1)
        }
    }


    const follow = async () => {
        const token = await AsyncStorage.getItem("TOKEN")

        if (didFollow === false) {
            await fetch("http://188.166.189.237:3001/api/v1/profile/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id
                })
            }).then(res => res.json())
                .then((response) => {
                    console.log("follow response", response)
                })
        } else {
            await fetch("http://188.166.189.237:3001/api/v1/profile/unfollow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id
                })
            }).then(res => res.json())
                .then((response) => {
                    console.log("follow response", response)
                })
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name='dots-vertical' size={30} color="white"
                    onPress={() => alert("Need to work on this Feature")} />
            ),
            headerTitle: route.params.UserName
        })
    })

    const FollowButton = () => {
        return (
            <View style={Styles.FollowButton}>
                <Text style={{ color: "white" }}>Follow</Text>
            </View>
        )
    }

    const UnfollowButton = () => {
        return (
            <View style={Styles.UnfollowButton}>
                <Text style={{ color: "white" }}>Unfollow</Text>
            </View>
        )
    }

    const tapToFollow = (followButton) => {
        if (!followButton) {
            return (
                FollowButton()
            )
        } else {
            return (
                UnfollowButton()
            )
        }
    }

    const [followButton, setFollowButton] = useState(didFollow)

    function FmButtons() {
        return (
            <View style={{ flexDirection: "row", flex: 1, paddingTop: 5, marginBottom: 10, margin: 3 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    {/* <TouchableOpacity style={{
                        width: "90%", height: "100%", backgroundColor: "#4c68d7",
                        alignItems: "center", borderRadius: 5
                    }}>
                       
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { setFollowButton(!followButton); increase(); follow() }}>
                        {tapToFollow(followButton)}
                    </TouchableOpacity>


                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity style={{
                        width: "90%", height: "100%", backgroundColor: "#4c68d7",
                        alignItems: "center", borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 16, color: "white" }}>
                            Message
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity style={{
                        width: "90%", height: "100%", backgroundColor: "#4c68d7",
                        alignItems: "center", borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 16, color: "white" }}>
                            Contact
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    function UserBio() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginStart: 10,
                    marginTop: 20,
                }}>
                <View style={{ marginBottom: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {route.params.UserName}</Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text style={{ color: 'white' }}>
                        Dancer, Singer, Content Creator
                        {"\n"}
                        10 million family on Tiktok
                        {"\n"}
                        Came to world in 1994
                        {"\n"}
                        #DancePlus #Bollywood #Tiktok
                        {"\n"}
                        from : Don't Know!
                    </Text>
                </View>
            </View>
        )
    }

    function HeaderAndAll() {
        return (
            <View style={Styles.container}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: route.params.ImageUrl }}
                        style={Styles.prfilePicture}
                    />
                </TouchableOpacity>

                <View style={Styles.container2}>
                    <View style={Styles.container3}>
                        <TouchableOpacity>
                            <Text style={Styles.numberContainer}>
                                {Object.keys(route.params.Posts).length}</Text>
                            <Text style={Styles.text}>Posts</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.container3}>
                        <TouchableOpacity>
                            <Text style={Styles.numberContainer}>
                                {Object.keys(route.params.Followers).length}
                            </Text>
                            <Text style={Styles.text}>Followers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.container3}>
                        <TouchableOpacity>
                            <Text style={Styles.numberContainer}>
                                {followingCount}
                            </Text>
                            <Text style={Styles.text}>Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // function ProfileGrid() {
    //     return (
    //         <View style={{ flex: 1 }}>
    //             {route.params.Posts.map((image) => {
    //                 return (
    //                     <FlatList
    //                         data={image}
    //                         numColumns={3}
    //                         keyExtractor={(item, index) => index.toString()}
    //                         renderItem={({ item, index }) => (
    //                             <TouchableOpacity index={index} key={image}
    //                                 onPress={() => console.log('Pressed Profile Grid Image')}>
    //                                 <Image
    //                                     source={{ uri: item }}
    //                                     style={{
    //                                         height: 150,
    //                                         flex: 1,
    //                                         marginEnd: 2,
    //                                         marginBottom: 2,
    //                                         alignItems: 'center',
    //                                     }}
    //                                 />
    //                             </TouchableOpacity>
    //                         )} />)
    //             })}
    //         </View>
    //     )
    // }

    function ProfileGrid() {
        return (
            <View style={{ flex: 1 }}>
                {route.params.Posts.map((image) => {
                    return (
                        <TouchableOpacity key={image}
                            onPress={() => console.log('Pressed Profile Grid Image')}>
                            <Image
                                source={{ uri: image }}
                                style={{
                                    height: 150,
                                    flex: 1,
                                    marginEnd: 2,
                                    marginBottom: 2,
                                    alignItems: 'center',
                                }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <FlatList
            style={{ backgroundColor: "black" }}
            data={data}
            renderItem={({ item }) => (
                <React.Fragment>
                    <HeaderAndAll />
                    <UserBio />
                    <FmButtons />
                    <ConstantStories />
                    <LineSeperator />
                    <GridIcon />
                    <ProfileGrid />
                </React.Fragment>
            )} />

    )
}

export default SearchedUser;

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    prfilePicture: {
        height: 80,
        width: 80,
        borderRadius: 100,
        marginLeft: 20,
    },
    numberContainer: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 15,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginEnd: 20,
    },
    text: {
        color: 'white',
        //fontWeight: 'bold',
        alignSelf: 'center',
    },
    container3: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    followButton: {
        width: 70,
        height: 30,
        borderColor: "white",
        borderRadius: 1
    },
    FollowButton: {
        width: 110,
        height: 30,
        backgroundColor: "#00ADEF",
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    UnfollowButton: {
        width: 110,
        height: 30,
        borderColor: "white",
        borderWidth: 0.5,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    }
});