/* eslint-disable no-unused-vars, no-console, no-undef*/
(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      //cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var url = this.serverUrl;
    $.ajax(this.serverUrl, {
      contentType: "application/javascript",
      type: "GET",
      success: function(serverResponse) {
        serverResponse.forEach(function(data) {
          console.log(data.id);
          if (data.emailAddress === key) {
            try {
              $.ajax(url + "/" + data.id, {
                type: "DELETE",
                success: console.log("Coffee delivered.")
              });
            } catch (e) {
              console.log("Coffee delivery failed.");
            }
          }
        });
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);