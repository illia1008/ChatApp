import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // Destructure the name and backgroundColor values from the route parameters
  const { name, backgroundColor } = route.params;
  // Set up state for the messages using the useState hook
  const [messages, setMessages] = useState([]);
  // Function to handle sending new messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // useEffect hook to perform actions when the component mounts
  useEffect(() => {
    navigation.setOptions({ title: name });
    // Initialize the messages state with an array of sample messages
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-OwzXUqF0m_NO2OEDVmm0f6o95xDVugByw&s',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // const renderBubble = (props) => {
  //   return <Bubble
  //     {...props}
  //     wrapperStyle={{
  //       right: {
  //         backgroundColor: "#000"
  //       },
  //       left: {
  //         backgroundColor: "#FFF"
  //       }
  //     }}
  //   />
  // }


  return (
    // Main container view with the background color set from the route parameter or defaulting to white
    <View style={[styles.container, { backgroundColor: backgroundColor || '#FFF' }]}>
      <GiftedChat
        messages={messages}
        // renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
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
