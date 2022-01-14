import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import images from '../../../../../res/images';
import colors from '../../../../../res/colors';
import user from '../../../../../res/images/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function CommentView({ item }) {
    console.log("itemmmm", item)

    // // let postId = item.postId
    let didLike = item.didLike
    let id = item.id
    console.log("checking props in comment view...", didLike)


    const navigation = useNavigation()
    const [count, setCount] = useState(item.like)
    const [replyCount, setReplyCount] = useState(item.reply)
    console.log(item.id)





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

    const likesOnComment = async () => {

        const token = await AsyncStorage.getItem('TOKEN')
        await fetch(`http://188.166.189.237:3001/api/v1/comment/like/${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res => res.json())
            .then((response) => {
                console.log(response)
            })
    }


    // const deleteComment = async () => {
    //     let id = item.YourComments.id
    //     let postId = item.postId
    //     const token = await AsyncStorage.getItem('TOKEN')
    //     await fetch(`http://188.166.189.237:3001/api/v1/comment/`, {
    //         method: "DELETE",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     }).then(res => res.json())
    //         .then((response) => {
    //             console.log(response)
    //         })
    // }

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
                            {item.username} {' '}
                        </Text>{item.comment}
                    </Text>
                </View>

                <TouchableOpacity style={{ top: 30, right: 10, }} onPress={() => { setLikeIcon(!likeIcon); likesOnComment(); increase() }}>
                    <Image source={tapToLike(likeIcon)} style={styles.actionIcons} />
                </TouchableOpacity>
            </View>

            <View style={styles.footerSection}>
                <Text style={styles.greyText}>21 h</Text>
                <Text style={styles.greyText}>{count} likes</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ReplyCommentScreen", { item })}>
                    <Text style={styles.greyText}>Reply</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => deleteComment()}>
                    <Text style={styles.greyText}>Delete</Text>
                </TouchableOpacity> */}
            </View>


            {
                replyCount != 0 ? <View style={{ flexDirection: "column", top: 15 }}>
                    <View style={styles.border} />
                    <TouchableOpacity onPress={() => navigation.navigate("ReplyCommentScreen", { item })}>
                        <Text style={{ color: "grey", fontSize: 12, marginLeft: 100 }}>
                            View {replyCount} previous reply
                        </Text>
                    </TouchableOpacity>
                </View>
                    : null
            }
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
        tintColor: "white"
    },
    commentSection: {
        width: 290,
        alignSelf: "center",
        marginLeft: 10
    },
    userName: {
        color: colors.text,
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
        marginTop: 5
    },
    greyText: {
        color: "grey", fontSize: 12
    },
    border: {
        borderWidth: 0.3,
        borderColor: "grey",
        top: 10,
        width: 40,
        marginLeft: 52
    },
})