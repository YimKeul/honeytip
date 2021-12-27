import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, Platform } from "react-native";
import LikeCard from "../components/LikeCard";
import Loading from "../components/Loding";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

const isIOS = Platform.OS === "ios";

export default function LikePage({ navigation, route }) {
  const [tip, setTip] = useState([]);

  const [ready, setReady] = useState(true);

  const getLike = async () => {
    let userUniquedId;
    if (isIOS) {
      let isIOS = await Application.getIosIdForVendorAsync();
      userUniquedId = isIOS;
    } else {
      userUniquedId = await Application.androidId;
    }
    firebase_db
      .ref('/like/'+userUniquedId)
      .once("value")
      .then((snapshot) => {
        // console.log(
        //   "파이어베이스에서 데이터 가져왔습니다!! 지금은 likepage입니다."
        // );
        let tip = snapshot.val();
        if (tip && tip.length > 0) {
          setTip(tip);
          setReady(false);
        }
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: "꿀팁 찜",
    });
    getLike();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {tip.map((content, i) => {
        return <LikeCard key={i} content={content} navigation={navigation} tip={tip} setTip={setTip}/>;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
