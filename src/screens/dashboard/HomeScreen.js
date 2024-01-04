import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import data from '../../utils/data/index';
import Swiper from 'react-native-swiper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../../components/ProductItem';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/CartReducer';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';

const HomeScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  const [category, setCategory] = useState('jewelery');

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('error message', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
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

          <Swiper
            autoplay={true}
            autoplayTimeout={3}
            style={{height: 200}} // Set the height of the swiper component
            loop={true} // Enable infinite loop
          >
            {data?.images?.map((item, index) => (
              <View key={index}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item}}
                />
              </View>
            ))}
          </Swiper>

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

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 50 : 15,
            }}>
            <DropDownPicker
              style={{
                borderColor: '#B7B7B7',
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {products
              ?.filter(item => item?.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 400}}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
              Choose your Location
            </Text>

            <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              // onPress={() => setSelectedAdress(item)}
              style={{
                width: 140,
                height: 140,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                marginRight: 15,
                marginTop: 10,
                // backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066b2',
                  fontWeight: 500,
                }}>
                Add an Address or pickup point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{flexDirection: 'column', gap: 7, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Enter an Indian pincode
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Use My Currect location
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name="earth" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
