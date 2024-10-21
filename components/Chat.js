import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";


const Chat = ({ route, navigation, db }) => {
  // Destructure the name and backgroundColor values from the route parameters
  const { name, backgroundColor, userId } = route.params;
  // Set up state for the messages using the useState hook
  const [messages, setMessages] = useState([]);
  
  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

  // useEffect hook to perform actions when the component mounts
  useEffect(() => {
    // Set the navigation title based on the user's name
    navigation.setOptions({ title: name });

    // Reference the messages collection and set up a query to order by createdAt in descending order
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    // Set up the onSnapshot listener
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });

      setMessages(fetchedMessages);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || '#FFF' }]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
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
