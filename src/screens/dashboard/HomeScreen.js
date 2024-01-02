import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import data from '../../utils/data/index';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === 'android' ? 40 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#00CED1',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: 'white',
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}>
            <AntDesign
              style={{paddingLeft: 10}}
              name="search1"
              size={22}
              color="black"
            />
            <TextInput placeholder="Search Amazon.in" />
          </Pressable>

          <Feather name="mic" size={24} color="black" />
        </View>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            padding: 10,
            backgroundColor: '#AFEEEE',
          }}>
          <Ionicons name="location-outline" size={24} color="black" />

          <Pressable>
            <Text style={{fontSize: 13, fontWeight: '500', color: 'black'}}>
              Add a Address
            </Text>
            {/* {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )} */}
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.list?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 50, height: 50, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 5,
                  color: 'black',
                }}>
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            padding: 10,
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Trending Deals of the week
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {data?.deals?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('Info', {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 180, height: 180, resizeMode: 'contain'}}
                source={{uri: item?.image}}
              />
            </Pressable>
          ))}
        </View>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />
        <Text
          style={{
            padding: 10,
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.offers?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('Info', {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 150, height: 150, resizeMode: 'contain'}}
                source={{uri: item?.image}}
              />

              <View
                style={{
                  backgroundColor: '#E31837',
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
