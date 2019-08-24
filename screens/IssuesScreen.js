import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function IssuesScreen({ navigation }) {
  console.log('Titulo: ', navigation.state.params.name)
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.topBarTextSelected}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.topBarText}>Abertas</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.topBarText}>Fechadas</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        <Issue navigate={navigation.navigate} />
      </ScrollView>
    </View>
  )
}

IssuesScreen.navigationOptions = {
  header: null
}

function Issue({ navigate }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Issues', {
          name: 'teste',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  list: {
    paddingTop: 15
  },
  topBar: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  topBarText: {
    color: '#AAA'
  },
  topBarTextSelected: {
    color: '#666',
    fontWeight: '700'
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
    borderRadius: 100
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
})
