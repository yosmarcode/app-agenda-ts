import { URL_API, headers } from './Config'

export const webApiService = {
  getList: async () => {
    const urlApi = URL_API + 'dataUser'
    const response = await fetch(urlApi, { method: 'GET', headers })
    return await response.json()
  },
  getUserId: async (id: number | string) => {
    const urlApi = URL_API + 'dataUser/' + id
    const response = await fetch(urlApi, { method: 'GET', headers })
    return await response.json()
  },

  getUserBySearch: async (q: string) => {
    const urlApi = URL_API + 'dataUser?q=' + q
    const response = await fetch(urlApi, { method: 'GET', headers })
    return await response.json()
  }
}
