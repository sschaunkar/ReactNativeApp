import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";

const Message = (props) => {

  const [hideAlert, setHideAlert] = useState(true);

   
    return (
        <View style={styles.container}>
         { hideAlert && Alert.alert(
      props.msgtitle,
      props.msgbody,
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "OK", onPress: () => console.log("Button clicked on alert")}
      ]
    )}
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default Message;