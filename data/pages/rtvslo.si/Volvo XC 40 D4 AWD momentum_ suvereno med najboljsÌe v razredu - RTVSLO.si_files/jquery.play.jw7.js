var AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH = 'https://ma1348-r.analytics.edgekey.net/config/beacon-20864.xml?enableGenericAPI=1';

function loadFile(path, type, checkId){

    if (document.getElementById(checkId))return;

    if (type=="js"){
      var fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", path);
      fileref.setAttribute("id", checkId);
    }
    else if (type=="css"){
      var fileref=document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", path);
      fileref.setAttribute("id", checkId);
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
}


loadFile('https://79423.analytics.edgekey.net/ma_library/javascript/javascript_malibrary.js', 'js', 'javascript_malibrary');

loadFile('https://img.rtvslo.si/_static/r666/rtv4d/jw7/akamai/jwplayer_AkamaiMediaAnalytics.js', 'js', 'AkamaiMediaAnalytics');

//loadFile('./akamai/jwplayer_AkamaiMediaAnalytics.js', 'js', 'AkamaiMediaAnalytics');

loadFile('https://img.rtvslo.si/_static/r020820181/rtv4d/jw7/4d.css', 'css', 'rtv4dplayercss');

if (typeof $4D !== 'undefined') {
    //console.log('4d');
    jQuery = $4D;
}
(function($) {

    var abouttext = 'MMC-20190212-DejanC.';
    
    function getStatsRTV(channel, e){
        
        var playItem = {};

        var file = channel.mediaFiles.filter(function(itm){
            return itm.mediaType == channel.mediaType; 
        });

        if(file.length == 0)return null;

        playItem.file = file[0].file;
        
        var kanal = 'Not specified';
        var quality = 'HDhigh';
        if(e.level.height == 480){
            quality = 'HDlow';
        }
        if(e.level.height == 360){
            quality = 'high';
        }
        if(e.level.height == 216){
            quality = 'low';
        }

        if(playItem.file.indexOf('/slo1/') != -1 || playItem.file.indexOf('/slo1_ac/') != -1){
            kanal = "TV SLO1 - "+ quality;
        }
        if(playItem.file.indexOf('/slo1_ac/') != -1){
            $("#tvs1a_audio_cc > svg").css('color','#0088cc');
        }
      

        if(playItem.file.indexOf('rtv_channel2') != -1 || playItem.file.indexOf('/slo2/') != -1){
            kanal = "TV SLO2 - "+ quality;
        }
        if(playItem.file.indexOf('/slo3/') != -1){
            kanal = "TV SLO3 - "+ quality;
        }
        if(playItem.file.indexOf('/tvkp/') != -1){
            kanal = "TV KP - "+ quality;
        }
        if(playItem.file.indexOf('/tvmb/') != -1){
            kanal = "TV MB - "+ quality;
        }
        if(playItem.file.indexOf('/tvmmc/') != -1 || playItem.file.indexOf('/mmctv/') != -1){
            kanal = "TV MMC - "+ quality;
        }      
        if(playItem.file.indexOf('/ra_ra1/') != -1){
            kanal = "RA RA1 AUDIO";
        }
        if(playItem.file.indexOf('/ra_ra1_video/') != -1){
            kanal = "RA RA1 VIDEO";
        }
        if(playItem.file.indexOf('rtv_val202/') != -1 || playItem.file.indexOf('/ra_val202/') != -1){
            kanal = "RA VAL202 AUDIO";
        }
        if(playItem.file.indexOf('/ra_ra1_video/') != -1){
            kanal = "RA VAL202 VIDEO";
        }
        if(playItem.file.indexOf('/ra_ars/') != -1){
            kanal = "RA ARS AUDIO";
        }
        if(playItem.file.indexOf('/ra_ars_video/') != -1){
            kanal = "RA ARS VIDEO";
        }
        if(playItem.file.indexOf('/ra_rakp/') != -1){
            kanal = "RA KP AUDIO";
        }
        if(playItem.file.indexOf('/ra_rakp_video/') != -1){
            kanal = "RA KP VIDEO";
        }
        if(playItem.file.indexOf('/ra_racapo/') != -1){
            kanal = "RA CAPO AUDIO";
        }
        if(playItem.file.indexOf('/ra_racapo_video/') != -1){
            kanal = "RA CAPO VIDEO";
        }
        if(playItem.file.indexOf('/ra_ramb/') != -1){
            kanal = "RA MB AUDIO";
        }
        if(playItem.file.indexOf('/ra_ramb_video/') != -1){
            kanal = "RA MB VIDEO";
        }
        if(playItem.file.indexOf('/ra_mmr/') != -1){
            kanal = "RA MMR AUDIO";
        }
        if(playItem.file.indexOf('/ra_mmr_video/') != -1){
            kanal = "RA MMR VIDEO";
        }
        if(playItem.file.indexOf('/ra_rsi/') != -1){
            kanal = "RA SI AUDIO";
        }
        if(playItem.file.indexOf('/ra_rsi_video/') != -1){
            kanal = "RA SI VIDEO";
        }
        if(playItem.file.indexOf('/ra_sportval202/') != -1){
            kanal = "RA SPORT202 AUDIO";
        }

        
        
        console.log('kanal', kanal);
        return kanal;

    }

    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    var HTTP = 'http://';
    var HTTPS = 'https://';
    var PROTOCOL = 'https:' == document.location.protocol ? HTTPS : HTTP;
    var IOS_RTVSLO_SI_SERVER = PROTOCOL + '5862e89255007.streamlock.net';
    var STREAM_RTVSLO_SI_SERVER = PROTOCOL + '585ddcf1f3493.streamlock.net';

    
    //Ob prehoodu na ssl se uporabi drugi endpoint dokler se ne proklopimo na nov property
    function replaceEndpointHLS(original) {

        if (typeof original !== 'string' || PROTOCOL === HTTP) {
            return original;
        }

        var hls = original.replace('http://', '').replace('https://', ''); //remove protocol;
        var needle = hls.split('/');
        if (needle.length > 0) {
            hls = hls.replace(needle[0], '');
            return STREAM_RTVSLO_SI_SERVER + hls;
        } else {
            return original;
        }

    }

    function forceSLL(original) {
        var HTTP_CONST = 'http://';
        var HTTPS_CONST = 'https://';
        var PROTOCOL_CONST = 'https:' == document.location.protocol ? HTTPS_CONST : HTTP_CONST;
        if (typeof original !== 'string' || PROTOCOL_CONST === HTTP_CONST) {
            return original;
        }
        return original.replace('http://', 'https://');
    }

    

    $.fn.playVod = function(id, options, isShowItem) {
     
        if(isShowItem && options){
            var promoOptions = {} = {
                'promo':1,
                'mute':1,
                'noads':1,
                'autostart': 'true',
                'width': '100%',
                'height': '',
            };
            options = $.extend({}, options, promoOptions);
        }   

        var video = $.extend({}, defaults, options, rtvdef);
        var container = $(this);

        if(typeof video.promo === 'undefined'){
            video.promo = 0;
        }
        if (typeof video.autostart !== 'string') {
            video.autostart = video.autostart.toString();
        }
        
        var disableAds = false;
             
        if (typeof video.disableAds !== 'undefined' && video.disableAds == "true") {
            disableAds = true;
        }
        if (typeof video.noads !== 'undefined' && video.noads === 1) {
            disableAds = true;
        }
        

        var info = {};
        info.width = video.width;
        info.height = video.height;
        info.mute = (typeof video.mute !== 'undefined' && video.mute === 1) ? "true" : "false";
        info.primary = "html5";
        info.hlshtml = "true";
        info.autostart = video.autostart;
        info.stretching = video.stretching;
        info.disableAds = disableAds;
        //info.visualplaylist = false;
        //info.nextupoffset = 0;
        info.abouttext = abouttext;

      
        //Force audio player to 40px height. Used in embed
        /* show only 40px controls*/
        if (typeof video.smallVod !== 'undefined' && video.smallVod == 'true') {
            info.width = $(this).width();
            info.height = '40';
        }

        var logo = getLogo(video, "");
        if (logo !== false) {
            info.logo = logo;
        }

        info.advertising = {
            client: 'vast',
            skipoffset: 7,
            skipmessage: 'Preskoči oglas čez XXs',
            admessage: 'Do konca oglasa: XXs.',
            skiptext: 'Preskoči oglas',
            cuetext: 'Oglas',
            vpaidcontrols: true
        };

        info.localization = {
            nextUp: '',
            playlist: 'Seznami predvajanja',
            related: 'Sorodno',
            playback: 'Predvajaj',
            play: 'Predvajaj',
            pause: 'Pavza',
            volume: 'Glasnost',
            prev: 'Nazaj',
            next: 'Naprej',
            cast: 'Chromecast',
            fullscreen: 'Celoten zaslon',
            hd: 'Kvaliteta',
            cc: 'Podnapisi',
            audioTracks: 'Avdio trak',
            replay: 'Ponovi predvajanje',
            buffer: 'Nalaganje',
            more: 'Več',
            liveBroadcast: 'V živo',
            loadingAd: 'Nalagam oglas',
            rewind: 'Nazaj 10s',
            nextUpClose: ''
        };

        info.sharing = {
            link: '',       
        }
        /* POTREBNO NADGRADITI API 
        info.related = {
            file: "assets/related.json",
            onclick: "link",
            //oncomplete: 'autoplay',
            autoplaytimer: 10,
            heading: 'MMC Priporoča'
        }*/


        try {
            if (typeof video.playfile === "object" && video.playfile !== null) {
                return playFiles(container, info, video);
            }

            if (typeof video.playlistXML === "string" && video.playlistXML !== null) {
                info.playlist = video.playlistXML;
                data = {};
                data.response = {};
                data.response.mediaType = "video";
                return showPlayer(container, data, info, video);
            }
        } catch (e) {
            return console.log(e);
        };
        var session_id = $.cookieApi("read", null, "APISESSION", 365) ?  $.cookieApi("read", null, "APISESSION", 365): "";

        var endpoint = "ava/getRecording/";
        if(isShowItem){
            endpoint = "ava/getLastRecordingByShowId/";
        }
        var url = video.url["api"] + endpoint + id;
        
        return $.ajax({
            url:url,
            data: {
                "client_id": video.client,
                "session_id":session_id
            },
            dataType: 'jsonp',
            cache: 'false',
            jsonpCallback: function() {
                var random = Math.floor(Math.random() * 1000);
                return 'ava_' + random;
            },
            success: function(data) {
                
                //console.log('data', data);

                if (typeof data.error !== 'undefined' || data.response == false) {
                    if (typeof jwplayer === "function") {
                        try {
                            video.playfile = {
                                "rtmp": (video.streamer["rtmp"] + "/mp4:" + video.preroll["dummy"]["rtmp"]),
                                "html5": (video.streamer["html5"] + video.preroll["dummy"]["html5"])
                            };

                            playFiles(container, info, video);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    if (video.callback) {
                        if (typeof video.callback === 'string') {
                            var fn = window[video.callback];
                            if (typeof fn === 'function') {
                                return fn(data);
                            }
                        } else {
                            var callbacks = $.Callbacks();
                            callbacks.add(video.callback);
                            return callbacks.fire(data);
                        }
                    }
                    //console.log(data.error);
                    return false;
                }

                var logo = getLogo(video, data);
                if (logo !== false) {
                    info.logo = logo;
                }

                if (data.response.showTypeId == '70' || data.response.showTypeId == '71') {
                    info.advertising.skipoffset = 7;
                    info.advertising.skipmessage = 'Še xxs';
                    info.advertising.skiptext = 'Preskoči';
                }

                if (typeof data.response.noAds !== 'undefined' && data.response.noAds === "1") {
                    info.disableAds = true;
                }

                if (typeof data.response.noAds !== 'undefined' && data.response.noAds === "1") {
                    info.disableAds = true;
                }

                //23.3 - neprijavljeni ki se jim posnetek ne zrola ne prikažemo reklam
                if (typeof data.response.showLoginPopup !== 'undefined' && data.response.showLoginPopup === "1") {
                    info.disableAds = true;
                    info.showLoginPopup = data.response.showLoginPopup;
                }



                //midroll 28.11.2017
                if (info.disableAds === false && data.response.showTypeId !== '31' //SKIP MIDROLE NA OTROŠKIH
                    &&
                    data.response.mediaType === 'video' &&
                    typeof data.response.duration !== 'undefined') {



                    var duration = Math.floor(parseInt(data.response.duration, 10) / 60) || 0;

                    if (!info.advertising.schedule) {
                        info.advertising.schedule = {};
                    }


                    if (duration > 90) {

                        var adsLink = video.get_arhiv_midroll(data.response.showTypeId, data.response.showId);
                        var adsLink2 = video.get_arhiv_midroll(data.response.showTypeId, data.response.showId);


                        var offset = Math.floor(duration / 3 * 60);
                        info.advertising.schedule.adbreak1 = {
                            offset: offset,
                            tag: adsLink
                        };
                        info.advertising.schedule.adbreak2 = {
                            offset: offset * 2,
                            tag: adsLink2
                        };


                    } else if (duration >= 35 && duration <= 90) {

                        var adsLink = video.get_arhiv_midroll(data.response.showTypeId, data.response.showId);

                        var offset = Math.floor(duration / 2 * 60);
                        info.advertising.schedule.adbreak1 = {
                            offset: offset,
                            tag: adsLink
                        };
                    }
                }


                if (typeof data.response.subtitles !== 'undefined' && data.response.subtitles) {
                    var subcookie = $.cookieApi("read", null, "jwplayer.captionLabel");
                    if (subcookie === false) {
                        $.cookieApi("set", "Off", "jwplayer.captionLabel", 0);
                    }
                }

                info.playlist = (function() {
                    var playlist = [];
                    var i = {};

                

                    if (video.image && (video.image.indexOf("jpg") > -1 || video.image.indexOf("jpeg") > -1 || video.image.indexOf("png") > -1 || video.image.indexOf("gif") > -1)) {
                        i.image = video.image;
                    }

                    if (typeof i.image === "undefined" && typeof data.response.images.orig !== "undefined" && data.response.mediaType === "audio") {
                        i.image = data.response.images.orig;
                    }

                    if (typeof i.image === "undefined" && typeof data.response.images.orig !== "undefined" && data.response.mediaType === "video"/* && video.autostart === "false"*/) {
                        i.image = data.response.images.orig;
                        
                        //console.log('data.response.images.orig', data.response)
                    }
                   //console.log('data.response.link',data.response.link )
                    if(typeof data.response.showName === 'string'){   
                        //i.title = data.response.showName;//DC they dont want this
                    }
                    
             
                    i.sources = [];

                    if (data.response.mediaFiles !== undefined) {
                        data.response.mediaFiles.sort(function(a, b) {
                            return (b.bitrate + b.width) - (a.bitrate + a.width);
                        });
                    }

                    try {
                        if (data.response.addaptiveMedia && data.response.addaptiveMedia.hls) {
                            data.response.addaptiveMedia.hls = replaceEndpointHLS(data.response.addaptiveMedia.hls);
                        }
                    } catch (e) {
                        console.log("convert error", e);
                        //do nothing
                    }



                    if (typeof data.response.addaptiveMedia !== 'undefined') {

                        /*
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            i.sources[0] = {
                                file: data.response.addaptiveMedia.hls_sec,
                                type: "hls",
                                "default": "true"
                            };
                        } else if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            i.sources[0] = {
                                file: data.response.addaptiveMedia.hls_sec,
                                type: "mp4",
                                "default": "true"
                            };
                        } 
                        
                        else if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) { //18.1. 540p ne dela na Safari + MacOS zato je 400p po defutl
                            //console.log('mac alert...');
                            var filename = data.response.mediaFiles[0].filename.replace("_1.mp4", ".mp4").replace(".mp4", "_1.mp4");
                            i.sources[0] = {
                                //file: data.response.mediaFiles[0].streamers.hls + '/_definst_/' + filename + '/playlist.m3u8',
                                file: data.response.mediaFiles[0].streamers.hls + "/_definst_/" + filename + "/playlist.m3u8",
                                type: "hls",
                                "default": "true"
                            };
                        }
                        */



                        if (i.sources.length === 0) {

                            /*i.sources[0] = {
                            	file: data.response.mediaFiles[0].streamers.hls + '/_definst_/' + data.response.mediaFiles[0].filename + '/manifest.mpd',
                            	type: "mpeg-dash",
                            	//dash: true,
                            	//default: "true"
                            };*/


                            i.sources[0] = {
                                file: data.response.addaptiveMedia.hls_sec,
                                type: "hls",

                            };

                            i.sources[1] = {
                                file: data.response.addaptiveMedia.jwplayer,
                                type: "rtmp"
                            };

                            /*if(data.response.mediaFiles.length > 0 && data.response.mediaFiles.length > 0){
                            	var filename = data.response.mediaFiles[0].filename.replace("_1.mp4",".mp4");
                            	i.sources[3] = {
                            		file: (data.response.mediaFiles[0].streamers.http + "/" + filename),
                            		type: "mp4"
                            	};
                            }*/
                            //Zadnji falllback na low quality http download.
                            if (data.response.mediaFiles.length > 0 && data.response.mediaFiles.length > 1) {
                                var filename = data.response.mediaFiles[0].filename.replace("_1.mp4", ".mp4").replace(".mp4", "_1.mp4");
                                i.sources[2] = {
                                    file: (data.response.mediaFiles[0].streamers.http + "/" + filename),
                                    type: "mp4"
                                };
                            }

                            //console.log(i.sources);

                        }
                    } else {
                        if (typeof data.response.mediaFiles !== 'undefined') {
                            var mc = 0;
                            $.each(data.response.mediaFiles, function(t) {
                                switch (data.response.mediaFiles[t].mediaType) {
                                    case "MP4":
                                        i.sources[mc] = { //30.5.2017 - Dejan Change this because 164742746 stop working
                                            file: (data.response.mediaFiles[t].streamers.hls_sec + "/_definst_/" + data.response.mediaFiles[t].filename + "/playlist.m3u8"),
                                            //file: (data.response.mediaFiles[t].streamers.rtmp + "/mp4:" + data.response.mediaFiles[t].filename),
                                            type: "hls"
                                        };
                                        mc += 1;
                                        //if (data.response.mediaFiles[t].bitrate == "1500000") {
                                        if (mc < 2) {
                                            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                                i.sources[mc] = {
                                                    file: (data.response.mediaFiles[t].streamers.hls_sec + "/_definst_/" + data.response.mediaFiles[t].filename + "/playlist.m3u8"),
                                                    type: "hls",
                                                    "default": "true"
                                                };
                                                mc += 1;
                                            }
                                            if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                                i.sources[mc] = {
                                                    file: (data.response.mediaFiles[t].streamers.hls_sec + "/_definst_/" + data.response.mediaFiles[t].filename + "/playlist.m3u8"),
                                                    type: "mp4",
                                                    "default": "true"
                                                };
                                                mc += 1;
                                            }
                                        }
                                        break;
                                    case "MP3":
                                        /*i.sources[mc] = {
                                            file: (data.response.mediaFiles[t].streamers.hls_sec + "/_definst_/mp3:" + data.response.mediaFiles[t].filename + "/playlist.m3u8"),
                                            type: "hls"
                                        };
                                        i.sources[mc + 1] = {
                                            file: (data.response.mediaFiles[t].streamers.http + "/" + data.response.mediaFiles[t].filename),
                                            type: "mp3"
                                        };
                                        mc += 2;*/

                                        i.sources[mc] = {
                                            file: (data.response.mediaFiles[t].streamers.http + "/" + data.response.mediaFiles[t].filename),
                                            type: "mp3"
                                        };
                                        mc += 1;
                                        //mc += 2;
                                        break;
                                }
                            });

                            if (mc === 0) {
                                i.sources[0] = {
                                    file: (video.streamer["rtmp"] + "/mp4:" + video.preroll["dummy"]["rtmp"]),
                                    type: "rtmp"
                                };
                                i.sources[1] = {
                                    file: (video.streamer["html5"] + video.preroll["dummy"]["html5"]),
                                    type: "mp4"
                                };
                                data.response.mediaType = "video";
                            }            
                        }
                    }



                    if (data.response.subtitles) {

                        var addStyleString = function(str) {
                            var node = document.createElement('style');
                            node.innerHTML = str;
                            document.head.appendChild(node);
                        }

                        
                        addStyleString('video::cue(.yellow) {color: #FFFF00}');
                        addStyleString('video::cue(.blue) {color: #00FFFF}');
                        addStyleString('video::cue(.green) {color: #00FF00}');
                        addStyleString('video::cue(.pink) {color: #FF00FF}');
                        addStyleString('.jwplayer .yellow {color: #FFFF00}');
                        addStyleString('.jwplayer .blue {color: #00FFFF}');
                        addStyleString('.jwplayer .green {color: #00FF00}');
                        addStyleString('.jwplayer .pink {color: #FF00FF}');
    
                       
                        //inject css

                        i.tracks = [];
                        $.each(data.response.subtitles, function(t) {
                            if (data.response.subtitles[t].language === "Slovenian") {
                                data.response.subtitles[t].language = "Slovenski";
                            }

                            var file = forceSLL(data.response.subtitles[t].file);
                            i.tracks[t] = {
                                file: file,
                                kind: "captions",
                                label: data.response.subtitles[t].language
                            };
                            /*i.tracks[t] = { file: data.response.subtitles[t].file, kind: "captions", label: data.response.subtitles[t].language, "default": true };*/
                        });
                    }

                    return getPreroll(i, data, video);
                })();

                if(typeof data.response.link === 'string'){  
                    if(info.sharing){
                        info.sharing.link = data.response.link;
                        info.sharing.heading = 'Deli s prijatelji';
                    }              
                }

                if (data.response.subtitles && video.captions !== null && typeof video.captions === 'object') {
                    info.captions = video.captions;
                }

                if (typeof jwplayer === "function") {

                    showPlayer(container, data, info, video);
                }

                if (video.callback) {
                    try {
                        info.response = data.response;
                        info.player = jwplayer(container.id);
                        if (typeof video.callback === 'string') {
                            var fn = window[video.callback];
                            if (typeof fn === 'function') {
                                return fn(info);
                            }
                        } else {
                            var callbacks = $.Callbacks();
                            callbacks.add(video.callback);
                            return callbacks.fire(info);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                return false;

            }
        });
    }

    $.fn.playLive = function(id, options) {

        var container = $(this);
        var that = this;
        var video = $.extend({}, defaults, options, rtvdef);
        /*
        var hasFlash = false;
        try {
            hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch (exception) {
            hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
        }
        */
        

        var isRadio = ($(that).data("channel") || "").indexOf('ra.') !== -1 ? true : false;


        if (typeof video.autostart !== 'string') {
            video.autostart = video.autostart.toString();
        }

        var disableAds = false;
        if (typeof video.disableAds !== 'undefined' && video.disableAds === true) {
            disableAds = true;
        }

        var info = {};
        //info.hasFlash = hasFlash;
        info.width = video.width;
        info.height = video.height;
        info.mute = "false";
        info.primary = "html5";//(id === 'tv.slo2' || id === 'ra.val202') ? "html5" : "flash";
        info.autostart = video.autostart;
        info.stretching = video.stretching;
        info.controls = video.controls;
        info.disableAds = disableAds;
        info.showLoginPopup = false;
        //info.visualplaylist = true;
        info.abouttext = abouttext;
        //info.nextupoffset = -1;

        info.advertising = {
            client: 'vast',
            skipoffset: 7,
            skipmessage: 'Oglas lahko preskočite čez XXs',
            admessage: 'Do konca oglasa: XXs.',
            skiptext: 'Preskoči oglas',
            vpaidcontrols: true
        }

        info.localization = {
            nextUp: '',
            playlist: 'Seznami predvajanja',
            related: 'Sorodno',
            playback: 'Predvajaj',
            play: 'Predvajaj',
            pause: 'Pavza',
            volume: 'Glasnost',
            prev: 'Nazaj',
            next: 'Naprej',
            cast: 'Chromecast',
            fullscreen: 'Celoten zaslon',
            hd: 'Kvaliteta',
            cc: 'Podnapisi',
            audioTracks: 'Avdio trak',
            replay: 'Ponovi predvajanje',
            buffer: 'Nalaganje',
            more: 'Več',
            liveBroadcast: 'V živo',
            loadingAd: 'Nalagam oglas',
            rewind: 'Nazaj 10s',
            nextUpClose: ''
        };



        var logo = getLogo(video, "");
        if (logo !== false) {
            info.logo = logo;
        }

        try {
            if (typeof video.playfile === "object" && video.playfile !== null) {
                return playFiles(container, info, video);
            }
        } catch (e) {
            return console.log(e);
        };



        return $.ajax({
            url: video.url["api"] + "ava/getLiveStream/" + id,
            data: {
                "client_id": video.client
            },
            dataType: 'jsonp',
            cache: 'false',
            jsonpCallback: function() {
                var random = Math.floor(Math.random() * 1000);
                return 'ava_' + random;
            },
            success: function(data) {
                
                //ERROR Handling
                if (typeof data.error !== 'undefined' || data.response == null) {
                    if (typeof jwplayer === "function") {
                        try {
                            video.playfile = {
                                "rtmp": (video.streamer["rtmp"] + "/mp4:" + video.preroll["dummy"]["rtmp"]),
                                "html5": (video.streamer["html5"] + video.preroll["dummy"]["html5"])
                            };

                            playFiles(container, info, video);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    if (video.callback) {
                        if (typeof video.callback === 'string') {
                            var fn = window[video.callback];
                            if (typeof fn === 'function') {
                                return fn(data);
                            }
                        } else {
                            var callbacks = $.Callbacks();
                            callbacks.add(video.callback);
                            return callbacks.fire(data);
                        }
                    }
                    //console.log(data.error);
                    return false;
                }
               

                var logo = getLogo(video, data);
                
                if (logo !== false) {
                    info.logo = logo;
                }

                if (data.response.mediaFiles) {
                    info.playlist = buildPlaylist(data, video);
                }

                if (typeof jwplayer === "function") {

                    showPlayer(container, data, info, video);
                }

                if (video.callback) {
                    try {
                        info.response = data.response;
                        info.player = jwplayer(container.id);



                        if (typeof video.callback === 'string') {
                            var fn = window[video.callback];
                            if (typeof fn === 'function') {
                                return fn(info);
                            }
                        } else {
                            var callbacks = $.Callbacks();
                            callbacks.add(video.callback);
                            return callbacks.fire(info);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                return false;
            }
        });
    }

    function showAds(data, video, player, info) {

        if (typeof data.response !== 'undefined' && typeof data.response.promo !== 'undefined' && data.response.promo === '1') {
            //SKIP ADDS
            return;
        }

        //SKIP otroški
        if(data.response.showTypeId == '31'){
            return;
        }


        //PRE
        var vast0 = "";
        if (typeof data.response.category !== 'undefined' && data.response.category === 'live' && typeof data.response.id !== 'undefined') {
            vast0 = video.get_live_preroll(data.response.id);
        } else {
            vast0 = video.get_arhiv_preroll(data.response.showTypeId, data.response.showId);
        }

        if (!info.advertising.schedule) {
            info.advertising.schedule = {};
        }

        info.advertising.schedule.preroll = {
            offset: 'pre',
            tag: vast0
        };


        //POST
        if (typeof data.response.showTypeId !== 'undefined') {

            var post = video.get_arhiv_postroll(data.response.showTypeId, data.response.showId);

            info.advertising.schedule.postroll = {
                offset: 'post',
                tag: post
            }
        }


        //console.log('advertising schedule', info.advertising.schedule);

    }

    function showPlayer(container, data, info, video) {
    
        jwplayer.key = video.jwkey;
        rtvdef.playerStatus = true;
        rtvdef.media = info.response;

        var errorHandler = (function(err) {

            //console.log("err ", err);
            //console.log("error", err);
            var error = '<div class="custom-error-msg-jw" style="position: absolute;top: 45%;padding: 10px;color: white;width: 90%;background-color:black;">Napaka. ' + err.message + ' </div>'

            $('#' + container[0].id).after(error);
            setTimeout(function() {
                $('.custom-error-msg-jw').hide();
            }, 3000);

            if (typeof rtvdef.errorHandler === 'undefined') {
                if (typeof err.message !== 'undefined' && err.message.toLowerCase().indexOf("error loading stream") >= 0) {
                    try {
                        info.height = video.height;
                        info.width = video.width;
                        video.playfile = {
                            "html5": video.streamer.error
                        };
                        if (typeof info.player !== 'undefined') {
                            delete info.player;
                        }
                        playFiles(container, info, video);
                    } catch (e) {
                        console.log("e ", e);
                    }
                }
            }
            rtvdef.errorHandler = true;
        });
        
        
        container.each(function(p) {
            
            //SHOW ADS
            if (data.response.mediaType !== "audio") {
                if (info.disableAds === false) {
                    showAds(data, video, container[p], info);
                }

            }

            //INIT AUDIO
            if (video.height > 40 && data.response.mediaType === "audio" && (video.image || typeof data.response.images.orig !== "undefined")) {

                return (function() {

                    $radioImage = $("<div>", {
                        id: (container[p].id + '_top'),
                    });

                    $("#" + container[p].id).append($radioImage);
                    $radioPlayer = $("<div>", {
                        id: (container[p].id + '_bottom')
                    });
                    $("#" + container[p].id).append($radioPlayer);

                    if (video.image) {
                        if (typeof data.response.images.orig === 'undefined') {
                            data.response.images = {};
                        }
                        data.response.images.orig = video.image;
                        try {
                            if (typeof data.response.onair.current.show.images.orig !== 'undefined') {
                                data.response.images.orig = data.response.onair.current.show.images.orig;
                            }
                        } catch (e) {
                            console.log(e);
                        };
                    }

                    if (data.response.images.orig.toLowerCase().indexOf(".jpg") >= 0) {

                        setTimeout(function() {

                            $image = $("#" + container[p].id + "_bottom" + " .jw-overlays");
                            $image.css({

                                //"background": "url(" + data.response.images.orig + ")",
                                //"background-position": "center center",
                                //"background-repeat": "no-repeat",
                                //"background-size": "cover",
                                "z-index": "0"
                            });

                            var padding = [44, 73];
                            if (video.onair === "true" && typeof data.response.category !== 'undefined' && data.response.category === 'live') {
                                onair(data.response.id, padding, video, $image, info, data);
                            }
                        }, 500);



                    }

                    if (data.response.images.orig.toLowerCase().indexOf(".mp4") >= 0) {
                        var playback = {};
                        playback.autostart = "true";
                        playback.repeat = "true";

                        playback.width = video.width;
                        playback.height = (video.height - 40);
                        playback.file = data.response.images.orig;
                        jwplayer(container[p].id + "_top").setup(playback);
                    }

                    info.advertising = null;

                    //LIVE AUDIO
                    var playerInstance =  jwplayer(container[p].id + "_bottom").setup(info).on('ready', function(a) {

                        if(data.response.category === 'live'){              
                            JWPlayerLoader = new jwplayer_AkamaiMediaAnalytics(AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH);
                            JWPlayerLoader.setMediaPlayer(playerInstance);
                            JWPlayerLoader.disableLocation(); 
                            JWPlayerLoader.disableServerIPLookUp();
                        }    

                        //30.11.2015 ready ne vrne več ID kot v JW6
                        a.id = container[p].id;

                        //adds button
                        //refreshRadio(data.response.id, video, data);

                        if (typeof video.clip === 'object' && video.clip !== null) {
                            clipRecording(container[p].id + "_bottom", video);
                        }
                        if (typeof data.response.id !== 'undefined' && (typeof data.response.category === 'undefined' || data.response.category !== 'live')) {
                            $.stats(container[p].id + "_bottom", data.response.id);
                        }
                    }).on('error', function(err) {
                        errorHandler(err);
                    }).on('play', function(e) {
                        //console.log('play live');

                        $image = $("#" + container[0].id + "_bottom" + " .jw-overlays");
                        $image.css({
                            "z-index": "0"
                        });

                    }).on('visualQuality', function(e) {
                        
                        if(data.response.category === 'live'){
                          
                            var kanal = getStatsRTV(data.response, e); 
                            if(typeof JWPlayerLoader === 'undefined'){
                                JWPlayerLoader = new jwplayer_AkamaiMediaAnalytics(AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH);
                                JWPlayerLoader.setMediaPlayer(playerInstance);
                                JWPlayerLoader.disableLocation(); 
                                JWPlayerLoader.disableServerIPLookUp();
                            }       
                            JWPlayerLoader.setData('dimension', 'Live VOD 24x7');
                            JWPlayerLoader.setData('deliveryType', 'L')  
                            JWPlayerLoader.setData("category", kanal);
                            JWPlayerLoader.setData("subCategory", kanal);
                            JWPlayerLoader.setData("title", kanal);
                        }    

                    }).on('all', function(e) {//LIVE AUDIO
                        //console.log(e);

                        if (e === 'adPlay') {
                            var volume = this.getVolume();

                            if (volume > 80) {
                                this.setVolume(80);
                            }

                        }
                        if (e === 'adComplete' || e === 'adSkipped') {
                            var volume = this.getVolume();
                            if (volume >= 80) {
                                volume = 100;
                            }

                            this.setVolume(volume);
                        }

                    });
                 
                    return playerInstance;

                })();
            }

            
            info.sources = info.playlist[0].sources;

            var playerInstance = jwplayer(container[p].id).setup(info).on('ready', function(a) {

                //INIT AKAMAI STATS
                if(data.response.category === 'live'){
                           
                    JWPlayerLoader = new jwplayer_AkamaiMediaAnalytics(AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH);
                    JWPlayerLoader.setMediaPlayer(playerInstance);
                    JWPlayerLoader.disableLocation(); 
                    JWPlayerLoader.disableServerIPLookUp();
                }    

                a.id = container[p].id;
                 
                try{
                    if( Object.prototype.toString.call( data.response.subtitles ) === '[object Array]' ) {
                        $("#" + container[p].id).setButtonsCC(video, data, info);
                    }
                }catch(e){}
       
                if(info.showLoginPopup === '1'){

                    $showLoginPopup = $("<div style='line-height:20px;text-align:center;opacity:0.9;position:absolute;left:0;top:0;background:none rgb(51, 51, 51);z-index:999;color:white;width:100%;padding:10px;'>", {
                        id: (container[p].id + '_top_login'),
                    });
                    var loc = window.location.href;
                    
                   // console.log('data.response',data.response );
                    if(loc.indexOf('.rtvslo.si') !== 1){
                        //$showLoginPopup.html('Za ogled vsebine morate biti <a style="color:white;font-weight:bold;" href="https://www.rtvslo.si/prijava">prijavljeni</a>.');  
                        
                        //var location = window.location.href.indexOf('beta.rtvslo.si') > -1 ? 'https://beta.rtvslo.si/' : 'https://www.rtvslo.si/';
                        var location = 'https://moj.rtvslo.si/';
                         $showLoginPopup.html('Spoštovani. Oddaja je na voljo samo prijavljenim uporabnikom. <br>Prijavite se na tej <a style="color:white;font-weight:bold;text-decoration:underline;" href="' + location + 'prijava">POVEZAVI</a>. <a target="_blank" style="color:white;" href="https://www.rtvslo.si/strani/pogosto-zastavljena-vprasanja-faq/19#3.75"> Več informacij</a>.');      
                 
                    }else{
                        $showLoginPopup.html('Spoštovani. Ogled vsebine je možen samo na <a target="_blank" style="color:white;font-weight:bold;" href="' + data.response.showLink + '"> RTV 4D</a>');              
                    }
                    
                    $("#" + container[p].id).prepend($showLoginPopup);                                 
                }
    
                if (typeof video.clip === 'object' && video.clip !== null) {
                    clipRecording(container[p], video);
                }

                if (typeof data.response.id !== 'undefined' && (typeof data.response.category === 'undefined' || data.response.category !== 'live')) {
                    $.stats(a.id, data.response.id);
                }
            }).on('error', function(err) {
                errorHandler(err);
            }).on('visualQuality', function(e) {
                
                if(data.response.category === 'live'){
                  
                    var kanal = getStatsRTV(data.response, e);        
                    JWPlayerLoader.setData('dimension', 'Live VOD 24x7');
                    JWPlayerLoader.setData('deliveryType', 'L')  
                    JWPlayerLoader.setData("category", kanal);
                    JWPlayerLoader.setData("subCategory", kanal);
                    JWPlayerLoader.setData("title", kanal);
                }    

            }).on('all', function(e) {//VOD
                //console.log(e);

                if (e === 'userActive' && video.promo === 1) {
                    
                   // console.log('video', video)
                    var mute = this.getMute();
                    if (mute == true) {
                        this.setVolume(25);
                        this.setMute(!mute)
                    }
                }

                if (e === 'adPlay') {
                    var volume = this.getVolume();

                    //console.log('volume', volume)
                    if (volume >= 90) {
                        this.setVolume(70);
                    }
                    //this.setVolume(Math.floor(volume * 0.7));
                }
                if (e === 'adComplete' || e === 'adSkipped') {
                    var volume = this.getVolume();
                    if (volume == 70) {
                        volume = 100;
                    }
                    this.setVolume(volume);
                }

                  
                return playerInstance;

            })
            
           
            

        });
        return;
    }

    function onair(id, padding, video, container, info, data) {
        //alert();
        var $space = $("<div>");
        $space.css({
            "padding": "3%",
            "width": (video.width - (padding[1] * 2)),
            "overflow": "hidden"
        });
        $(container).append($space);

        var $videoMSGSspace = $("<div id='videoMSG'>");
        $videoMSGSspace.css({
            "padding": "3%",
            "width": (video.width - (padding[1] * 2)),
            "overflow": "hidden"
        });
        $(container).append($videoMSGSspace);

        var $onair = $("<div>");
        $onair.css({
            "float": "left",
            "background-image": "url('" + video.url["static"] + "img/onair_bg.png')",
            "background-position": "center center",
            "background-repeat": "repeat",
            "position": "relative",
            "display": "none",
            "height": "55",
            "max-width": "85%"
        });
        $space.append($onair);


        if (id == "ra.val202") {
            $onair.click(function(a) {
                window.location.href = "https://www.val202.si/glasbeni-sos/";
            });
        }

        var $logo = $("<div>");
        $logo.css({
            "background-image": "url('" + video.url["static"] + "img/onair_left.png')",
            "background-position": "top left",
            "background-repeat": "no-repeat",
            "position": "relative",
            "padding": "0px 0px 0px 43px",
            "height": "55"
        });

        $onair.append($logo);

        var refresh = (function() {

            //Check if video
            /*var statusUrl = 'http://api.rtvslo.si/ava/getStatus/';
            $.ajax({
                url: statusUrl + id,
                dataType: 'jsonp',
                cache: 'false',
                jsonpCallback: function() {
                    var random = Math.floor(Math.random() * 1000);
                    return 'ava_onair_' + random;
                },
                success: function(streamstatus) {
                	

                    $(container).setRadioShowVideo(streamstatus, data);

                    if(typeof data.response !== "undefined" &&  data.response === "on"){
                        console.log($logo);
                        var $content = $("<div>");
                        $content.css({
                                "background-image": "url('" + video.url["static"] + "img/onair_mic.png')",
                                "background-position": "0 center",
                                "background-repeat": "no-repeat",
                                "position": "relative",
                                "padding": "10px 15px 0px 29px",
                                "height": "45",
                                "color": "white",
                                "font-family": "Helvetica, sans-serif",
                                "font-size": "13px",
                                "line-height": "18px"
                            });
                        $content.append('css');
                    	
                        $('#videoMSG').append($content);
                    }
                }	
            });*/

            $.ajax({
                url: video.url["api"] + "onair/" + id,
                dataType: 'jsonp',
                cache: 'false',
                jsonpCallback: function() {
                    var random = Math.floor(Math.random() * 1000);
                    return 'ava_onair_' + random;
                },
                success: function(data) {
                    var isData = 0;
                    //alert(JSON.stringify(data.response.BroadcastMonitor.stationName));
                    if (typeof data.error === 'undefined') {
                        if (typeof data.response.BroadcastMonitor.Current !== 'undefined' && (data.response.BroadcastMonitor.Current.Interface === 'MUSIC' || (typeof data.response.BroadcastMonitor.Current.CategoryFullName !== 'undefined' && data.response.BroadcastMonitor.Current.CategoryFullName.indexOf('GLASBA') >= 0))) {
                            if (typeof data.response.BroadcastMonitor.stationName !== 'undefined' && data.response.BroadcastMonitor.stationName === 'MMR') {
                                current = "Most szól:<br />";
                            } else if (typeof data.response.BroadcastMonitor.stationName !== 'undefined' && data.response.BroadcastMonitor.stationName === 'STATIONITA') {
                                current = "Ora in onda:<br />";
                            } else if (typeof data.response.BroadcastMonitor.stationName !== 'undefined' && data.response.BroadcastMonitor.stationName === 'RSI') {
                                current = "Currently on air:<br />";
                            } else {
                                current = "Trenutno predvajamo:<br />";
                            }
                            c = data.response.BroadcastMonitor.Current;
                            if (c.artistName.length === 0) {
                                current += '<strong style="white-space:nowrap;text-overflow:ellipsis;width:100%;display:inline-block;overflow:hidden;">' + c.titleName + ' - ' + c.Comment1 + '</strong>';
                            } else {
                                current += '<strong style="white-space:nowrap;text-overflow:ellipsis;width:100%;display:inline-block;overflow:hidden;">' + c.artistName + ' - ' + c.titleName + '</strong>';
                            }

                            var $content = $("<div>");
                            $content.css({
                                "background-image": "url('" + video.url["static"] + "img/onair_mic.png')",
                                "background-position": "0 center",
                                "background-repeat": "no-repeat",
                                "position": "relative",
                                "padding": "10px 15px 0px 29px",
                                "height": "45",
                                "color": "white",
                                "font-family": "Helvetica, sans-serif",
                                "font-size": "13px",
                                "line-height": "18px"
                            });

                            $content.append(current);

                            $logo.empty();
                            $onair.css({
                                "display": "block"
                            });
                            $logo.append($content);
                            isData += 1;
                        }
                    }
                    if (isData < 1) {
                        $onair.css({
                            "display": "none"
                        });
                    }

                    setTimeout(function() {
                        refresh();
                    }, 60000);
                }
            });
        });
        refresh();
    }
    /*
        Live player 
    */
    function buildPlaylist(data, video) {
        //console.log(data.response);
        //Overide API with user selection.
        var id = '0';
        if (data && typeof data.response !== 'undefined' && data.response.id !== 'undefined') {
            id = data.response.id;
        }

        //var selected = $.cookieApi("read", null, "jwplayer.liveRadioStream" + id, 365);
        //if (selected === 'audio' && data.response.id.indexOf('tv') === -1) {
        //    data.response.mediaType = 'audio';
        //}
        var radio_stations = ["ra.a1","ra.val202","ra.ars","ra.mb1","ra.rsi","ra.kp","ra.capo","ra.mmr","ra.sport202"];
        var channel_type = 'tv';
        
        var isRadio = radio_stations.filter(function(item){
            return item == data.response.id;
        })
        if(isRadio.length > 0){
            channel_type = 'ra';
        }
        
        
        var i = [];
        switch (channel_type) {
            case "tv":
               
                var myvideo = null;
                $.each(data.response.mediaFiles, function(s) {
                    if (data.response.mediaFiles[s].mediaType === 'video') {
                        myvideo = data.response.mediaFiles[s];
                    }
                });

                if(myvideo === null){
                    console.log('missing stream files')
                    return false;
                }

                var playlist = {};
                playlist.sources = [];
                if(typeof data.response.title === 'string'){
                    ///playlist.title = data.response.title;//DC they dont want this
                }
                          
                try {
                    if (typeof data.response.images.orig !== 'undefined') {
                        playlist.image = forceSLL(data.response.images.orig);
                    }
                } catch (e) {}

     
                try {
                    if (typeof data.response.onair.current.thumbnail.link == 'string') {
                        playlist.image = forceSLL(data.response.onair.current.thumbnail.link);
                    }
                } catch (e) {}
                
        
                if (myvideo.type === "hls") {
                    playlist.sources[0] = {
                        'default': true,
                        file: (myvideo.streamer + myvideo.file),
                        type: "hls",
                        'default': 'true',
                    };
                }
                                    
                return getPreroll(playlist, data, video);
                //break;
            case "ra":

                var myvideo = null;
                var myaudio = null;
                $.each(data.response.mediaFiles, function(s) {
                    if (data.response.mediaFiles[s].mediaType === data.response.mediaType ) {// Ta pogoj odloči ali se bo zaplayal video ali audio
                        myvideo = data.response.mediaFiles[s];
                    }else{
                        myaudio = data.response.mediaFiles[s];
                    }
                });

                if(myvideo === null){
                    console.log('missing stream files')
                    return false;
                }
   
                function createPlaylist(myvideo, data, title){
                    var i = [];
                    i[0] = {};
                    i[0].sources = [];
                    var playlist = i[0];
                
                    playlist.title = title;
                    try {
                        if (typeof data.response.images.orig !== 'undefined') {
                            playlist.image = forceSLL(data.response.images.orig);
                        }
                    } catch (e) {}

                    try {
                        if (typeof data.response.onair.current.thumbnail.link == 'string') {
                            playlist.image = forceSLL(data.response.onair.current.thumbnail.link);
                        }
                    } catch (e) {}
                          
                    if (myvideo.type === "hls") {
                        playlist.sources[0] = {
                            'default': true,
                            file: (myvideo.streamer + myvideo.file),
                            type: "hls",
                        };
                    }                 
                   // console.log('playlist', playlist);
                    return playlist;
                }
       
                var playlists = [];
                playlists.push(createPlaylist(myvideo, data));
 
                //FALBACK AFTER VIDEO ENDED
                if(myaudio && myaudio.mediaType === 'audio'){
                    playlists.push(createPlaylist(myaudio, data, "Predvajanje vsebine brez video signala, samo zvok."));                     
                }
                
                //console.log('playlists', playlists);
                return playlists;

        }
        return null;
    }

    function getPreroll(i, data, video) {

        //console.log(data.response);

        //if(typeof data.response.clip !== 'undefined') return [];
        var min = 0;
        var max = 5;
        // and the formula is:
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var showPreroll = false;
        if (random === 3) {
            showPreroll = false; //11.1.2017 dost je bilo nepotrebnega obremenjevnja userjev
        }


        var playlist = [];
        var t = null;
        if (typeof data.response.showTypeId !== 'undefined' && typeof video.preroll[data.response.showTypeId] !== 'undefined') {
            t = video.preroll[data.response.showTypeId];
        }
        if (typeof data.response.category !== 'undefined' && typeof video.preroll[data.response.category] !== 'undefined') {
            t = video.preroll[data.response.category];
        }

        //console.log('data ' , data);
        //UEFA
        var UEFA = 'xxx';
        if (data.response.showId === UEFA /* || data.response.id === 'tv.slo2' || data.response.id === 'tv.mmctv'*/ ) {


            showPreroll = true;
            t = {
                rtmp: '/2016/06/07/RKL-REKLAME-20160607-000-UEFAEURO2016DigitalMediaBumper_0.mp4',
                html5: '/2016/06/07/RKL-REKLAME-20160607-000-UEFAEURO2016DigitalMediaBumper_0.mp4'
            }
            var duration = parseInt(data.response.duration, 10);
            if (duration > 600) {
                t = {
                    rtmp: '/2016/06/10/RKL-REKLAME-20160610-000-UEFAEURO2016uvodnaspica_19201223.mp4',
                    html5: '/2016/06/10/RKL-REKLAME-20160610-000-UEFAEURO2016uvodnaspica_19201223.mp4'
                }
            }
        }




        if (showPreroll === true && t !== null && data.response.mediaType === "video" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false /* && typeof data.response.clip == 'undefined'*/ ) {
            //console.log('.................');
            var preroll = {};
            preroll.sources = [];
            //console.log(data.response.mediaFiles);
            var streamer = IOS_RTVSLO_SI_SERVER + "/simplevideostreaming42";
            if (data.response.mediaFiles.length > 0) {
                if (typeof data.response.mediaFiles[0].streamers !== 'undefined') {
                    streamer = data.response.mediaFiles[0].streamers.hls;
                }

            }
            //EUFA
            //if (data.response.showId === UEFA /*|| data.response.id === 'tv.slo2' || data.response.id === 'tv.mmctv'*/) {
            //    streamer = STREAM_SERVER + '/ava_archive03';
            //     video.streamer["rtmp"] = "rtmp://stream.rtvslo.si/ava_archive03";
            //    video.streamer["html5"] = PROTOCOL + "videoweb.rtvslo.si/ava_archive03";
            // }

            var RAND = Math.floor(Math.random() * 10011111);
            var hls_stream_server = streamer + "/_definst_/" + t["rtmp"] + "/playlist.m3u8?RAND=" + RAND;
            hls_stream_server = replaceEndpointHLS(hls_stream_server);
            preroll.sources.push({
                file: hls_stream_server,
                type: "hls"
            });

            preroll.sources.push({
                file: (video.streamer["rtmp"] + "/mp4:" + t["rtmp"]),
                type: "rtmp"
            });

            preroll.sources.push({
                file: (video.streamer["html5"] + t["html5"]),
                type: "mp4"
            });

            if (typeof i.image !== 'undefined') {
                preroll.image = i.image;
            }

            //console.log('preroll ' , preroll);
            playlist[0] = preroll;
            playlist[1] = i;

            //console.log("playlist ", playlist);

            //UEFA POST ROLL
            /*if (data.response.showId === UEFA) {

                var duration = parseInt(data.response.duration, 10);
                if (duration > 600) {
                    var clone = JSON.parse(JSON.stringify(preroll));
                    c = {
                        rtmp: '/2016/06/10/RKL-REKLAME-20160610-000-UEFAEURO2016ClosingSequence_0.mp4',
                        html5: '/2016/06/10/RKL-REKLAME-20160610-000-UEFAEURO2016ClosingSequence_0.mp4'
                    }

                    clone.sources[0] = {
                        file: (streamer + "/_definst_/" + c["rtmp"] + "/playlist.m3u8?RAND=" + RAND),
                        type: "hls"
                    }
                    clone.sources[1] = {
                        file: (video.streamer["rtmp"] + "/mp4:" + c["rtmp"]),
                        type: "rtmp"
                    }
                    clone.sources[2] = {
                        file: (video.streamer["html5"] + c["html5"]),
                        type: "mp4"
                    }
                    playlist[2] = clone;

                } else {
                    playlist[2] = preroll;
                }
            }*/
        } else {
            playlist[0] = i;
        }
        if (typeof data.response.clip !== 'undefined') {
            //console.log(playlist);
        }

        //console.log('playlist', playlist)
        var modified = playListToSSL(playlist);

        //console.log("modified ", modified);
        return modified;
    }

    function playListToSSL(playlist) {
        var list = playlist || [];
        list.map(function(itm) {
            if (typeof itm.image === 'string' && itm.image.indexOf(PROTOCOL) === -1) {
                itm.image = itm.image.replace('http://', PROTOCOL);
            }
            if (typeof itm.sources !== 'undefined' && typeof itm.sources.length !== 'undefined') {
                itm.sources.map(function(source) {
                    if (typeof source.file === 'string' && source.file.indexOf(PROTOCOL) === -1) {
                        source.file = source.file.replace('http://', PROTOCOL);
                    }
                })
            }
        })
        return list;
    }

    function getLogo(video, data) {
        var logo = {};
        logo.file = video.url["static"] + ((video.height > 200) ? video.logo["big"] : video.logo["small"]);
        logo.link = forceSLL("http://4d.rtvslo.si/");
        try {
            if (data.response.link) {
                logo.link = data.response.link;
            }
        } catch (e) {};

        logo.position = "bottom-right";
        logo.hide = true;

        var isLogo = true;
        $.each(video.domains, function(t) {
            if (location.host.toLowerCase().indexOf(video.domains[t]) >= 0) {
                isLogo = false;
                return false;
            }
        });

        if (isLogo) {
            return logo;
        }
        return false;
    }

    function clipRecording(container, video) {

        var startSeconds = 0;
        if (typeof video.clip.start !== 'undefined') {
            if (typeof video.clip.start === 'string') {
                var start = video.clip.start.split(":");
                if (start.length === 3) {
                    var startSeconds = 0;
                    startSeconds += Math.floor(start[0]) * 60 * 60;
                    startSeconds += Math.floor(start[1]) * 60;
                    startSeconds += Math.floor(start[2]);
                    if (startSeconds > 0) {
                        video.clip.offset = startSeconds;
                    }
                }
            }
        } else {
            video.clip.start = -1;
        }

        var endSeconds = 0;

        //console.log("video.clip.end ", video.clip.end = null);

        if (typeof video.clip.end !== 'undefined') {

            if (typeof video.clip.end === 'string') {
                var end = video.clip.end.split(":");
                if (end.length === 3) {
                    var endSeconds = 0;
                    endSeconds += Math.floor(end[0]) * 60 * 60;
                    endSeconds += Math.floor(end[1]) * 60;
                    endSeconds += Math.floor(end[2]);
                    if (endSeconds > 0 && endSeconds > startSeconds) {
                        video.clip.duration = endSeconds - startSeconds;
                    }
                }
            }
        }


        if (typeof video.clip.offset === 'undefined' && typeof video.clip.duration === 'undefined') {
            return;
        }

        if (typeof video.clip.offset === 'string') {
            video.clip.offset = parseInt(video.clip.offset, 10) || -1;
        }

        if (typeof video.clip.duration === 'string') {
            video.clip.duration = parseInt(video.clip.duration, 10) || -1;
        }

        rtvdef.offset = video.clip.offset;

        var state = 0;

        function clipPlay(player) {

            if (video.clip.offset !== -1) {
                var offset = parseInt(video.clip.offset, 10) || 0;
                if (offset > 0) {
                    player.seek(video.clip.offset);
                }
            } else {
                video.clip.offset = 0;
            }

            if (video.clip.duration !== -1) {
                player.onTime(function(c) {
                    if (c.position >= (video.clip.offset + video.clip.duration)) {
                        player.stop();
                        state = 1;
                    }
                });
            }
        };


        if (jwplayer(container.id).getPlaylist().length > 1) {

            jwplayer(container.id).onPlaylistItem(function(a) {

                if (jwplayer(container.id).getPlaylist().length - 1 === jwplayer(container.id).getPlaylistIndex()) {
                    //jwplayer(container.id)
                    jwplayer(container.id).onPlay(function(a) {
                        clipPlay(jwplayer(container.id));
                        if (state > 0) {
                            jwplayer(container.id).playlistItem(0);
                            state = 0;
                        }
                    });
                }
            });
        } else {
            state = 1;
            jwplayer(container.id).onPlay(function(a) {
                if (state > 0) {
                    clipPlay(jwplayer(container.id));
                    state = 0;
                }
            });
        }
    }

    function playFiles(container, info, video) {

        //console.log("container ", container);
        //console.log("info 1", info);
        //console.log("video ", video);

        info.playlist = [];
        info.playlist[0] = {};
        if (typeof video.image !== "undefined") {
            info.playlist[0].image = video.image;
        }

        info.playlist[0].sources = [];
        var t = 0;
        data = {};
        data.response = {};
        data.response.mediaType = "video";
        if (typeof video.playfile["rtmp"] !== "undefined") {
            info.playlist[0].sources[t] = {
                file: video.playfile["rtmp"],
                type: "rtmp"
            };
            if (video.playfile["rtmp"].indexOf(".mp3") > 0 || video.playfile["rtmp"].indexOf(".wav") > 0) {
                data.response.mediaType = "audio";
            }
            t += 1;
        }

        if (typeof video.playfile["html5"] !== "undefined") {
            if (video.playfile["html5"].indexOf(".mp3") > 0 || video.playfile["html5"].indexOf(".wav") > 0) {
                info.playlist[0].sources[t] = {
                    file: video.playfile["html5"],
                    type: "mp3"
                };
                data.response.mediaType = "audio";
            } else {
                info.playlist[0].sources[t] = {
                    file: video.playfile["html5"],
                    type: "mp4"
                };
            }
            t += 1;
        }

        try {
            if (typeof video.ads["common"]["pre"] !== "undefined") {
                data.response.zone_id = video.ads["common"]["pre"];
            }
            if (typeof video.ads["common"]["post"] !== "undefined") {
                data.response.zone_id = video.ads["common"]["post"];
            }
        } catch (e) {};

        return showPlayer(container, data, info, video);
    }

    $.fn.setRadioShowVideo = function(streamstatus, data) {

        var streamType = 'audio';
        var curr = $.cookieApi("read", null, "jwplayer.streamType", 365);
        if (curr === 'video') {
            streamType = 'video';
        }
        //console.log(data);
        var id = '0';
        if (typeof data.response !== 'undefined' && typeof data.response.response !== 'undefined' && data.response.response.id !== 'undefined') {
            id = data.response.response.id;
        }

        var container = $(this);
        //console.log(data);
        $.each(container, function(t) {



            if (typeof streamstatus.response !== "undefined" && streamstatus.response === "on") {

                jwplayer(container.id).removeButton("jwplayer.radioShow_Video");

                //console.log("container", container[0].id);
                var playerRef = '#' + container[0].id + '_bottom';

                if (streamType === 'video') {
                    $(playerRef).addClass('showRadio');
                    $(playerRef).removeClass('showTV');
                    jwplayer(container.id).addButton("", "Preklopi na audio vir", function() {

                        $.cookieApi("set", "audio", "jwplayer.liveRadioStream" + id, 365);
                        setTimeout(function() {
                            location.reload();
                        }, 250)


                    }, "jwplayer.radioShow_Video");
                } else {
                    $(playerRef).removeClass('showRadio');
                    $(playerRef).addClass('showTV');
                    jwplayer(container.id).addButton("", "Preklopi na video vir", function() {

                        $.cookieApi("set", "video", "jwplayer.liveRadioStream" + id, 365);
                        setTimeout(function() {
                            location.reload();
                        }, 250)

                    }, "jwplayer.radioShow_Video");
                }
            }

            if (typeof streamstatus.response !== "undefined" && streamstatus.response === "off") {
                //console.log('removeButton');
                var cookieInfo = $.cookieApi("read", null, "jwplayer.liveRadioStream" + id, 365);
                //console.log("cookieInfo ", cookieInfo);
                if (cookieInfo === true) {
                    $.cookieApi("set", "audio", "jwplayer.liveRadioStream" + id, 365);
                    location.reload();
                }
                jwplayer(container.id).removeButton("jwplayer.radioShow_Video");

            }


        });
        return;
    }

    $.fn.setButtons = function(video, data, info) {
        var container = $(this);
        //console.log(video);
        $.each(container, function(t) {


            if (video.buttons["quality"]) {
                jwplayer(container[t].id).addButton((video.url["static"] + video.buttons["qualityButton"]), "Kvaliteta video prenosa", function() {

                    var player = $("#" + container[t].id);
                    var playlist = data.response.mediaFiles;

                    var $wrapper = $("<div>", {
                        id: (container[t].id + '_qualitypick'),
                        align: "center"
                    });
                    $wrapper.css({
                        "width": player.width(),
                        "height": player.height(),
                        "background-color": "black"
                    });
                    player.before($wrapper);

                    var $wrapper2 = $("<div>");
                    $wrapper2.css({
                        "width": "300",
                        "padding-top": (Math.floor((player.height()) * 0.2))
                    });
                    $wrapper.append($wrapper2);

                    $content = $("<div>");
                    $content.css({
                        "color": "white",
                        "font": "22px Helvetica, sans-serif",
                        "padding": "5px 5px 20px 5px"
                    });
                    $content.html("Izberite kvaliteto videa");
                    $wrapper2.append($content);

                    player.hide();

                    $.each(data.response.mediaFiles, function(x) {
                        if (data.response.mediaFiles[x].mediaType === "octoshape") {
                            $content = $("<a/>", {
                                href: "javascript:void(0);"
                            });
                            $content.html(video.quality[data.response.mediaFiles[x].bitrate]);
                            $content.css({
                                "height": "32",
                                "width": "192",
                                "display": "block",
                                "background-image": "url(" + video.url["static"] + "img/quality.png)",
                                "background-position": "top left",
                                "background-repeat": "no-repeat",
                                "color": "white",
                                "font": "14px Helvetica, sans-serif",
                                "line-height": "30px",
                                "text-decoration": "none",
                                "margin-bottom": "10px"
                            });
                            if (data.response.mediaFiles[x].bitrate === video.bitrateRel) {
                                $content.css({
                                    "background-image": "url(" + video.url["static"] + "img/quality_active.png)"
                                });
                            }

                            $content.click(function(event) {
                                event.preventDefault();
                                $.cookieApi("set", data.response.mediaFiles[x].bitrate, "jwplayer.quality", 365);
                                $wrapper.remove();
                                player.show();
                                info.playlist = buildPlaylist(data, video);
                                info.autostart = true;
                                info.disableAds = true;
                                window.location.reload();
                                //showPlayer(container, data, info, video);
                            });
                            $wrapper2.append($content);
                        }
                    });

                }, "jwplayer.quality");
            }
        });
        return;
    }

    $.fn.setButtonsCC = function(video, data, info) {
        
      
        var container = $(this);

        $.each(container, function(t) {
   
                jwplayer(container[t].id).addButton("//img.rtvslo.si/_static/r1/rtv4d/app/img/fontsizeicon.png", "Velikost podnapisov", function() {

                    var player = $("#" + container[t].id);
                    var playlist = 
                    [
                        {
                            label: 'Majhna',
                            size: 12,
                        },
                        {
                            label: 'Srednja',
                            size:  16,
                        },
                        {
                            label: 'Velika',
                            size: 22,
                        }
                      ];

                    var $wrapper = $("<div>", {
                        id: (container[t].id + '_closecaptions_pick'),
                        align: "center"
                    });
                    $wrapper.css({
                        "width": player.width(),
                        "height": player.height(),
                        "background-color": "black"
                    });
                    player.before($wrapper);

                    var $wrapper2 = $("<div>");
                    $wrapper2.css({
                        "width": "300px",
                        "padding-top": "0px"//(Math.floor((player.height()) * 0.2))
                    });
                    $wrapper.append($wrapper2);

                    $content = $("<div>");
                    $content.css({
                        "color": "white",
                        "font-size": "20px",
                        "padding": "5px 5px 20px 5px"
                    });
                    $content.html("Izberite velikost podnapisov");
                    $wrapper2.append($content);

                    player.hide();

                    $.each(playlist, function(x) {
                        
                            $content = $("<a/>", {
                                href: "javascript:void(0);",
                                'data-size': playlist[x].size 
                            });
                            $content.html(playlist[x].label);
                            $content.css({
                                "height": "32",
                                "width": "192",
                                "display": "block",
                                "background-image": "url(" + video.url["static"] + "img/quality.png)",
                                "background-position": "top left",
                                "background-repeat": "no-repeat",
                                "color": "white",
                                "font": "16px",
                                "line-height": "30px",
                                "text-decoration": "none",
                                "margin-bottom": "10px"
                            });
                            

                            $content.click(function(event) {
                                event.preventDefault();
                                //$.cookieApi("set", data.response.mediaFiles[x].bitrate, "jwplayer.quality", 365);
                                $wrapper.remove();
                                player.show();
                                var size = $(event.currentTarget).data('size');
                                jwplayer(container[t].id).setCaptions({'fontSize': size});
                                //console.log('event',$(event.currentTarget).data('size') );
                               
                            });
                            $wrapper2.append($content);
                        
                    });

                    
               
                }, "jwplayer.ccSize", "icon ccSize");
            
        });
        return;
    }

    $.cookieApi = function(action, value, name, days) {
        switch (action) {
            case "set":
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = (days > 0) ? "; expires=" + date.toUTCString() : "";
                document.cookie = name + "=" + encodeURIComponent(value) + expires + ";domain=." + document.domain + "; path=/";
                break;
            case "read":
                var nameEQ = name + "=",
                    ca = document.cookie.split(';'),
                    value = '',
                    firstChar = '',
                    parsed = {};
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) {
                        value = c.substring(nameEQ.length, c.length);
                        firstChar = value.substring(0, 1);
                        if (firstChar === "{") {
                            parsed = JSON.parse(value);
                            if ("v" in parsed) return parsed.v;
                        }
                        if (value === "undefined") return false;
                        return decodeURIComponent(value);
                    }
                }
                break;
        }
        return false;
    }

    $.showPopup = function(action, id, options) {
        var wH = ($(document).height() > $(window).height()) ? $(document).height() : $(window).height();
        var wW = $(window).width();

        var close_btn = '40';
        var close_btn_margin = "-30px -30px 0 0";

        if (typeof wW !== 'undefined' && wW > 0) {
            //options.width = Math.round(wW / 2);
            //options.height = Math.round((options.width * 9) / 16);
            if (wW > 1024) {
                options.width = '100%';
                options.height = 540;
            } else {
                options.width = '100%';
                options.height = 540;
                close_btn = '60';
                close_btn_margin = "-40px -20px 0 0";
            }

        }



        var video = $.extend({}, defaults, options, rtvdef);

        var $popup = $("<div>", {
            id: "rtv4d_popup",
            align: "center"
        });
        $popup.css({
            "width": wW,
            "height": wH,
            "position": "fixed",
            "top": "0",
            "left": "0",
            "background-image": "url(" + video.url["static"] + "img/popup_bg.png)",
            "background-position": "top left",
            "background-repeat": "repeat",
            "z-index": "99999"
        });
        $("body").append($popup);
        $("object, embed").css({
            "visibility": "hidden"
        });

        window.onclick = function(event) {     
                                 
            var modal = document.getElementById('rtv4d_popup');             
            if (event.target == modal) {
                //console.log('event', event.target);
                event.stopImmediatePropagation();
                event.stopPropagation()
                event.preventDefault();
                //console.log('modal', modal);
                //$popup.remove(); 
                $popup.remove(); 
                rtvdef.playerStatus = false;
                $("object, embed").css({
                    "visibility": "visible"
                });
                //modal.style.display = "none";
            }
        }

        var $e = $("<div>");
        $e.css({
            "width": video.width,
            "background-color": "black",
            "max-width": "980px",
            "padding": "10px",
            "position": "relative",
            "top":"55px"
        });
        $popup.append($e);
        if ($e.outerWidth() !== video.width + 20) {
            $e.css({
                "width": video.width + 20
            });
        }

        var $logo = $("<a>", {
            "href": "javascript:void(0);",
            "target" : '_blank',
            "title" : "Ogled na 4D",
            "id" : "4d_popup_link"
        });
        $logo.css({
            "width": "75px",
            "height": "40px",
            "background-image": "url('https://img.rtvslo.si/_static/r1/rtv4d/app/img/logo_mmc.png')",
            "background-position": "center center",
            "background-repeat": "no-repeat",
            "background-size": "75px",
            "position": "absolute",
            "top": "-45px",
            "left": "10px",
            
        });

        var $close = $("<a>", {
            "href": "javascript:void(0);",
            "id":"close_popup_btn"
        });
        $close.css({
            "width": "30px",
            "height": "30px",
            "background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALlSURBVHhe7dw7bhsxEIBhxUdIkTQ5QGp36ewy5zYgCXrAgoFUySHSuEiRbLgIB6CDfXBf5Az5f8BA9ooFwR/QCltoBwAAAAAAAAAAAGyvaZp3/k8soPIcr9frl/P5vL/dbh/8Jcyw3+/fu3N8cvPgL+XXxr1cLj/dNG5j34g8j4979ef4qiJyGFeGyNOFcYNzbCM/+iXptfcKt4F9uKlgc0SO1BU3OMcXd853fml6bcQ2Zs/miDxiJO6P4/H4yS/Nh8jzmIgriDyNqbiCyHFMxhVEHmY6riBytyLiCiK/VVRcQeR/iowrao9cdFxRa+Qq4oraIlcVV9QSucq4ovTIVccVpUYmbqC0yMTtUEpk4g6wHpm4EaxGJu4E1iITdwYrkYm7gPbIxF2B1sgjcb8TdwJtkYm7AS2Ribuh3JGJm0CuyMRNKHVk4maQKjJxM9o6MnEV2CoycRVZOzJxFVorMnEVWxqZuAbMjUxcQ6ZGJq5BsZGJa9hYZPf6mbjGjUT+3XOduJYMRf5/iGtUTGTiGucitvfcvo/lP27u/VJYM/RtWca9H/3EC4rExJUhsjFT4soQ2Yixhxhu7tuYPe8TWbPYJ1RD366JrFRsXEFkQ6bGFUQ2YG5cQWTFlsYVRFZorbiCyIqsHVcQWYGt4goiZ7R1XEHkDFLFFUROKHVcQeQEcsUVRN5Q7riCyBvQEleMRT4cDh/9UozRFlcQeQVa4woiL6A9riDyDFbiijYikSONxFX784BEjmA1riDyAOtxBZE7lBJXEDlQWlxBZKfUuKLqyKXHFVVGriWuqCpybXFFFZFrjSuKjlx7XFFkZOK+VVRk4nYrIjJxh5mOTNw4JiMTdxpTkYk7j4nIxF1GfWS3iaeezRE30lBkN89N09z5pem5jT24eQ03RdzpuiK7/3+dTqevfkk+YWTizhdGVhNXuA09unkh7jJtZBf4WVVckfVeURDOEQAAAAAAAAAAAMAqdru/bi+cNWdojyUAAAAASUVORK5CYII=')",
            "background-position": "center center",
            "background-repeat": "no-repeat",
            "background-size": "30px",
            "position": "absolute",
            "top": "-40px",
            "right": "5px",
            
        });
        $e.append($logo);
        $e.append($close);
        $close.on('click',function(e) {
            e.stopImmediatePropagation();
            e.stopPropagation()
            e.preventDefault();
            //jwplayer("rtv4d_player").remove();
            $popup.remove();
            rtvdef.playerStatus = false;
            $("object, embed").css({
                "visibility": "visible"
            });
        });

        var $videoplayer = $("<div>", {
            id: "rtv4d_player"
        });
        $e.append($videoplayer);

        $(window).resize(function() {
            var wH = ($(document).height() > $(window).height()) ? $(document).height() : $(window).height();
            var wW = $(window).width();
            $popup.css({
                "width": wW,
                "height": wH
            });
          
            /*$e.css({
                "top": (($(window).height() / 2) - ($e.height() / 2))
            });*/
        });

        options.callback = function(a) {
            if (typeof a.error === 'undefined') {
                if (a.response && a.response.title) {

                    var $title = $("<div>");
                    $title.css({
                        "padding": "10px 0"
                    });
                    $e.append($title);
                    var $table = $("<table/>").attr("cellspacing", "0").attr("cellpadding", "0").attr("width", "100%");
                    $title.append($table);
                    var $tr = $("<tr>").attr("valign", "middle");
                    $table.append($tr);
                    var $td1 = $("<td>");
                    $td1.css({
                        "color": "white",
                        //"font": "20px Helvetica, sans-serif",
                        "font-size": "1.2rem",
                        "line-height": "1.6rem",
                        "text-align": "left"
                    });
                    $td1.append('<a style="color:white;text-decoration: none;font-size:1.2rem;" href="'+ a.response.link +'">' + a.response.title + ', <span style="font-size:0.9rem;">' + a.response.date + '</span></a>');
                    //$td1.append('<a onclick="window.open(\'' + a.response.link + '\',\'_blank\');" style="color:white;text-decoration: none;font-size:1.2rem;" href="'+ a.response.link +'">' + a.response.title + '</a>');
                    $('#4d_popup_link').attr('href',a.response.link);
                    $('#4d_popup_link').on('click',function(){
                        $('#close_popup_btn').click();
                    });

                    if (a.response.showName) {
                        $td1.append('<br /><font style="font-size:1rem;">' + a.response.showName + '</font>');
                        //$td1.append('<br /><font style="font-size:0.8rem;">' + a.response.date + '</font>');
                    }
                    $tr.append($td1);

                    var $tr2 = $("<tr>").attr("align", "right");
                    $table.append($tr2);
 
                    var $td2 = $("<td>").attr("width", "100%");
                    //$tr2.append($td2);

                    /* make sharing
                    var sharelink = (function(link, position) {
                        if (link.substring(0, 6) == "mailto") {
                            var $link = $("<a>").attr("href", link);
                        } else {
                            var $link = $("<a>").attr("href", "javascript:void(0)").click(function(e) {
                                window.open(link, "sfacebook", "toolbar=0,status=0,height=436,width=646,scrollbars=yes,resizable=yes");
                            });
                        }
                        $link.css({
                            "display": "block",
                            "width": "30",
                            "height": "30",
                            "margin": "0 10px 0 0",
                            "float": "left",
                            "background-image": "url('" + video.url["static"] + "img/rtv4dshare.jpg')",
                            "background-position": position
                        });
                        if (link.substring(0, 6) == "mailto") {
                            $link.css({
                                "margin": "0px"
                            });
                        }
                        return $link;
                    })

                    var $facebook = sharelink("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(a.response.link), "-30px 0");
                    $td2.append($facebook);

                    var $google = sharelink("https://plus.google.com/share?url=" + encodeURIComponent(a.response.link), "-60px 0");
                    $td2.append($google);

                    var $linkedin = sharelink("http://www.linkedin.com/shareArticle?url=" + encodeURIComponent(a.response.link) + "&title=" + encodeURIComponent(a.response.title), "-90px 0");
                    $td2.append($linkedin);

                    var $twitter = sharelink("https://twitter.com/intent/tweet?source=webclient&text=" + encodeURIComponent(a.response.title + " " + a.response.link), "-120px 0");
                    $td2.append($twitter);

                    var $email = sharelink("mailto:@?subject=Posnetek na RTV 4D: " + encodeURIComponent(a.response.title) + "&body=" + encodeURIComponent(a.response.link), "0px 0px");
                    $td2.append($email);

                     */

                    $clear = $("<div>");
                    $clear.css({
                        "float": "none",
                        "clear": "both"
                    });
                    $td2.append($clear);
                    //console.log(a.response.news);
                    if (typeof a.response.news !== 'undefined' || a.response.zkp !== 'undefined') {
                        
                        
                        var wW = $(window).width();

                        $related = $("<div id='related-news-popup'>");

                        if(wW > 768){        
                            $related.css({
                                "width": "100%",
                                "max-width": "320px",
                                "position": "absolute",
                                "top": "25px",
                                "right": "20px",
                                "text-align": "left",
                                "padding": "0 10px",
                                "background-color": "#171B1A",
                                "opacity": "0.85",
                                "font-size":"1rem",

                            });
                        }else{
                            $related.css({
                                "width": "100%",
                                "max-width": "100%",
                                "text-align": "left",
                                "padding": "0 10px",
                                "background-color": "#171B1A",
                                "font-size":"0.85rem",
                                "position": "relative",
                                

                            });
                        }

                        $e.append($related);

                        if (typeof a.response.news !== 'undefined'){
                            getNews(a.response.news);
                        }else if(a.response.zkp !== 'undefined'){

                            //getNews(['479793','479713','479795']);
                            //return;
                            //console.log('a.response.zkp', a.response.zkp);
                            var data = {
                                response: []
                            }
                            var item = {
                                link:a.response.zkp.url,
                                title:a.response.zkp.title,
                                artist: a.response.zkp.artist,
                                lead_image:{
                                    image:{
                                        fp1:a.response.zkp.thumbnail_url,
                                    }
                                }
                            }
                            data.response.push(item);
                            succeseCallBack(data, 'zkp');
                        }

                        function getNews(news_array){
                            var news = news_array.join();
                            var urlgetItems = "https://api.rtvslo.si/news/getItems?client_id=82013fb3a531d5414f478747c1aca622&id=" + news + "&prepare=medium";
                            getAjaxData(urlgetItems);
                        }

                        function getAjaxData(url){
                            $.ajax({
                                type: 'GET',
                                url: url,
                                contentType: "application/json",
                                dataType: 'jsonp',
                                success: function(json) {
                                    succeseCallBack(json, 'news');
                                },
                                error: function(e) {
                                    console.log(JSON.stringify(e));
                                }
                            });
    
                        }

                        
                        
                        function succeseCallBack(data, type) {
                            if (typeof data.response === 'undefined') return null;
                            var dataArray = [];
                           if(typeof options.showrelatednews !== 'undefined') {
                               if(options.showrelatednews === false){
                                   return
                               }
                           }      
                           
                           var widget_title = 'Preberite na portalu rtvslo.si';
            
                            //var template = '<div style="height:60px;"><a onclick="window.open(\'{link}\',\'_blank\');" style="color:white;position:relative;float:left;" target="_blank" href="{link}"><img style="width:65px;position:absolute;top:0px;" src="{img_src}" /><span style="padding:0px 5px 0 75px;display:inline-block;font-weight:600;font-size:0.85rem;line-height:1.1rem;">{title}</span></div>';
                            var template = '<div style="height:60px;"><a style="color:white;position:relative;float:left;" target="_blank" href="{link}"><img style="width:65px;position:absolute;top:0px;" src="{img_src}" /><span style="padding:0px 5px 0 75px;display:inline-block;font-weight:600;font-size:0.85rem;line-height:1.1rem;">{title}</span></a></div>';
                             
                            if(type === 'zkp'){
                                widget_title =  'Založba RTV Slovenija predstavlja.';
                                template = '<div style="height:80px;"><a style="color:white;position:relative;float:left;" target="_blank" href="{link}"><img style="width:65px;position:absolute;top:0px;" src="{img_src}" /><div style="padding:0px 5px 0 75px;display:inline-block;font-weight:600;font-size:0.85rem;line-height:1.1rem;">{title}</div><div style="padding:0px 5px 0 75px;display:inline-block;font-size:0.85rem;line-height:1.1rem;">{artist}</div></a><a class="zkpWidget" href="{link}" target="_blank">Nakup</a></div>';
                            }
     
                            
                            
                            var index = 0;
                            $.each(data.response, function(key, value) {
                                index++;
                            });

                           
                            dataArray.push('<div style="padding:5px 0 10px 0px;color:white;">' + widget_title + '</div><a href="javascript:void(0);" onclick="this_is_very_long_global_function243534()" style="position: absolute;right: -8px;padding: 20px 20px 20px 40px;color: #eee;top: -21px;font-size: 1.3rem;cursor: pointer;">x</a>');
  
                            $.each(data.response, function(key, value) {
                                //console.log(value);
                                var divWidth = Math.floor(100 / index);

                                var location = window.location.href.indexOf('beta.rtvslo.si') > -1 ? 'https://beta.rtvslo.si' : 'https://www.rtvslo.si';
                                var link = location + value.link;
                                if(type === 'zkp'){
                                    link = value.link;
                                }
                               
                               var tmp1 = template.replace('{link}', link).replace('{link}', link).replace('{title}', value.title).replace('{img_src}', value.lead_image.image.fp1).replace('http://', 'https://').replace('{wproc}', divWidth);
                                if(type === 'zkp'){
                                    tmp1 = tmp1.replace('{artist}', value.artist);
                                }
                                dataArray.push(tmp1);
                            });
                            template = dataArray.join('');
                            $related.append(template);
                            $('#related-news-popup').animate({
                                width: '100%'
                            }, 500);

                            if(type === 'news'){
                                setTimeout(function() {
                                    $('#related-news-popup').hide();
                                }, 8000);
                            }

                            window.this_is_very_long_global_function243534 = function(e){
                                if(e){
                                    e.stopImmediatePropagation();
                                    e.stopPropagation()
                                    e.preventDefault();
                                }
                                $('#related-news-popup').hide();
                            }

                        }              
                       
                    }


                }
                //Browser hack
                /*setTimeout(function() {
                    $e.css({
                        "display": "block",
                        "top": (($(window).height() / 2) - ($e.height() / 2))
                    });
                }, 250);
                */

                $(document).keyup(function(e) {
                    if (e.keyCode === 27) {
                        //jwplayer("rtv4d_player").remove();
                        $('#rtv4d_popup').remove();
                        rtvdef.playerStatus = false;
                        $("object, embed").css({
                            "visibility": "visible"
                        });
                    }
                });
            } else {
                //console.log(a.error);
                $popup.remove();
            }
        }

        if (typeof options.autostart === 'undefined') {
            options.autostart = "true";
        }

        switch (action) {
            case "live":
                $("#rtv4d_player").playLive(id, options);
                break;
            case "vod":
                $("#rtv4d_player").playVod(id, options);
                break;
        }
        return;
    }

    $.isPlayerOpen = function() {
        return rtvdef.playerStatus;
    }

    $.stats = function(c, id) {

        //console.log(c);
        //console.log(id);
        var current = 0;
        var sum = 0;
        var item = 0;
        var playlist = jwplayer(c).getPlaylist();

        /* calculate and store new sum */
        var cal = (function(old, n) {
            if (playlist.length === 1 || (jwplayer(c).getPlaylistIndex() === playlist.length - 1)) {
                if (old > n) {
                    sum += old - n;
                }
                if (n > old) {
                    sum += n - old;
                }
                if (sum >= 4) {
                    var s = Math.round(sum);
                    sum = 0;
                    cookie(id, s);
                }
            }
        });

        /* set cookie */
        var cookie = (function(id, s) {
            if (typeof id === 'undefined' || typeof s === 'undefined') {
                return false;
            }

            // hash$avaid-duration+avaid-duration+avaid-duration
            var isEnd = (id === false && s === false) ? true : false;
            if (isEnd === false) {
                id = parseInt(id);
                s = parseInt(s);
                if (isNaN(id) === true || isNaN(s) === true || id < 11 || s > 10) {
                    return false;
                }
            }
            var value = $.cookieApi("read", null, "rtv.statistic", 0);
            var hash = random();

            if (typeof value === 'undefined' || value === false || value.length < 1) {
                if (isEnd === true) {
                    return false;
                }
                var newline = [];
                newline[0] = id;
                newline[1] = s;
                var newcookie = [];
                newcookie[0] = random();
                newcookie[1] = newline.join("-");
                if (isEnd === false) {
                    $.cookieApi("set", (newcookie.join("$")), "rtv.statistic", 30);
                }
                return false;
            }

            var listOne = value.split("$");
            if (listOne.length > 0 && listOne[0].length == hash.length) {
                var newcookie = [];
                newcookie[0] = listOne[0];
                var newline = [];
                var inside = 0;
                if (typeof listOne[1] !== 'undefined') {
                    var listTwo = listOne[1].split("+");
                    if (listTwo.length > 0) {
                        for (i = 0; i < listTwo.length; i++) {
                            if (listTwo[i].length > 0) {
                                var listThree = listTwo[i].split("-");
                                if (listThree.length == 2) {
                                    listThree[0] = parseInt(listThree[0]);
                                    listThree[1] = parseInt(listThree[1]);
                                    if (isNaN(listThree[0]) === false && isNaN(listThree[1]) === false) {
                                        if (isEnd === true) {
                                            try {
                                                sendRequest(listOne[0], listThree[0], listThree[1]);
                                            } catch (e) {}
                                        } else {
                                            if (listThree[0] >= 10 && listThree[1] >= 60) {
                                                try {
                                                    sendRequest(listOne[0], listThree[0], listThree[1]);
                                                } catch (e) {}
                                            } else {
                                                if (listThree[0] == id) {
                                                    var current = (newline.length < 1) ? 0 : newline.length + 1;
                                                    newline[current] = [];
                                                    newline[current][0] = id;
                                                    newline[current][1] = listThree[1] + s;
                                                    inside += 1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (inside === 0 && isEnd === false) {
                    var current = (newline.length < 1) ? 0 : newline.length + 1;
                    newline[current] = [];
                    newline[current][0] = id;
                    newline[current][1] = s;
                }

                if (newline.length > 0) {
                    var newitem = [];
                    for (i = 0; i < newline.length; i++) {
                        newitem[i] = newline[i].join("-");
                    }
                    newcookie[1] = newitem.join("+");
                }
                $.cookieApi("set", (newcookie.join("$")), "rtv.statistic", 30);
                return false;
            }

            $.cookieApi("set", "", "rtv.statistic", 30);
            return false;
        });

        /* send request to API */
        var sendRequest = (function(hash, id, duration) {
            //console.log('sendRequest stats', duration);
            var id = id + '';
            if (typeof hash !== 'undefined' && id !== 'undefined' && id >= 10 && typeof duration !== 'undefined' && duration > 0) {
                var link = rtvdef.url["api"] + "stats/log/vod/" + id + "/" + hash + "/" + duration + "/?t=" + Math.floor(Math.random() * 1000);
                //console.log("link ", link);
                //console.log('sendRequest stats on time')
                $.getScript(link);
            }
        });

        /* send request to API #2 */
        var sendRequestPlay = (function(id) {
            var id = id + '';
            if (id !== 'undefined' && id.length > 1) {
                var link = rtvdef.url["api"] + "stats/log/vodplay/" + id + "/?t=" + Math.floor(Math.random() * 1000);
                //console.log('sendRequest stats play')
                $.getScript(link);
            }
        });

        /* send request to API #3 */
        var sendRequestCaptions = (function(id) {
            
            var id = id + '';
            if (id !== 'undefined' && id.length > 1) {
                var link = rtvdef.url["api"] + "stats/log/vodcaptions/" + id + "/?t=" + Math.floor(Math.random() * 1000);
                console.log('sendRequestCaptions stats');
                $.getScript(link);
            }
        });

        /* get random string */
        var random = (function() {
            return (new Date()).getTime().toString() + (10000 + Math.floor(Math.random() * 89999)).toString();
        });

        /* event handlers */
        jwplayer(c).on('seek', function(i) {
            cal(current, i.position);
            current = i.offset;
        });

        jwplayer(c).on('all', function(i) {
            //console.log("all ", i);
        });
        /* event handlers 

        jwplayer(c).on('all', function(i) {
            console.log("all ", i);
        });

     
        
  
        

                jwplayer(c).on('idle', function (i) {
                    console.log("idle ", i);
                });
                */
        jwplayer(c).on('time', function(i) {
            // console.log('time',i);
            function isInt(n) {
                return n % 1 === 0;
            }
            if (isInt(i.position) === true) {
                //console.log(i.position);
                if (i.duration - i.position < 15 && i.duration > 10) {
                    if ($('#related-news-popup').length) {
                        $('#related-news-popup').show();
                    }
                }
                if (i.position % 60 === 0) {
                    //console.log('miniute timer...');
                }
            }

            if (rtvdef.offset > 0 && i.position === 0) {
                current = rtvdef.offset;
            } else {
                cal(current, i.position);
                current = i.position;
            }
        });

        var isPlayed = false;
        var isCaptions = false;

        jwplayer(c).on('error', function(e) {

            /*if (e && e.message && typeof e.message === 'string' && (e.message.indexOf('You do not have permission') != -1 || e.message.indexOf('The live stream is either down or has ended') != -1)) 
            {

               console.log('GEOBLOCKED');
               jwplayer(c)
                   .setConfig([{
                       repeat: true,
                       autostart: 'viewable',
                       mute: false,
               }]).load([
                   
                   {
                       'type': 'hls',
                       'file': 'https://rtvsloblock.akamaized.net/intermission_clip/playlist.m3u8',
                   },
                   {
                       'type': 'hls',
                       'file': 'https://rtvslolive.akamaized.net/hls/live/584144/rtv_channel2/ch2/playlist.m3u8',
                   }
               
               ]).play();

           }
           else {*/
               var error = '<div class="custom-error-msg-jw">Napaka pri predvajanju vsebine... </div>'
               $('#' + e.id).after();
               setTimeout(function() {
                   $('.custom-error-msg-jw').hide();
               }, 3000);
           //}

       });

        jwplayer(c).on('play', function(i) {



            if (isPlayed === false) {
                try {
                    sendRequestPlay(id);
                } catch (e) {}
                isPlayed = true;
            }
            if (item !== jwplayer(c).getPlaylistIndex()) {
                current = 0;
                if (rtvdef.offset > 0) {
                    current = rtvdef.offset;
                }
            }
            item = jwplayer(c).getPlaylistIndex();

            var captionsIndex = jwplayer(c).getCurrentCaptions();
            if (typeof captionsIndex !== 'undefined' && captionsIndex > 0 && isCaptions === false) {
                sendRequestCaptions(id);
                isCaptions = true;
            }
        });

        jwplayer(c).on('captionsChanged', function(track) {
            //console.log('captionsChanged');
            if (isCaptions === false && typeof track.track !== 'undefined' && track.track > 0) {
                sendRequestCaptions(id);
                isCaptions = true;
            }
        });

        jwplayer(c).on('complete', function(i) {

            //console.log("i ", i);
            if (playlist.length === 1 || (jwplayer(c).getPlaylistIndex() === playlist.length - 1)) {
                cal(current, jwplayer(c).getPosition());
                cookie(false, false);
            }
            if ($('#related-news-popup').length) {
                $('#related-news-popup').hide();
            }
        });



        $(window).on('adPlay', function() {
            /* send cookie data to API */
            cookie(false, false);
            return;
        });
    }

    var defaults = {
        width: '100%',
        //height: 560,
        autostart: "false",
        jwkey: "wMrsgIDs46HWntucdKHhTdb/wr/Yd1TQ0d7iig==",
        captions: null,
        controls: true,
        bitrate: null,
        image: null,
        playfile: null,
        playlistXML: null,
        clip: null,
        onair: "true",
        callback: null
    }

    var rtvdef = {
        url: {
            "api": 'https://api.rtvslo.si/',
            "static": 'https://img.rtvslo.si/_static/r666/rtv4d/',
        },
        ads: {
            "xml": PROTOCOL + "ads.rtvslo.si/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll:0.0-0%3D[OPENXID]&nz=1&source=&r=[RANDOM]&block=1&format=vast&charset=UTF-8",
            "common": {
                "pre": "173",
                "post": "174"
            }
        },
        iprom: {
            //"vast": PROTOCOL + "adserver.iprom.net/adserver7/Impression?m=rtvslo;sid=stirid_live;ssid=mmc_tv;z=34;vast=1;vast_ver=3;t=js;[RANDOM];",
            "vast": PROTOCOL + "adserver.iprom.net/adserver7/Impression?m=rtvslo;sid=[SID];ssid=[SSID];z=[ZONE];vast=1;vast_ver=3;t=js;[RANDOM];",
            "vast_safe": PROTOCOL + "adserver.iprom.net/adserver7/Impression?m=rtvslo;sid=[SID];z=[ZONE];vast=1;vast_ver=3;t=js;[RANDOM];",

        },
        get_arhiv_preroll: function(source, showID) {
            return rtvdef.get_iprom('arhiv', 'preroll', source, showID);
        },
        get_live_preroll: function(kanal) {
            return rtvdef.get_iprom('live', 'preroll', kanal);
        },
        get_arhiv_midroll: function(source, showID) {
            return rtvdef.get_iprom('arhiv', 'midroll', source, showID);
        },
        get_live_midroll: function(kanal) {
            return rtvdef.get_iprom('live', 'midroll', kanal);
        },
        get_arhiv_postroll: function(source, showID) {
            return rtvdef.get_iprom('arhiv', 'postroll', source, showID);
        },
        get_live_postroll: function(kanal) {
            return rtvdef.get_iprom('live', 'postroll', kanal);
        },
        get_iprom: function(type, zone_name, source, showID) {
            var random = Math.floor(Math.random() * 1000);
            var sid = 'safe';
            var zone = '34';
            if (zone_name === 'preroll') {
                zone = '34';
            } else if (zone_name === 'midroll') {
                zone = '35';
            } else if (zone_name === 'postroll') {
                zone = '36';
            }

            //OVERIDE CC
            var value = $.cookieApi("read", null, "cc_advertising", 0);
            if (typeof value === 'undefined' || value !== 'yes') {

                var retVal = rtvdef.iprom.vast_safe.replace('[SID]', sid).replace('[ZONE]', zone).replace('[RANDOM]', random);
                console.log('vast-safe', retVal);
                return retVal;
            }

            
            //console.log('source ', source);

            switch (type) {
                case 'live':
                    var sid = 'stirid_live';
                    var ssid = 'tv_slo_ena';
                    if (source === 'tv.slo1') {
                        ssid = 'tv_slo_ena';
                    } else if (source === 'tv.slo2') {
                        ssid = 'tv_slo_dve';
                    } else if (source === 'tv.slo3') {
                        ssid = 'tv_slo_tri';
                    } else if (source === 'tv.mb') {
                        ssid = 'tv_maribor';
                    } else if (source === 'tv.kp') {
                        ssid = 'tv_koper';
                    } else if (source === 'tv.mmc') {
                        ssid = 'mmc_tv';
                    }
                    var retVal = rtvdef.iprom.vast.replace('[SID]', sid).replace('[SSID]', ssid).replace('[ZONE]', zone).replace('[RANDOM]', random);

                    console.log('vast-live', retVal);
                    return retVal;
                    break;
                case 'arhiv':
                    var sid = 'stirid_arhiv';
                    var ssid = 'priporocamo';
                    //SHOW OVERIDE
                    if (showID === '173250809') {
                        ssid = 'dan_rtv';
                        if (zone == '34') zone = '1363';
                        sid = 'stirid_oddaje';
                    } else if (showID === '173250551') {
                        ssid = 'avtomobilnost';
                        if (zone == '34') zone = '1363';
                        sid = 'stirid_oddaje';
                    } else if (showID === '173250791') {
                        ssid = 'planica';
                        if (zone == '34') zone = '1363';
                        sid = 'stirid_oddaje';
                    } else if (showID === '117') {
                        ssid = 'ljudje_zemlja';
                        if (zone == '34') zone = '1363';
                        sid = 'stirid_oddaje';
                    } else if (showID === '173250814') {
                        ssid = 'zdrav_duh';
                        if (zone == '34') zone = '1363';
                        sid = 'stirid_oddaje';
                    }else if (showID === '173250850') {
                        ssid = 'oi_pyeongchang';
                        sid = 'stirid_oddaje';
                    }
                    //SHOW TYPE
                    else if (source === '28') {
                        ssid = 'priporocamo';
                    } else if (source === '29') {
                        ssid = 'nedefinirano';
                    } else if (source === '30') {
                        ssid = 'kult_umetniski';
                    } else if (source === '32') {
                        ssid = 'verski';
                    } else if (source === '33') {
                        ssid = 'izobrazevalni';
                    } else if (source === '34') {
                        ssid = 'informativni';
                    } else if (source === '35') {
                        ssid = 'sportni';
                    } else if (source === '36') {
                        ssid = 'razvedrilni';
                    } else if (source === '6781958') {
                        ssid = 'iz_tv_arhiva';
                    } else if (source === '15890838') {
                        ssid = 'mladinski';
                    } else if (source === '15890839') {
                        ssid = 'parlamentarni';
                    }

                    var retVal = rtvdef.iprom.vast.replace('[SID]', sid).replace('[SSID]', ssid).replace('[ZONE]', zone).replace('[RANDOM]', random);
                    console.log('vast-arhiv', retVal);
                    return retVal;
                    break;
            }
        },
        streamer: {
            "html5": PROTOCOL + "videoweb.rtvslo.si/ava_archive02/",
            "rtmp": "rtmp://stream.rtvslo.si/ava_archive02",
            "hls": STREAM_RTVSLO_SI_SERVER + "/ava_archive02/_definst_/",
            "octostreamer": "octoshape://streams.octoshape.net/",
            "fallback": "2013/08/23/mobilni-rtvslo.mp4",
            "octoshape": "swf/octoshape3.swf",
            "error": PROTOCOL + "videoweb.rtvslo.si/dummy_720p.mp4"
        },
        domains: [
            "rtvslo.si",
            "tvslo.si",
            "val202.si",
            "otroski.si"
        ],
        quality: {
            "auto": "Avtomati&#269;no",
            "2200000": "720p HD",
            "1200000": "480p",
            "800000": "360p",
            "350000": "216p",
            "192000": "192kbps"
        },
        preroll: {
            /*"live" : { "rtmp" : "preroll/open-info.mp4", "html5" : "preroll/info.m4v" },*/
            "31": {
                "rtmp": "preroll/otroci.mp4",
                "html5": "preroll/otroci.m4v"
            },
            "30": {
                "rtmp": "preroll/kultura.mp4",
                "html5": "preroll/kultura.m4v"
            },
            "32": {
                "rtmp": "preroll/religija.mp4",
                "html5": "preroll/religija.m4v"
            },
            "33": {
                "rtmp": "preroll/izobrazevanje.mp4",
                "html5": "preroll/izobrazevanje.m4v"
            },
            "34": {
                "rtmp": "preroll/info.mp4",
                "html5": "preroll/info.m4v"
            },
            "35": {
                "rtmp": "preroll/sport.mp4",
                "html5": "preroll/sport.m4v"
            },
            "36": {
                "rtmp": "preroll/zabava.mp4",
                "html5": "preroll/zabava.m4v"
            },
            "dummy": {
                "rtmp": "preroll/dummy_720p.mp4",
                "html5": "preroll/dummy_360p.m4v"
            }
        },
        logo: {
            "small": "img/rtv4dwatermark.png",
            "big": "img/rtv4dwatermark.png"
        },
        buttons: {
            "quality": true,
            "qualityButton": "img/settingsButton.png",
            "4d": "app/img/ico_rtv4d.ico"
        },
        stretching: "uniform",
        playerStatus: false,
        offset: 0
    }

}(jQuery));

jQuery(document).ready(function($) {
    $(".player").each(function(s) {
        var recordingData = $(this).data();    
            
        if (typeof recordingData.options === 'undefined') {
            recordingData.options = {};
        }
        if (!recordingData.options['client']) {
            recordingData.options['client'] = '82013fb3a531d5414f478747c1aca622';
        }
        if (recordingData.options["scale"] === "true") {
            recordingData.options["width"] = $(this).width();
            recordingData.options["height"] = Math.round((recordingData.options["width"] * 9) / 16);
        }

        if (typeof recordingData.clip !== 'undefined') {
            recordingData.options.clip = recordingData.clip;
        }
        if (typeof recordingData.options['image'] !== 'undefined' && recordingData.options['image'].length > 4) {
            var imglen = recordingData.options['image'].length;
            if (recordingData.options['image'].substring(imglen - 3) !== 'jpg' && recordingData.options['image'].substring(imglen - 4) !== 'jpeg' && recordingData.options['image'].substring(imglen - 3) !== 'gif' && recordingData.options['image'].substring(imglen - 3) !== 'png') {
                delete recordingData.options['image'];
            }
        }
        if(typeof recordingData.showrelatednews !== 'undefined'){
            recordingData.options['showrelatednews'] = recordingData.showrelatednews;          
        }

        try {
            if (recordingData.target) {
                if (recordingData.target === "popup") {
                    $(this).click(function(event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        recordingData.options.autostart = "true";
                        if (recordingData.channel) {
                            $.showPopup("live", recordingData.channel, recordingData.options);
                        }

                        if (recordingData.recording) {
                            $.showPopup("vod", recordingData.recording, recordingData.options);
                        }
                        return false;
                    });
                }

                if (recordingData.target.substring(0, 1) === "#") {
                    $(this).click(function(event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        recordingData.options.autostart = "true";
                        $(recordingData.target).empty();
                        if (recordingData.channel) {
                            $(recordingData.target).playLive(recordingData.channel, recordingData.options);
                        }

                        if (recordingData.recording) {
                            $(recordingData.target).playVod(recordingData.recording, recordingData.options);
                        }
                        return false;
                    });
                }
            } else {
                $(this).attr('id', "rtv4dplayer" + s);
                if (recordingData.channel) {
                    $(this).playLive(recordingData.channel, recordingData.options);
                }
                if (recordingData.recording) {
                    $(this).playVod(recordingData.recording, recordingData.options);
                }
                if (recordingData.showid) {
                    $(this).playVod(recordingData.showid, recordingData.options, true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
});