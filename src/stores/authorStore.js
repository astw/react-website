"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change'

// make the authorStore extent EventEmitter
var AuthorStore = assign({}, EventEmitter.prototype, {
   addChangeListener:function(callback){
     this.on(CHANGE_EVENT, callback);    // any time store get changed, call callback
   },

   removeChangeListener:funciotn(callback){
     this.removeChangeListener(CHANGE_EVENT, callback);
   },

   emitChange:funciotn(){
     this.emit(CHANGE_EVENT);
   }
});
