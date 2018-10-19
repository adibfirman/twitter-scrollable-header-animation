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

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ ...styles.header, height: headerHeight }} />
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }]
          )}
        >
          <View style={styles.containerImgProfile}>
            <Image
              source={{ uri: IMAGE_URL }}
              style={styles.imgProfile}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.profileName}>Adib Firman</Text>
          </View>
          <View style={{ height: 3000 }} />
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
    height: MAX_HEADER_HEIGHT
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
