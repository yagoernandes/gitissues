import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert
} from 'react-native'

import { MonoText } from '../components/StyledText'

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput
          placeholder={'Adicionar novo repositório'}
          style={styles.addRepoText}
        />
        <TouchableOpacity style={styles.repoAdd}>
          <Ionicons name='ios-add' size={40} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Item navigate={navigation.navigate} />
        </ScrollView>
      </View>
    </View>
  )
}

function Item({navigate}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Issues', {
          name:'teste',
          itemId: 86,
          otherParam: 'anything you want here'
        })
      }}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.image}
          />
        </View>
        <View style={styles.repoText}>
          <Text style={styles.repoTitle}>rocketnative</Text>
          <Text style={styles.repoSubtitle}>RocketSeat</Text>
        </View>
        <View style={styles.itemIcon}>
          <Ionicons name='ios-arrow-forward' size={32} color='#CCC' />
        </View>
      </View>
    </TouchableOpacity>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/workflow/development-mode/'
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  top: {
    paddingVertical: 15,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  addRepoText: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  repoAdd: {
    marginLeft: 15
  },
  list: {
    flex: 1
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  contentContainer: {
    paddingTop: 15,
    marginHorizontal: 20
  },
  repoText: {
    flex: 1,
    justifyContent: 'center'
  },
  repoTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 3
  },
  repoSubtitle: {
    color: '#CCC',
    fontSize: 14
  },
  itemIcon: {
    paddingRight: 10,
    justifyContent: 'center'
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})
