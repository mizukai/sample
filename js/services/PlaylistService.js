'use strict';

angular.module('audioVizApp')
  .service('PlaylistService', function ($q) {

    SC.initialize({
      client_id: "cbeb4fe25866e35cb329fa4acc298531",
    });
    var playlist, sound;
    
    var load_playlist = function(id) {
      var deferred = $q.defer();
      SC.get('/playlists/'+id, function(set) {
        playlist = set;
        deferred.resolve(playlist);
      });
      return deferred.promise;
    };

    var play_song = function(track_index) {
      var deferred = $q.defer();
      var id = playlist.tracks[track_index].id;
      SC.stream("/tracks/"+id, { useEQData: true }, function(_sound) {
        sound = _sound;
        sound.play();
        deferred.resolve(sound);
      });
      return deferred.promise;
    };

    var stop_current = function() {
      sound.stop();
      sound = null;
    };

    var service = {
      load: load_playlist,
      playlist: function() { return playlist; },
      tracks: function() { return playlist.tracks; },
      play: play_song,
      stop: stop_current,
      sound: function() { return sound; }
    };

    return service;
  });