/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// import V2Component from '../src/components/inputs/index'
	// Vue.use(V2Component)

	new Vue({
	    el: '#app',
	    data: function data() {
	        return {
	            btnDisable: 'no_click',
	            A: 'hello',
	            placeholder: '请输入转出金额',
	            errMsg: '输入格式错误',
	            gtMaxMsg: '输入金额不能大于最大限额',
	            maxAmt: 500,
	            B: '',
	            RT: '',
	            T: false,
	            passwordTest: '',
	            mb: '',
	            Y: 3
	        };
	    },

	    methods: {
	        tg: function tg() {
	            this.T = !this.T;
	        },
	        t9: function t9() {
	            console.log(98989);
	        },
	        amtOK: function amtOK(inputData) {
	            //input is legal
	            //var inputData = this.$refs.amtInput.inputData;
	            console.log('inputData == ' + inputData);
	            console.log('input is legal');
	            if (inputData > this.maxAmt) {
	                this.errMsg = this.errMsgGtMax;
	                //this.$refs.amtInput.errShow = true;
	                this.btnDisable = 'no_click';
	            } else {
	                this.btnDisable = '';
	                this.A = 'hello world';
	            }

	            //todo
	        },
	        amtFail: function amtFail(inputData) {
	            console.log('inputData == ' + inputData);
	            console.log('input is unlegal');
	            this.btnDisable = 'no_click';
	        },
	        submit: function submit() {},
	        r1: function r1() {
	            this.B = '对';
	        },
	        r2: function r2() {
	            this.B = '错';
	        },
	        r3: function r3(value) {
	            console.log('\u5DF2\u9009\u62E9' + value);
	        },
	        openC: function openC() {
	            this.$refs.dateChooser.open();
	        },
	        r9: function r9(a) {
	            console.log(a);
	            this.$refs.dateChooser.close();
	        },
	        w33: function w33(a) {
	            console.log(this.passwordTest = '\u60A8\u8F93\u5165\u7684\u5BC6\u7801\u4E3A' + a);
	        },
	        sendSmsCode: function sendSmsCode() {
	            return new Promise(function (resolve, reject) {
	                setTimeout(function () {
	                    console.log('我自己发了个验证码');
	                    resolve({
	                        resultCode: '1000'
	                    });
	                }, 30);
	            });
	        },
	        c12: function c12() {
	            this.$refs.t01.forEach(function (sd) {
	                sd.close();
	            });
	        },
	        del: function del(s) {
	            this.Y--; //做个样子
	        }
	    },
	    components: {
	        'mine': V2Components.base.extend({
	            methods: {
	                onBlur: function onBlur() {
	                    this.inputData = '我重写了baseInput的失焦事件';
	                }
	            }
	        })
	    }
	});

/***/ }
/******/ ]);