// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Dimensions, Image, ActivityIndicator } from 'react-native';
// import colors from '../../../res/colors';

// function SearchBar() {
//     const [text, setText] = useState('');
//     const [dataSource, setDataSource] = useState([]);

//     useEffect(() => {
//         async function getData() {
//             const api = 'http://188.166.189.237:3001/api/v1/profile/';

//             await fetch(api + text)
//                 .then((response) => response.json())
//                 .then((responseJson) => {
//                     setDataSource(responseJson.data)
//                     console.log("Search Data", dataSource);
//                 })
//                 .catch((error) => {
//                     console.log("Seach error", error);
//                 })
//         };
//         getData();
//     }, [text]);

//     return (
//         <View style={{
//             marginHorizontal: 5, marginVertical: 10, justifyContent: "center",
//             alignItems: "center",
//         }}>
//             <TextInput
//                 style={{
//                     backgroundColor: colors.textInputBackground,
//                     height: 40,
//                     width: Dimensions.get('screen').width - 10,
//                     fontWeight: 'bold',
//                     borderRadius: 10,
//                     paddingStart: 20,
//                     fontSize: 16,
//                     color: 'white',
//                 }}
//                 onChangeText={(text) => setText(text)}
//                 placeholder="Search"
//                 placeholderTextColor={colors.textFaded2}
//             />
//             {dataSource === undefined ? (
//                 <View>
//                     <Text>
//                         {""}
//                     </Text>
//                 </View>
//             ) : (
//                 <View style={{ flexDirection: "row", margin: 10 }}>
//                     <Image source={{ uri: dataSource.profilePhotoUrl }}
//                         style={{ width: 60, height: 60, borderRadius: 30 }} />
//                     <View style={{ flexDirection: "column", flex: 1, paddingLeft: 10 }}>
//                         <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
//                             {dataSource.name}
//                         </Text>
//                         <Text style={{ color: "grey", fontSize: 15 }}>
//                             {dataSource.username}
//                         </Text>
//                     </View>
//                 </View>
//             )}
//         </View>
//     )
// }

// export default SearchBar;