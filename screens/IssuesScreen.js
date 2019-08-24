import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'


export default function IssuesScreen({
  navigation: {
    state: {
      params: { avatar, id, login, name }
    }
  }
}) {
  const [state, setState] = useState({
    filter: 'all',
    issues: []
  })

  useEffect(() => {
    axios
      .get(
        `http://api.github.com/repos/${name}/${login}/issues?state=${state.filter}`
      )
      .then(response => {
        if (response.data && response.data.id) {
          console.log('Resposta: ', response.data)
          // console.log('ID: ', response.data.id)
          // console.log('Título: ', response.data.title)
          // console.log('Usuário: ', response.data.user.login)
          // console.log('Avatar: ', response.data.user.avatar_url)

          setState(s => ({ ...s, issues: response.data }))
        }
      })
  }, [state.filter])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={()=>{setState(s=>({...s, filter:'all'}))}}>
          <Text style={styles.topBarTextSelected}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setState(s=>({...s, filter:'open'}))}}>
          <Text style={styles.topBarText}>Abertas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setState(s=>({...s, filter:'closed'}))}}>
          <Text style={styles.topBarText}>Fechadas</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {state.issues.map(issue => (
          <Issue issue={issue} />
        ))}
      </ScrollView>
    </View>
  )
}

IssuesScreen.navigationOptions = {
  header: null
}

function Issue({ issue }) {
  return (
    <TouchableOpacity
      onPress={() => {
        WebBrowser.openBrowserAsync(issue.url)
      }}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Image source={{ uri: issue.user.avatar_url }} style={styles.image} />
        </View>
        <View style={styles.repoText}>
          <Text style={styles.repoTitle}>{issue.title}</Text>
          <Text style={styles.repoSubtitle}>{issue.user.login}</Text>
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 15
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
  }
})
