import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import ConstantStories from '../profile/ConstantStories';
import LineSeperator from '../profile/LineSeperator';
import GridIcon from '../profile/gridIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
    { key: "1" }
]

function SearchedUser({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons name='dots-vertical' size={30} color="white"
                    onPress={() => alert("Need to work on this Feature")} />
            ),
            headerTitle: route.params.UserName
        })
    })

    function FmButtons() {
        return (
            <View style={{ flexDirection: "row", flex: 1, paddingTop: 5, marginBottom: 10, margin: 3 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity style={{
                        width: "90%", height: "100%", backgroundColor: "#4c68d7",
                        alignItems: "center", borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 16, color: "white" }}>
                            Follow
                        </Text>
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
                                {Object.keys(route.params.Followings).length}
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
});