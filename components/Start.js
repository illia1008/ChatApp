import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const colors = ['#FFA726', '#81D4FA', '#FFF59D', '#A5D6A7'];
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container1}>
        <View style={styles.container2}>
          <Text style={styles.title}>Let's Chat</Text>
        </View>
        <View style={styles.container3}>
          <TextInput
            style={[
              styles.textInput,
              { opacity: name ? 1 : 0.5 }
            ]}
            value={name}
            onChangeText={setName}
            placeholder='Your name'
          />
          <View style={styles.chooseColor}>
            <Text>Choose Background color:</Text>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorCircle, { backgroundColor: color, borderWidth: parseFloat(`${color === selectedColor ? 5 : 0}`), borderColor: `${color === selectedColor ? "purple" : ""}` }]}
                  onPress={() => handleColorSelect(color)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: selectedColor })}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 0,
  },

  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  container2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },

  container3: {
    flex: 0.44,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    bottom: 30,
    marginTop: 20,
    marginBottom: 20,
  },

  textInput: {
    height: 50,
    fontSize: 16,
    fontWeight: '600',
    color: '#757083',
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },

  chooseColor: {
    height: 50,
    width: "88%",
    padding: 15,
    marginBottom: 20,
  },

  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#000',
  },

  button: {
    height: 60,
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default Start;