Easy MobX Example
=====================
This is an easy MobX example that uses [React](https://facebook.github.io/react) for UI, [MobX](https://mobxjs.github.io/mobx) for state management, [Cosmic JS](https://cosmicjs.com) for the [CMS API](https://cosmicjs.com) and [Shorti](https://www.npmjs.com/package/shorti) for easy inline styles.  View the [demo here](http://easy-mobx-example.cosmicapp.co/).

Supports ES6 and JSX compilation through babel.

Check out the companion blog article to this repo here:<br />
[Getting Started With MobX: An Easy Example](https://tonyspiro.com/getting-started-with-mobx-an-easy-example)

###Getting started
```
git clone https://github.com/tonyspiro/easy-mobx-example
cd easy-mobx-example
npm install
```
#####Run development with hot reloading

```
npm run development
open http://localhost:3000
```
#####Run production
```
npm start
open http://localhost:3000
```
###CMS API
By default the posts are connected to the Cosmic JS bucket `easy-mobx-example`.  [Sign up for Cosmic JS](https://cosmicjs.com) to add your own bucket, and edit the `config.js` file to point to your bucket.
