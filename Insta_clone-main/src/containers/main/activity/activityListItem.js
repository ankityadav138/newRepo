import React from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TypeFollow() {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ margin: 10 }}>
                    <Image
                        source={{ uri: 'https://picsum.photos/600' }}
                        style={{ width: 50, height: 50, borderRadius: 70 }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                    <Text style={{ color: "white", fontWeight: "900" }}>
                        Mahesh@121 stated following you
                    </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", margin: 5 }}>
                    <TouchableOpacity style={{
                        width: 70, backgroundColor: "#3373a7", height: 25,
                        justifyContent: "center", alignItems: "center", borderRadius: 5
                    }}>
                        <Text style={{ color: "white" }}>
                            Follow
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

function TypeLike() {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ margin: 10 }}>
                    <Image
                        source={{ uri: 'https://picsum.photos/600' }}
                        style={{ width: 50, height: 50, borderRadius: 70 }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                    <Text style={{ color: "white", fontWeight: "900" }}>
                        Rohit34 liked your post
                    </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", margin: 5 }}>
                    <Image
                        source={{ uri: 'https://picsum.photos/300' }}
                        style={{ width: 50, height: 50, borderRadius: 5 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

function TypeReply({ data }) {
    console.log("profile", data.user.photo.secure_url);
    if (data.user.photo.secure_url === undefined) {
        return (
            null
        )
    } else {
        return (
            <SafeAreaView>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ margin: 10 }}>
                        <Image
                            source={{ uri: data.user.photo.secure_url }}
                            style={{ width: 50, height: 50, borderRadius: 70 }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                        <Text style={{ color: "white", fontWeight: "900" }}>
                            Rohit34 replied:
                        </Text>
                        <Text style={{ color: "grey", fontSize: 13 }}>
                            Nice Journey you have experenced Good to see you again!
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", margin: 5 }}>
                        <Image
                            source={{ uri: 'https://picsum.photos/300' }}
                            style={{ width: 50, height: 50, borderRadius: 5 }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default function ActivityListItem({ data }) {
    // console.log("arrived", data)
    if (data.type === "Reply") {
        return (
            <TypeReply data={data} />
        )
    }
    else if (data.type === "Follow") {
        return (
            <TypeFollow />
        );
    }
    else {
        return (
            <TypeLike />
        )
    }
}