# mobilon-vpbx-api.js
Mobilon VPBX API

## Demo

[mobilon-vpbx-api.js demo](https://antirek.github.io/mobilon-demo/callapi.html)


## Usage

### Init

`````javascript

var api = new MobilonVPBXApi(key);

`````


### Subscribe

`````javascript

api.subscribe(function (event) {
    console.log(event);
});

`````


### Call

`````javascript

api.call(number)
.then(function(data){
    console.log('data',data);
})
.catch(function(error){
  $number.val('');
});

`````