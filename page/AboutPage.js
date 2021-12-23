import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Linking,
} from "react-native";

export default function AboutPage() {
  const _URL =
    "https://storage.googleapis.com/sparta-image.appspot.com/lecture/about.png";

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="light-content" />
      <View style = {styles.Upper_text}>
        <Text style = {{color : 'white' , fontWeight : 'bold' , fontSize : 30 , textAlign :'center'}}>
          HI! 스파르타코딩 앱개발 반에 오신것을 환영합니다
        </Text>
      </View>
      <View style={styles.Inner_Container}>
        <View style={styles.img_container}>
          <Image style={styles.images} source={{ uri: _URL }} />
        </View>

        <View style={styles.text}>
          <Text
            style={{
              color: "black",
              fontSize: 25,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            많은 내용을 간결하게 담아내려 노력했습니다!
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 17,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            꼭 완주 하셔서 꼭 여러분것으로 만들어가시길 바랍니다
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#f3b13e",
              padding: 20,
              borderRadius: 15,
            }}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/leesejun__/")
            }
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              여러분의 인스타계정
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#262c74",
  },
  Upper_text:{
    justifyContent : 'center',
    alignItems : 'center',
    marginHorizontal : '7%',
    marginTop : "10%",
  },

  Inner_Container: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "10%",
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  img_container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  images: {
    width: "55%",
    height: "80%",
    borderRadius: 40,
  },

  text: {
    flex: 1.5,
    height : '100%',
    marginTop: "2%",
    alignItems: "center",
    justifyContent:'space-evenly',
    paddingHorizontal: "5%",
    paddingBottom : '10%',
    borderRadius: 30,

  },
});

