import { get, post, put } from './lib/fetch'
import { Session, UserAttributes } from './lib/types'

export default class Api {
  url: string
  headers: {
    [key: string]: string
  }

  constructor({ url = '', headers = {} }: any) {
    this.url = url
    this.headers = headers
  }

  /**
   * Creates a new user using their email address.
   */
  async signUpWithEmail(email: string, password: string) {
    try {
      let data: any = await post(
        `${this.url}/signup`,
        { email, password },
        { headers: this.headers }
      )
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      let data: any = await post(
        `${this.url}/token?grant_type=password`,
        { email, password },
        { headers: this.headers }
      )
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async resetPasswordForEmail(email: string) {
    try {
      let data: any = await post(`${this.url}/forgotPassword`, { email }, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async signOut(jwt: string) {
    try {
      let headers = { ...this.headers }
      headers['Authorization'] = `Bearer ${jwt}`
      console.log('headers', headers)
      let data = await post(`${this.url}/logout`, {}, { headers, noResolveJson: true })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async getUser(jwt: string) {
    try {
      let headers = { ...this.headers }
      headers['Authorization'] = `Bearer ${jwt}`
      let data: any = await get(`${this.url}/user`, { headers })
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async updateUser(jwt: string, attributes: UserAttributes) {
    try {
      let headers = { ...this.headers }
      headers['Authorization'] = `Bearer ${jwt}`
      let data: any = await put(`${this.url}/user`, attributes, { headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      let data: any = await post(
        `${this.url}/token?grant_type=refresh_token`,
        { refresh_token: refreshToken },
        { headers: this.headers }
      )
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.toString() }
    }
  }
}