import { observable } from 'mobx'
import { getObjects } from 'cosmicjs'
import config from '../config'

export default class AppState {
  @observable posts = []
  @observable form_data = {}
  @observable is_loading = true
  @observable is_saving = false
  addPost(post) {
    this.posts.unshift(post)
  }
  removePost(post_id) {
    this.posts = this.posts.filter(post => {
      return post._id !== post_id
    })
  }
  constructor() {
    getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
      if (res.objects.type.posts) {
        this.posts = res.objects.type.posts
        this.is_loading = false
      }
    })
  }
}
