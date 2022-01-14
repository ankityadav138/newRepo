import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import user from '../../../../../res/images/user.png'
import images from '../../../../../res/images';
import colors from '../../../../../res/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewReply(props) {
    console.log("replies in components", props)
    let commentId = props.commentId
    let replyId = props.data.id
    let didLike = props.data.didLike


    const [count, setCount] = useState(props.data.likes)

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

    const changeInLike = async () => {
        const token = await AsyncStorage.getItem("TOKEN")

        await fetch(`http://188.166.189.237:3001/api/v1/comment/reply/like/${commentId}/${replyId}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json())
            .then((response) => {
                console.log("like on reply response", response)
            })
    }

    const [likeIcon, setLikeIcon] = React.useState(didLike);

    return (
        <SafeAreaView style={styles.container2}>

            <View style={styles.subContainer}>
                <View style={{ paddingLeft: 8 }}>
                    <Image source={user}
                        style={styles.compImage} />
                </View>

                <View style={styles.commentSection}>
                    <Text style={{ color: "white" }}>
                        <Text style={styles.userName}>
                            {props.data.username} {' '}
                        </Text>{props.data.reply}
                    </Text>
                </View>

                <TouchableOpacity style={{ top: 30, right: 10, }} onPress={() => { setLikeIcon(!likeIcon); changeInLike(); increase() }}>
                    <Image source={tapToLike(likeIcon)} style={styles.actionIcons} />
                </TouchableOpacity>
            </View>

            <View style={styles.footerSection}>
                <Text style={styles.greyText}>{count} likes</Text>
                <Text style={styles.greyText}>Reply</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container2: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginVertical: 20
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    compImage: {
        width: 25,
        height: 25,
        borderRadius: 30,
        tintColor: colors.text
    },
    commentSection: {
        width: 290,
        alignSelf: "center",
        marginLeft: 10,
        // backgroundColor: ""
    },
    userName: {
        color: colors.text,
        // color: "black",
        fontWeight: "bold",
        fontSize: 15
    },
    actionIcons: {
        width: 17,
        height: 17,
    },
    footerSection: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-around",
        marginLeft: 40,
        marginTop: 5,
    },
    greyText: {
        color: "grey", fontSize: 12
    },
})
