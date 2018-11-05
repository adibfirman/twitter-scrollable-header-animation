import React, { PureComponent } from 'react'
import {
  StyleSheet, Image, View, ScrollView,
  Text, Animated
} from 'react-native'

const MAX_HEADER_HEIGHT = 120
const MIN_HEADER_HEIGHT = 60
const MAX_HEIGHT_PROFILE_IMAGE = 80
const MIN_HEIGHT_PROFILE_IAMGE = 40
const IMAGE_URL = 'https://themes.gohugo.io//theme/hugo-geo//img/profile.png'
export default class App extends PureComponent {

  state = {
    scrollY: new Animated.Value(0)
  }

  render() {
    const { scrollY } = this.state
    const headerHeight = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
      extrapolate: 'clamp'
    })
    const imageHeight = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [MAX_HEIGHT_PROFILE_IMAGE, MIN_HEIGHT_PROFILE_IAMGE],
      extrapolate: 'clamp'
    })
    const marginTopImage = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [MAX_HEADER_HEIGHT - (MAX_HEIGHT_PROFILE_IMAGE / 2), MAX_HEADER_HEIGHT + 5],
      extrapolate: 'clamp'
    })
    const headerZindez = scrollY.interpolate({
      inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
    const headerTitleBottom = scrollY.interpolate({
      inputRange: [
        0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT + 5 + MIN_HEIGHT_PROFILE_IAMGE,
        MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT + 5 + MIN_HEIGHT_PROFILE_IAMGE + 40
      ],
      outputRange: [-20, -20, -20, 15],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.header, { height: headerHeight, zIndex: headerZindez }]}>
          <Animated.View style={{ position: 'absolute', bottom: headerTitleBottom }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>Adib Firman</Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }]
          )}
        >
          <Animated.View style={[styles.containerImgProfile, { height: imageHeight, width: imageHeight, marginTop: marginTopImage }]}>
            <Image
              source={{ uri: IMAGE_URL }}
              style={styles.imgProfile}
            />
          </Animated.View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.profileName}>Adib Firman</Text>
          </View>
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightskyblue',
    height: MAX_HEADER_HEIGHT,
    alignItems: 'center'
  },
  containerImgProfile: {
    height: MAX_HEIGHT_PROFILE_IMAGE,
    width: MAX_HEIGHT_PROFILE_IMAGE,
    borderRadius: MAX_HEIGHT_PROFILE_IMAGE / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: MAX_HEADER_HEIGHT - (MAX_HEIGHT_PROFILE_IMAGE / 2),
    marginLeft: 10,
    backgroundColor: '#E0E0E0'
  },
  imgProfile: {
    flex: 1,
    height: null,
    width: null
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
