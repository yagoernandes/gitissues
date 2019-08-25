import axios from 'axios'
import storage from './asyncStorage'

const addProject = adress => {
  if (!adress.includes('/')) {
    return { error: true, errorMessage: 'Não contém barra' }
  }
  axios.get(`http://api.github.com/repos/${adress}`).then(async response => {
    if (response.data && response.data.id) {
      //Adicionar novo repositorio
      const tempRepoList = await storage.get('REPOS')
      tempRepoList.push({
        id: response.data.id,
        name: response.data.name,
        login: response.data.owner.login,
        avatar: response.data.owner.avatar_url
      })
      //Salvar lista de repositórios
      await storage.set('REPOS', tempRepoList)
      // getAllRepos()
    }
  })
}

const getIssues = async (login, name, filter) => {
  // setState(s => ({ ...s, loading: true }))
  const response = await axios.get(
    `https://api.github.com/repos/${login}/${name}/issues?state=${filter}`
  )
  // console.log(response.data)
  return response.data
}

export default {
  addProject,
  getIssues
}
