import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  LogBox,
  Platform
} from "react-native";
import data from "../data.json";
import Card from "../components/Cards";
import Loading from "../components/Loding";
import {StatusBar} from 'expo-status-bar'
import * as Location from 'expo-location'
import axios from "axios";
import {firebase_db} from "../firebaseConfig"
// const main =
//   "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Fmain.png?alt=media&token=8e5eb78d-19ee-4359-9209-347d125b322c";
export default function MainPage({navigation, route}) {
  //return 구문 밖에서는 슬래시 두개 방식으로 주석
  LogBox.ignoreLogs(['Warning: ...'])
  LogBox.ignoreLogs(['Setting a timer']);
  const [state, setState] = useState([]); //전체데이터
  const [cateState, setCateState] = useState([]);
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })
  const [ready, setReady] = useState(true);
  // useEffect(()=>{
  //   navigation.setOptions({
  //     title:'나만의 꿀팁'
  //   })  
	// 	//뒤의 1000 숫자는 1초를 뜻함
  //   //1초 뒤에 실행되는 코드들이 담겨 있는 함수
  //   setTimeout(()=>{
  //       firebase_db.ref('/tip').once('value').then((snapshot) => {
  //         console.log("파이어베이스에서 데이터 가져왔습니다!!")
  //         let tip = snapshot.val();
          
  //         setState(tip)
  //         setCateState(tip)
  //         getLocation()
  //         setReady(false)
  //       });
  //       // getLocation()
  //       // setState(data.tip)
  //       // setCateState(data.tip)
  //       // setReady(false)
  //   },1000)
 
    
  // },[])

  const random= () => {
    let min = 0
    let max = 9
    const rn =  Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`랜덤 뽑기 수 : ${rn}`)
    return rn
  }
  const [main, setMain] = useState()
  useEffect(()=>{
        //헤더의 타이틀 변경
          navigation.setOptions({
              title:'나만의 꿀팁'
          })
          firebase_db.ref('/tip').once('value').then((snapshot) => {
            // console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            // console.log(tip[random()].idx)  
            setMain(tip[random()].image)
            setState(tip)
            setCateState(tip)
            getLocation()
            setReady(false)
            console.log("save")
          });
          // setTimeout(()=>{
          //     let tip = data.tip;
          //     setState(tip)
          //     setCateState(tip)
          //     getLocation()
          //     setReady(true)
          // },1000)
  
      },[])


  const getLocation = async () => {
    //수많은 로직중에 에러가 발생하면
    //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
    try {
      //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      await Location.requestForegroundPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData.coords.latitude
      const longitude = locationData.coords.longitude
      const  API_KEY = '62a3e1c15a974cb7212dd251dddb4fa7'
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      )

      const weather = result.data.current.weather[0].main
      const temp = result.data.current.temp
      // console.log(`날씨 : ${weather} , 온도 : ${temp}`)
      setWeather({temp ,weather})


        
    } catch (error) {
      //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  }


  const category = (cate) => {
    if (cate == "전체보기") {
      //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
      setCateState(state);
    } else {
      setCateState(
        state.filter((d) => {
          return d.category == cate;
        })
      );
    }
  };
  // let tip = data.tip; // useState 사용 전 이걸로 데이터 불러옴.
  // let tip = state.tip
  // let todayWeather = getLocation.weather;
  // let todayCondition = getLocation.temp;

  return ready ? (
    <Loading />
  ) : (
    /*
      return 구문 안에서는 {슬래시 + * 방식으로 주석
    */

    <ScrollView style={styles.container}>
      <StatusBar style="light"/>
      <Text style={styles.weather}>
        오늘의 날씨: {weather.temp + "°C " + weather.weather}{" "}
      </Text>
      <TouchableOpacity style = {styles.About_Btn} onPress={()=>navigation.navigate("AboutPage")}><Text style={{color:'white', fontWeight:'bold'}}>소개 페이지</Text></TouchableOpacity>
      <Image style={styles.mainImage} source={{ uri: main }} />
      <ScrollView
        style={styles.middleContainer}
        horizontal
        indicatorStyle={"white"}
      >
        <TouchableOpacity
          style={styles.middleButtonAll}
          onPress={() => {
            category("전체보기");
          }}
        >
          <Text style={styles.middleButtonTextAll}>전체보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            category("생활");
          }}
        >
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton02}
          onPress={() => {
            category("재테크");
          }}
        >
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton03}
          onPress={() => {
            category("반려견");
          }}
        >
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton04}
          onPress={() => {
            // category("꿀팁 찜");
            navigation.navigate("LikePage")
          }}
        >
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */}
        {cateState.map((content, i) => {
          return <Card content={content} key={i} navigation={navigation} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#fff",
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: "700",
    //위 공간으로 부터 이격
    marginTop: 50,
    //왼쪽 공간으로 부터 이격'
    marginLeft: 20,
  },
  weather: {
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingBottom : 10,
  },
  About_Btn:{
    
    backgroundColor : 'pink',
    width : '30%',
    alignItems :'center',
    padding  : '2%',
    borderRadius : 20,
    alignSelf :'flex-end',
    marginRight : 20
    
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width: "90%",
    //컨텐츠의 높이 값
    height: 200,
    //컨텐츠의 모서리 구부리기
    borderRadius: 10,
    marginTop: 20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf: "center",
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#20b2aa",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7,
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7,
  },
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  card: {
    flex: 1,
    //컨텐츠들을 가로로 나열
    //세로로 나열은 column <- 디폴트 값임
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDesc: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
  },
});
