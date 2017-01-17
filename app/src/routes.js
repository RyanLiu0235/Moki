export default [{
  path: '/',
  name: 'index-page',
  component: (resolve) => require(['./components/index/index'], resolve)
}, {
	path: '/city',
	name: 'city-page',
	component: (resolve) => require(['./components/city/index'], resolve)
}, {
  path: '*',
  redirect: '/'
}]
