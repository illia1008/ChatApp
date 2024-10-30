import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, renderActions } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from "react-native-maps";
import { v4 as uuidv4 } from 'uuid';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // Destructure the name and backgroundColor values from the route parameters
  const { name, backgroundColor, userId } = route.params;
  // Set up state for the messages using the useState hook
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();


    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedMessages));
    } catch (error) {
      console.error("Error loading cached messages: ", error);
    }
  }
  
  const renderBubble = (props) => {
    return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#A9A9A9"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  )
 }
 
   const renderCustomActions = (props) => {
     return <CustomActions name={name} userId={userId} storage={storage} onSend={onSend} {...props}/>;
   }
 
   const renderCustomView = (props) => {
     const { currentMessage} = props;
     if (currentMessage.location) {
       return (
           <MapView
             style={{width: 150,
               height: 100,
               borderRadius: 13,
               margin: 3}}
             region={{
               latitude: currentMessage.location.latitude,
               longitude: currentMessage.location.longitude,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
             }}
           />
       );
     }
     return null;
   }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#FFF' }]}>
      <GiftedChat
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderActions={renderCustomActions}
        onSend={messages => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{
          _id: userId,
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
