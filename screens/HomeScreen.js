import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

// import { MonoText } from '../components/StyledText'

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    getAllRepos()
  }, [])
  const [state, setState] = useState({
    text: '',
    loading: true,
    repos: []
  })
  const addProject = () => {
    axios
      .get(`http://api.github.com/repos/${state.text}`)
      .then(async response => {
        if (response.data && response.data.id) {
          // console.log('Resposta: ', response.data)
          console.log('ID: ', response.data.id)
          console.log('Nome: ', response.data.name)
          console.log('Organização: ', response.data.owner.login)
          console.log('Avatar: ', response.data.owner.avatar_url)
          //Adicionar novo repositorio
          const tempRepoList = state.repos
          tempRepoList.push({
            id: response.data.id,
            name: response.data.name,
            login: response.data.owner.login,
            avatar: response.data.owner.avatar_url
          })
          //Salvar lista de repositórios
          try {
            await AsyncStorage.setItem('REPOS', JSON.stringify(tempRepoList))
            getAllRepos()
          } catch (error) {
            console.log('Error saving data: ', error)
          }
          //
        }
      })
  }
  const getAllRepos = async () => {
    // ! Colocar em função separada
    try {
      const repos = JSON.parse(await AsyncStorage.getItem('REPOS'))
      if (repos !== null) {
        setState(s => ({ ...s, loading: false, repos, text: '' }))
        console.log(repos)
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
        <TouchableOpacity style={styles.repoAdd} onPress={addProject}>
          <Ionicons name='ios-add' size={40} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {state.repos.map(repo => (
            <Item navigate={navigation.navigate} repo={repo} key={repo.id} />
          ))}
        </ScrollView>
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
          <Text style={styles.repoTitle}>{repo.name}</Text>
          <Text style={styles.repoSubtitle}>{repo.login}</Text>
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
