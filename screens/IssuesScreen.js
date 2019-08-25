import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'
import api from '../store/api'
import storage from '../store/asyncStorage'

export default function IssuesScreen({
  navigation: {
    state: {
      params: { login, name }
    },
    setParams
  }
}) {
  const [state, setState] = useState({
    filter: 'all',
    issues: [],
    loading: true
  })

  useEffect(() => {
    setParams({ title: name })
  }, [])

  useEffect(() => {
    getIssues()
  }, [state.filter])

  const getIssues = async () => {
    setState(s => ({ ...s, loading: true }))
    const issues = await api.getIssues(login, name, state.filter)
    setState(s => ({ ...s, loading: false, issues }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            setState(s => ({ ...s, filter: 'all' }))
          }}>
          <Text
            style={
              state.filter === 'all'
                ? styles.topBarTextSelected
                : styles.topBarText
            }>
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState(s => ({ ...s, filter: 'open' }))
          }}>
          <Text
            style={
              state.filter === 'open'
                ? styles.topBarTextSelected
                : styles.topBarText
            }>
            Abertas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState(s => ({ ...s, filter: 'closed' }))
          }}>
          <Text
            style={
              state.filter === 'closed'
                ? styles.topBarTextSelected
                : styles.topBarText
            }>
            Fechadas
          </Text>
        </TouchableOpacity>
      </View>
      {state.loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <ScrollView style={styles.list}>
          {/* {state.issues.map(issue => (
            <Issue issue={issue} key={issue.id} />
          ))} */}
          <FlatList
            data={state.issues}
            renderItem={({ item }) => <Issue issue={item} key={item.id} />}
            onRefresh={getIssues}
            keyExtractor={(item, index) => String(item.id)}
            refreshing={state.loading}
          />
        </ScrollView>
      )}
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
        WebBrowser.openBrowserAsync(issue.html_url)
      }}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Image source={{ uri: issue.user.avatar_url }} style={styles.image} />
        </View>
        <View style={styles.repoText}>
          <Text style={styles.repoTitle} numberOfLines={1}>
            {issue.title}
          </Text>
          <Text style={styles.repoSubtitle} numberOfLines={1}>
            {issue.user.login}
          </Text>
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
  loadingText: {
    paddingTop: 15,
    textAlign: 'center'
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
    justifyContent: 'center',
    marginLeft: 10
  }
})
