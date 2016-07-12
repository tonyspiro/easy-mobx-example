import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Input, Button } from 'react-bootstrap'
import config from '../config'
import slug from 'slug'
import S from 'shorti'
import DevTools from 'mobx-react-devtools';

@observer
export default class App extends Component {
  handleInputChange(type, e) {
    this.props.data.form_data[type] = e.target.value
  }
  handleSubmit(e) {
    e.preventDefault()
    const title = this.props.data.form_data.title
    const content = this.props.data.form_data.content
    if (!title)
      return
    const post = {
      slug: slug(title),
      type_slug: 'posts',
      title,
      content
    }
    this.props.data.addPost(post);
  }
  handleRemoveClick(post) {
    this.props.data.removePost(post)
  }
  render() {
    const data = this.props.data
    let posts_area
    if (this.is_loading) {
      posts_area = (
        <div style={ S('text-center font-30 mt-80 mb-80') }>Loading...</div>
      )
    }
    let form_area
    if (data.posts && data.posts.length) {
      posts_area = data.posts.map(post => {
        return (
          <div style={ S('mb-20 bg-efefef p-20 pt-15 pb-30 br-4') } key={ 'id' + post._id }>
            <div onClick={ this.handleRemoveClick.bind(this, post) } className="close">&times;</div>
            <div style={ S('font-20 mt-10 mb-10') }>{ post.title }</div>
            <div style={ S('color-666') }>{ post.content }</div>
          </div>
        )
      })
    }
    let dev_tools
    if (config.env !== 'production')
      dev_tools = <DevTools />
    return (
      <div style={ S('p-20') }>
        <h1 style={ S('mb-20') }>Easy MobX Example</h1>
        <div style={ S('mb-20') }>
          <h3>This example uses:</h3>
          <div><a href="https://mobxjs.github.io/mobx/" target="_blank">MobX</a> for state management</div>
          <div><a href="https://cosmicjs.com/?ref=easy-mobx-example" target="_blank">Cosmic JS</a> as the <a href="https://cosmicjs.com?ref=easy-mobx-example-cms-api" target="_blank">CMS API</a></div>
          <div><a href="https://www.npmjs.com/package/shorti" target="_blank">Shorti</a> for easy inline styling</div>
          <div><iframe style={ S('border-none mt-10') } frameborder="0" src="https://ghbtns.com/github-btn.html?user=tonyspiro&repo=easy-mobx-example&type=star&count=true" scrolling="0" width="160px" height="30px"></iframe></div>
          <h3>Try it out!  Add some posts!</h3>
        </div>
        <div style={ S('mb-20') }>
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <FormGroup bsSize="large">
              <FormControl onChange={ this.handleInputChange.bind(this, 'title')} placeholder="Title" type="text" value={ this.props.data.form_data.title } />
            </FormGroup>
            <FormGroup bsSize="large">
              <FormControl style={ S('h-100') } onChange={ this.handleInputChange.bind(this, 'content')} placeholder="Content" componentClass="textarea" value={ this.props.data.form_data.content }></FormControl>
            </FormGroup>
            <Button bsSize="large" bsStyle="primary" type="submit" className={ data.is_saving ? 'disabled' : '' }>{ data.is_saving ? 'Saving...' : 'Save post' }</Button>
          </form>
        </div>
        { posts_area }
        { dev_tools }
      </div>
    )
  }
}
