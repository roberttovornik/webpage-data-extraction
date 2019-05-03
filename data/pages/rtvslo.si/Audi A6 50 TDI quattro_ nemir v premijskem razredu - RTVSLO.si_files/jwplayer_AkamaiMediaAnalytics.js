/*
 * jwplayer_AkamaiMediaAnalytics.js
 * Version - 2.1
 *
 * This file is part of the Media Analytics, http://www.akamai.com
 * Media Analytics is a proprietary Akamai software that you may use and modify per the license agreement here:
 * http://www.akamai.com/product/licenses/mediaanalytics.html
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *
 *
 * Created by Vishvesh on 29th May 2017.
 *
 */

function jwplayer_AkamaiMediaAnalytics(configXML)
{
  /**
   * @member loaderVersion
   * @desc The version of the JW Player Loader
   */
  var loaderVersion = "2.1.12";

  /**
   * @member loaderName
   * @desc The name of the Loader
   */
  var loaderName = "JWPlayerLoader";

  /**
   * @member mediaAnalyticsLibrary
   * @desc The instance of Media Analytics Library
   */
  var mediaAnalyticsLibrary = null;

  /**
   * @member isFirstQuartile
   * @desc Bool flag to indicate if 25% of AD is played
   */
  var isFirstQuartile = false;

  /**
   * @member isMidPoint
   * @desc Bool flag to indicate if 50% of AD is played
   */
  var isMidPoint = false;

  /**
   * @member isThirdQuartile
   * @desc Bool flag to indicate if 75% of AD is played
   */
  var isThirdQuartile = false;

  /**
   * @member playerState
   * @desc Indicates the current state of the player. Refer "PlayerStateEnum", for possible values.
   */
  var playerState = 0;

  /**
   * @member configurationXML
   * @desc Path to the Beacon XML
   */
  var configurationXML = configXML;

  /**
   * @member jwPlayerInstance
   * @desc The player instance passed
   */
  var jwPlayerInstance = null;

  // The different states the player can be in.
  var PlayerStateEnum = {
    // Indicates that the player is initializing.
    Init: 1,
    // Indicates that the player is playing video.
    Playing: 2,
    // Indicates that the player is paused.
    Pause: 4,
    // Indicates that the player is buffering.
    Rebuffer: 8,
    // Indicates that the player is in Seek or Seek buffer state.
    Seeking: 16,
    // Indicates that the session is completed with either error or successful playback.
    SessionComplete: 32
  };

  /**
   * @function loadMediaAnalytics
   * @summary Registers for all the player events.
   */
  function loadMediaAnalytics()
  {
    try
    {
      /**
       * @function beforePlay
       * @param {Object} e object with player information
       * @summary Fired just before the player begins playing.
       */
      jwPlayerInstance.on('beforePlay', function(e){
        if(playerState < PlayerStateEnum.Init || PlayerStateEnum.SessionComplete === playerState){
          //Setting playerType for debugging purposes.
          if (mediaAnalyticsLibrary){
            mediaAnalyticsLibrary.setData("playerVersion", jwPlayerInstance.version.substring(0, 6));
            var akaPluginCallBack = {};
            akaPluginCallBack.getStreamHeadPosition = function(){
              return jwPlayerInstance.getPosition();
            }
            mediaAnalyticsLibrary.setStreamURL(getStreamURL(), false);
            var format = "P";
            var provider = "";
            var renderer = jwPlayerInstance.getProvider();
            if (renderer){
              // This should never be null.
              provider = renderer.name;
            }
            mediaAnalyticsLibrary.setData("playerType", "JWPlayer-" + provider);
            if ("hlsjs" === provider.toLowerCase()){
              format = "hls";
            }else if ("shaka" === provider.toLowerCase()){
              format = "dash";
            }
            mediaAnalyticsLibrary.setData("format",format);
            mediaAnalyticsLibrary.setPlayerLoaderVersion(loaderName + "-" + loaderVersion);
            mediaAnalyticsLibrary.handleSessionInit(akaPluginCallBack);
          }
          playerState = PlayerStateEnum.Init;
        }
      });

      /**
       * @function play
       * @param {Object} e object with player information
       * @summary Fired when the player enters the playing state.
       */
      jwPlayerInstance.on('play', function(e){
        if (mediaAnalyticsLibrary){
          if (PlayerStateEnum.Pause === playerState ||  PlayerStateEnum.Seeking === playerState){
            mediaAnalyticsLibrary.handlePlaying();
          }else if (playerState === PlayerStateEnum.Rebuffer){
            mediaAnalyticsLibrary.handleBufferEnd();
          }
        }
        playerState = PlayerStateEnum.Playing;
      });

      /**
       * @function pause
       * @param {Object} e object with player information
       * @summary Fired when the player enters the paused state.
       */
      jwPlayerInstance.on('pause', function(e){
        if (mediaAnalyticsLibrary){
          mediaAnalyticsLibrary.handlePause();
        }
        playerState = PlayerStateEnum.Pause;
      });

      /**
       * @function seek
       * @param {Object} e object with player information
       * @summary Fired when the video is seeked..
       */
      jwPlayerInstance.on('seek', function(e){
        if (mediaAnalyticsLibrary){
          mediaAnalyticsLibrary.handleSeekStart();
        }
        playerState = PlayerStateEnum.Seeking;
      });

      /**
       * @function buffer
       * @param {Object} e object with player information
       * @summary Fired when the player starts playback and when the player enters a buffering state.
       */
      jwPlayerInstance.on('buffer', function(e){
        // Ignoring connection and seek buffering
        if (playerState != PlayerStateEnum.Init && playerState != PlayerStateEnum.Seeking){
          if (mediaAnalyticsLibrary){
            mediaAnalyticsLibrary.handleBufferStart();
          }
          playerState = PlayerStateEnum.Rebuffer;
        }
      });

      /**
       * @function complete
       * @param {Object} e object with player information
       * @summary Fired when an item completes playback.
       */
      jwPlayerInstance.on('complete', function(e){
        if (mediaAnalyticsLibrary && PlayerStateEnum.SessionComplete !== playerState){
          mediaAnalyticsLibrary.handlePlayEnd("Play.End.Detected");
        }
        playerState = PlayerStateEnum.SessionComplete;
      });

      /**
       * @function error
       * @param {Object} e object with player information
       * @summary Fired when a media error has occurred, causing the player to stop playback and go into idle mode.
       */
      jwPlayerInstance.on('error', function(e){
        if (mediaAnalyticsLibrary && PlayerStateEnum.SessionComplete !== playerState){
          mediaAnalyticsLibrary.handleError(e.message);
        }
        playerState = PlayerStateEnum.SessionComplete;
      });

      /**
       * @function setupError
       * @param {Object} e object with player information
       * @summary Fired when neither the Flash nor HTML5 player could be set up.
       */
      jwPlayerInstance.on('setupError', function(e){
        if (mediaAnalyticsLibrary && PlayerStateEnum.SessionComplete !== playerState){
          mediaAnalyticsLibrary.handleError(e.message);
        }
        playerState = PlayerStateEnum.SessionComplete;
      });

      /**
       * @function levelsChanged
       * @param {Object} e object with player information
       * @summary Fired when the active quality level is changed. Happens in response
       *          to e.g. a user clicking the controlbar quality menu or a script calling
       *          setCurrentQuality.
       */
      jwPlayerInstance.on('levelsChanged', function(e) {
        setBitrateIndex(e.currentQuality);
      });

      /**
       * @function visualQuality
       * @param {Object} e object with player information
       * @summary Fired when the active quality level is changed for HLS. This is
       *          different than levelsChanged since this will trigger when adaptive
       *          streaming automatically shifts quality.
       */
      jwPlayerInstance.on('visualQuality', function(e) {
        if (typeof e.level != "undefined" && typeof e.level.bitrate != "undefined"){
          setBitrate(parseInt(e.level.bitrate));
        }
      });

      /**
       * @function adImpression
       * @param {Object} e object with player information
       * @summary VAST and IMA. Fired based on the IAB definition of an ad impression.
       *          This occurs the instant a video ad begins to play.
       */
      jwPlayerInstance.on('adImpression', function(e) {
        if (mediaAnalyticsLibrary && "linear" === e.linear){
          var parser = document.createElement('a');
          parser.href = e.mediafile.file;
          var adInfoObject = {id: e.id, adTitle:e.adtitle, adPartnerId:e.id, adServer:parser.host};
          adInfoObject.adDuration = typeof(e.duration) !== 'undefined'? e.duration * 1000: 0;
          adInfoObject.adStartupTime = typeof(e.timeLoading) !== 'undefined'? e.timeLoading: 0;
          if ("pre" === e.adposition){
            adInfoObject.adType = "0";
          } else if ("mid" === e.adposition){
            adInfoObject.adType = "1";
          }else{
            adInfoObject.adType = "2";
          }
          mediaAnalyticsLibrary.handleAdLoaded(adInfoObject);
          mediaAnalyticsLibrary.handleAdStarted();
        }
      });

      /**
       * @function adTime
       * @param {Object} e object with player information
       * @summary Fired while ad playback is in progress.
       */
      jwPlayerInstance.on('adTime', function(e) {
        try{
          if (mediaAnalyticsLibrary){
            return;
          }
          if(e.duration > 0){
            var adPlayPercent = e.position / e.duration;
            if(!isFirstQuartile && adPlayPercent >= 0.25 && adPlayPercent < 0.5){
              mediaAnalyticsLibrary.handleAdFirstQuartile();
              isFirstQuartile = true;
            }else if(!isMidPoint && adPlayPercent >= 0.5 && adPlayPercent < 0.75){
              mediaAnalyticsLibrary.handleAdMidPoint();
              isMidPoint = true;
            }else if(!isThirdQuartile && adPlayPercent >= 0.75){
              mediaAnalyticsLibrary.handleAdThirdQuartile();
              isThirdQuartile = true;
            }
          }
        }catch(e){}
      });

      /**
       * @function adComplete
       * @param {Object} e object with player information
       * @summary VAST and IMA. Fired whenever an ad has completed playback.
       */
      jwPlayerInstance.on('adComplete', function(e) {
        if (mediaAnalyticsLibrary){
          mediaAnalyticsLibrary.handleAdComplete();
          resetAdCompletionInfo();
        }
      });

      /**
       * @function adError
       * @param {Object} e object with player information
       * @summary VAST and IMA. Fired whenever an error prevents the ad from playing.
       */
      jwPlayerInstance.on('adError', function(e) {
        if (mediaAnalyticsLibrary){
          mediaAnalyticsLibrary.handleAdError();
          resetAdCompletionInfo();
        }
      });

      /**
       * @function adSkipped
       * @param {Object} e object with player information
       * @summary VAST and IMA. Fired whenever an ad has been skipped.
       */
      jwPlayerInstance.on('adSkipped', function(e) {
        if (mediaAnalyticsLibrary){
          mediaAnalyticsLibrary.handleAdSkipped();
          resetAdCompletionInfo();
        }
      });

      /**
       * @function remove
       * @param {Object} e object with player information
       * @summary Triggered when the player is taken off of a page via jwplayer().remove();
       */
      jwPlayerInstance.on('remove', function(e){
        if (mediaAnalyticsLibrary && PlayerStateEnum.SessionComplete !== playerState){
          mediaAnalyticsLibrary.handleError("Browser.Close");
        }
        playerState = PlayerStateEnum.SessionComplete;
      });

      /**
       * @function firstFrame
       * @param {Object} e object with player information
       * @summary Triggered when content playback begins.
       */
      jwPlayerInstance.on('firstFrame', function(e){
        if (mediaAnalyticsLibrary){
          var duration = jwPlayerInstance.getDuration();
          var deliveryType = "O";
          if (duration === duration/0){
            // JW Player Documentation -> Live streams will always return a duration of infinity
            duration = -1;
            deliveryType = "L";
          }
          mediaAnalyticsLibrary.setStreamDuration(duration);
          mediaAnalyticsLibrary.setData("deliveryType",deliveryType);
          setBitrateIndex(jwPlayerInstance.getCurrentQuality());
          mediaAnalyticsLibrary.handlePlaying();
        }
        playerState = PlayerStateEnum.Playing;
      });

      jwPlayerInstance.on('playlistItem', function(e) {
        // If session is initialized and not terminated.
        if (playerState > PlayerStateEnum.Init && PlayerStateEnum.SessionComplete !== playerState){
          mediaAnalyticsLibrary.handlePlayEnd("Play.End.Detected");
          playerState = PlayerStateEnum.SessionComplete;
        }
      });

      /**
       * @function resetAdCompletionInfo
       * @summary Reset the percentage completion flags used.
       */
      function resetAdCompletionInfo(){
        isFirstQuartile = false;
        isMidPoint = false;
        isThirdQuartile = false;
      }
    }catch(e){
      console.log(e);
    }
  }

  /**
   * @function setData
   * @param {String} key  The key to be added
   * @param {String} value The data associated with the key
   * @summary This method can be used for setting custom dimensions.
   */
  this.setData = function(name, value){
    if(mediaAnalyticsLibrary){
      mediaAnalyticsLibrary.setData(name, value);
    }
  }

  /**
   * @function setBitrateIndex
   * @param {Number} bitrateIndex  The rendition index
   * @summary This method sets the bit rate of the video being played
   */
  function setBitrateIndex(bitrateIndex){
    try{
      var qualityObj = jwPlayerInstance.getQualityLevels()[bitrateIndex];
      var bitrate = parseInt(qualityObj.bitrate);
      if(bitrate < 50000){
        bitrate = bitrate*1000;//Converting kbps to bps
      }
      if(isNaN(bitrate) || !(bitrate>0)){
        if(qualityObj.label && qualityObj.label.toLowerCase().indexOf("kbps") > 0){
          bitrate = parseInt(qualityObj.label)*1000;
        }
      }
      if(bitrate > 0){
        setBitrate(bitrate);
      }
    }catch(e){}
  }

  /**
   * @function setBitrate
   * @param {Number} bitrate  The bitrate at which the video is being played
   * @summary Set bitrate in bps
   */
  function setBitrate(bitrate){
    if(mediaAnalyticsLibrary){
      mediaAnalyticsLibrary.handleBitRateSwitch(bitrate);
    }
  };

  /**
   * @function enableLocation
   *
   * @summary This API enables location tracking in MA Library.
   */
  this.enableLocation = function(){
    if(mediaAnalyticsLibrary){
      mediaAnalyticsLibrary.enableLocation();
    }
  };

  /**
   * @function disableLocation
   *
   * @summary This API disables location tracking in MA Library.
   */
  this.disableLocation = function(){
    if(mediaAnalyticsLibrary){
      mediaAnalyticsLibrary.disableLocation();
    }
  };

  /**
   * @function enableServerIPLookUp
   *
   * @summary ServerIP detection works only with akamai stream urls. Use this API to enable
   *          the feature. It is recommended that this feature is turned off, if cdn used is not Akamai.
   */
   this.enableServerIPLookUp = function(){
     if(mediaAnalyticsLibrary){
       mediaAnalyticsLibrary.enableServerIPLookUp();
     }
   };

   /**
    * @function disableServerIPLookUp
    *
    * @summary ServerIP detection works only with akamai stream urls. Use this API to disable
    *          the feature. It is recommended that this feature is turned off, if cdn used is not Akamai.
    */
   this.disableServerIPLookUp = function(){
     if(mediaAnalyticsLibrary){
       mediaAnalyticsLibrary.disableServerIPLookUp();
     }
   };

   /**
    * @function setMediaPlayer
    * @param {Object/Function} jwPlayer The player to be tracked.
    * @summary An API to set the player to be tracked.
    */
   this.setMediaPlayer = function(jwPlayer){
      this.resetMediaPlayer();
      // if it's not an object, the function block has been passed. Assigning function to a variable.
      if (typeof jwPlayer === "function"){
        jwPlayerInstance =  jwPlayer();
      }else{
        jwPlayerInstance =  jwPlayer;
      }
      loadMediaAnalytics();
   };

   /**
    * @function resetMediaPlayer
    * @summary An API to reset the player being tracked.
    */
   this.resetMediaPlayer = function(){
     if (jwPlayerInstance){
       // If player is valid, remove listeners first.
       removeAllListeners();
       jwPlayerInstance = null;
     }
   };

  /**
   * @function removeAllListeners
   * @summary Removes all the event listeners
   */
  function removeAllListeners(){
    if (mediaAnalyticsLibrary && PlayerStateEnum.SessionComplete !== playerState){
      mediaAnalyticsLibrary.handlePlayEnd("Play.End.Detected");
      playerState = PlayerStateEnum.SessionComplete;
    }
    jwPlayerInstance.off('beforePlay');
    jwPlayerInstance.off('play');
    jwPlayerInstance.off('pause');
    jwPlayerInstance.off('seek');
    jwPlayerInstance.off('buffer');
    jwPlayerInstance.off('complete');
    jwPlayerInstance.off('error');
    jwPlayerInstance.off('setupError');
    jwPlayerInstance.off('levelsChanged');
    jwPlayerInstance.off('visualQuality');
    jwPlayerInstance.off('adImpression');
    jwPlayerInstance.off('adTime');
    jwPlayerInstance.off('adComplete');
    jwPlayerInstance.off('adSkipped');
    jwPlayerInstance.off('adError');
    jwPlayerInstance.off('remove');
    jwPlayerInstance.off('firstFrame');
    jwPlayerInstance.off('playlistItem');
  }

  /**
   * @function handleTitleSwitch
   * @param {Dictionary} customData Dictionary containing the key value pairs for the
   *  custom data that the client wants to set to the session.
   * @summary This API handles the title switch
   */
  this.handleTitleSwitch= function(customData){
    if(mediaAnalyticsLibrary){
      mediaAnalyticsLibrary.handleTitleSwitch(customData);
      playerState = validPlayerStates.Playing;
    }
  };

  /**
   * @function getStreamURL
   * @summary The url of the video being played.
   */
  function getStreamURL(){
    var streamUrl = "";
    var itemIndex = jwPlayerInstance.getPlaylistIndex();
    if (itemIndex >= 0){
      var item = jwPlayerInstance.getPlaylistItem(itemIndex);
      streamUrl = item.file;
    }
    return streamUrl;
  }
  mediaAnalyticsLibrary = new JS_AkamaiMediaAnalytics(configurationXML);
}
