import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default function DetailsScreen({route}) {
  const {task} = route.params;
  const images = task.images;
  return (
    <SafeAreaView>
      <View style={style.btncontainer}>
        <Text>Task Name: {task.name}</Text>
      </View>
      <View style={style.btncontainer}>
        <Text>Description: {task.description}</Text>
      </View>
      <View>
        <Text style={style.text}>All Images</Text>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // ✅ 3 images per row
          renderItem={({item}) => (
            <Image source={{uri: item}} style={style.img} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  btncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: '5%'},
  img: {
    width: 100,
    height: 100,
    marginLeft: '5%',
    borderRadius: 10,
    marginTop: '5%',
  },
});
