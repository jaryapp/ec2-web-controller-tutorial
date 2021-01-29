# ec2-web-controller-tutorial
AWS API를 활용하여 ec2를 관리하는 웹사이트 튜토리얼 버전

# quick start
```
$ git clone https://github.com/jaryapp/ec2-web-controller-tutorial.git
$ cd ec2-web-controller-tutorial
$ cd Project
$ cd ec2-controller
$ npm install
```
make file config.json
```
{
 "accessKeyId": "<YOUR_ACCESS_KEY_ID>",
 "secretAccessKey": "<YOUR_SECRET_ACCESS_KEY>",
 "region": "us-east-1"
}
```
```
$ cd ..
$ cd ec2-web
$ npm install
$ npm start
access localhost:3000, localhost:3000/create, localhost:3000/region, localhost:3000/zone
```
