import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/User/userSlice";  
import { deleteSession } from "../SQLite";

const Header = ({ route, navigation }) => {
    let title;
    if (route.name === "Home") title = "Bonsai Ecommerce";
    else if (route.name === "ItemListCategory") title = route.params.category;
    else if (route.name === "ItemDetail") title = route.params.item.title;
    else title = route.name;

    const dispatch = useDispatch();
    const { email, localId } = useSelector((state) => state.userReducer.value);

    const onSignout = async () => {
        try{
            
            console.log("deleting session...")
            const response = await deleteSession(localId)
            dispatch(signOut())
            console.log("session deleted:")
            console.log(response)
        }
        catch(error){
            console.log("Error mientras sign out")
            console.log(error.message)
        }
    }

    return (
        <View style={styles.containerHeader}>
            <Text style={styles.text}>{title}</Text>
            {navigation.canGoBack() ? (
                <Pressable
                    style={styles.pressable}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="back" size={24} color="black" />
                </Pressable>
            ) : null}
            {email ? (
                <Pressable
                    style={styles.signOut}
                    onPress={onSignout}
                >
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </Pressable>
            ) : null}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: colors.peach,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        position: "relative",
    },
    text: {
        fontSize: 25,
        // fontFamily: "Ubuntu",
    },
    pressable: {
        position: "absolute",
        right: 30,
        top: "50%",
    },
    signOut: {
        position: "absolute",
        left: 30,
        top: "50%",
    },
});
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { colors } from '../Global/Colors'
// import { AntDesign } from "@expo/vector-icons";

// const Header =  ({ route, navigation })=> {
//   let title
//   if (route.name === 'Home') title = 'Home'
//   if (route.name == 'ItemListCategory') title = route.params.category
//   else if (route.name == 'ItemDetail') title = route.params.title
//   else title = route.name
//   return (
//       <View style={styles.containerHeader}>
//           <Text style={styles.text}>{title}</Text>
//           {route.name !== "Home" ? (
//               <Pressable
//                   style={styles.pressable}
//                   onPress={() => navigation.goBack()}
//               >
//                   <AntDesign name="back" size={24} color="black" />
//               </Pressable>
//           ) : null}
//       </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   containerHeader: {
//       backgroundColor: colors.peach,
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingVertical: 25,
//       position: "relative",
//   },
//   text: {
//       fontSize: 25,
//       fontFamily: "Josefin",
//   },
//   pressable: {
//       position: "absolute",
//       right: 30,
//       top: "50%",
//   },
// });