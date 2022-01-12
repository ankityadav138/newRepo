import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';


const UserPostScreen = ({ route }) => {
    const [Data, setData] = useState(route.params.Posts);

    const Tested = ({ data }) => {
        return (
            <View style={{ flex: 1, paddingTop: 10, margin: 2 }}>
                <TouchableOpacity
                    onPress={() => console.log('Pressed Profile Grid Image')}>
                    <Image
                        source={{ uri: data.url }}
                        style={{
                            height: 150,
                            flex: 1,
                            marginEnd: 2,
                            marginBottom: 2,
                            alignItems: 'center',
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    if (Data === [] || undefined) {
        return (
            <View style={{ backgroundColor: "black" }}>
                <ActivityIndicator size="small" color="white" />
            </View>
        )
    } else {
        return (
            <FlatList
                data={Data}
                numColumns={3}
                keyExtractor={item => item.id}
                style={{ backgroundColor: "black" }}
                renderItem={({ item }) => (
                    <Tested data={item} />
                )}
                numColumns={3}
                indicatorStyle={'white'}
                showsVerticalScrollIndicator={true}
            />
        )
    };
}

export default UserPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
});
