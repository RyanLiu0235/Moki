# Moki

> A simple weather app for macOS only

## Usage

this widget replys on the data of [Heweather](http://docs.heweather.com/224291), please get your own *key* and create a json file named `key.json` at `./app/src/`, it contains a key named `key` and a related value which is your own *key*.

*Heweather api is only free of charge for Chinese city.*

``` javascript
{
	"key": "2c1d4a776d474a939sdc096d622d9c19"
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# run webpack in production
npm run pack
```