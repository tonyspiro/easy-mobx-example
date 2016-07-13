import { observable } from 'mobx'
import { getObjects, addObject, deleteObject } from 'cosmicjs'
import config from '../config'

export default class AppState {
  @observable posts = []
  @observable form_data = {}
  @observable is_loading = true
  @observable is_saving = false
  addPost(object) {
    this.is_saving = true;
    addObject({ bucket: config.cosmicjs.bucket }, object, (err, res) => {
      this.is_saving = false
      this.posts.unshift(res.object)
      this.form_data = {
        title: '',
        content: ''
      }
    })
  }
  removePost(post) {
    deleteObject({ bucket: config.cosmicjs.bucket }, { slug: post.slug }, (err, res) => {
      this.posts = this.posts.filter(apost => {
        return apost._id !== post._id
      })
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
