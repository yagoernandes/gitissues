import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList
} from 'react-native'
import api from '../store/api'
import storage from '../store/asyncStorage'


export default function HomeScreen({ navigation }) {
  useEffect(() => {
    getAllRepos()
  }, [])

  const [state, setState] = useState({
    text: '',
    loading: true,
    repos: []
  })

  const addProject = async () => {
    setState(s => ({ ...s, loading: true }))
    const response = await api.addProject(state.text)
    getAllRepos()
  }

  const getAllRepos = async () => {
    try {
      const repos = await storage.get('REPOS')
      if (repos) {
        setState(s => ({ ...s, loading: false, repos, text: '' }))
      } else {
        console.log('Não há repositórios salvos')
        setState(s => ({ ...s, loading: false, repos: [], text: '' }))
      }
    } catch (error) {
      console.log('Erro ao recuperar os repositórios')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TextInput
          placeholder={'Adicionar novo repositório'}
          style={styles.addRepoText}
          value={state.text}
          onChangeText={text => setState(s => ({ ...s, text }))}
        />
        <TouchableOpacity
          style={styles.repoAdd}
          onPress={addProject}
          disabled={state.loading}>
          <Ionicons name='ios-add' size={40} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {state.loading ? (
          <Text style={styles.loadingText}>Carregando</Text>
        ) : (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            {/* {state.repos.map(repo => (
              <Item navigate={navigation.navigate} repo={repo} key={repo.id} />
            ))} */}
            <FlatList
              data={state.repos}
              renderItem={({ item }) => (
                <Item
                  navigate={navigation.navigate}
                  repo={item}
                  key={item.id}
                />
              )}
              keyExtractor={(item, index) => String(item.id)}
              onRefresh={getAllRepos}
              refreshing={state.loading}
            />
          </ScrollView>
        )}
      </View>
    </View>
  )
}

function Item({ navigate, repo }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Issues', repo)
      }}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Image source={{ uri: repo.avatar }} style={styles.image} />
        </View>
        <View style={styles.repoText}>
          <Text style={styles.repoTitle} numberOfLines={1}>
            {repo.name}
          </Text>
          <Text style={styles.repoSubtitle} numberOfLines={1}>
            {repo.login}
          </Text>
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
  loadingText: {
    paddingTop: 15,
    textAlign: 'center'
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
    justifyContent: 'center',
    marginLeft: 10
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
