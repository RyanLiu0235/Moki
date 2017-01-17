export default [
  {
    path: '/',
    name: 'index-page',
    component: require('components/index')
  },
  {
    path: '*',
    redirect: '/'
  }
]
