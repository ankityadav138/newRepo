import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import images from '../../../res/images';

const CommentView = (item) => {
    return (
        <SafeAreaView style={styles.container2}>
            <View style={{ paddingLeft: 8 }}>
                <Image source={images.redHeart}
                    style={styles.compImage} />
            </View>
            <View>
                <Text style={styles.textColor}>
                    {item.YourComments.name}
                    {"\n"}
                    {item.YourComments.comments}
                </Text>
            </View>
        </SafeAreaView>
    )
}

function PostCommentsScreen() {
    return (
        <View style={styles.container}>
            <Image source={images.facebookLogo}
                resizeMode="contain"
                style={styles.image}
            />
            <FlatList
                data={YourComments}
                renderItem={({ item, index }) => <CommentView YourComments={item} />}
            />
        </View>
    )
};

export default PostCommentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    textColor: {
        color: "#fff",
        fontSize: 15,
        paddingLeft: 10
    },
    image: {
        width: "95%",
        height: "40%"
    },
    compImage: {
        width: 40,
        height: 40,
        borderRadius: 30
    },
    container2: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }
});