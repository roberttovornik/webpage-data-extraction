'use strict';

if (typeof $j === 'undefined') {
    if (typeof $ !== 'undefined') {
        var $j = $;
    }
}
var workHorseLoader = (function foo($) {
    if (typeof $ === 'undefined') {
        console.log('missing $j global variable...');
        return;
    }
    var soccerJS = '//img.rtvslo.si/_static/common/widgets/livescore/dist/embed.min.js';
    var commentsJS = '//img.rtvslo.si/_static/novi/widgets/in-article-comments/single-comment-widget.min.js';
    var mmcZivoJS = '//img.rtvslo.si/_static/common/mmczivo/mmczivo.v2.min.js';
    var mmcKlepetJS = '//img.rtvslo.si/_static/common/mmczivo/mmcklepet.v1.min.js?_=2';
    var instagramJS = '//platform.instagram.com/en_US/embeds.js';
    var twitterJS = '//platform.twitter.com/widgets.js';
    var commercial = '//img.rtvslo.si/_static/common/fullscreen-popover/2016/15let/commercial.js';
    var rtvPolls =  '//img.rtvslo.si/_static/r20181108/novi/widgets/rtv-polls/public/embed.js';


    function _loadJs(url, cb) {
        var script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('type', 'text/javascript');

        var loaded = false;
        var loadFunction = function () {
            if (loaded) return;
            loaded = true;
            if ($.isFunction(cb)) {
                cb();
            }
        };
        script.onload = loadFunction;
        script.onreadystatechange = loadFunction;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function _detectWidgets() {
        //console.log('Ondemand loaded...');
        //$('#hello').html('Init succeful...');
        var checkSoccer = $('.football-widget').length;
        if (checkSoccer > 0) {
            _loadJs(soccerJS);
        }
        var checkComment = $('.rtvslo-comment.raw').length;

        //console.log('checkComment ' , checkComment);
        if (checkComment > 0) {
            _loadJs(commentsJS);
        }

        var checkMMCzivo = $('#mmczivoinjectV2').length;

        if (checkMMCzivo > 0) {
            _loadJs(mmcZivoJS);
        }

        var checkKlepet = $('#mmc_klepet_widget_v1').length;

        if (checkKlepet > 0) {
            _loadJs(mmcKlepetJS);
        }

        var checkInstagram = $('.instagram-media').length;

        if (checkInstagram > 0 && typeof window.instgrm === 'undefined') {
            _loadJs(instagramJS);
        }

        var checkTwitter = $('.twitter-tweet').length;

        if (checkTwitter > 0 && typeof window.twttr === 'undefined') {
            _loadJs(twitterJS);
        }

        var isPortalDate = _checkDate('22. 12. 2016');
        if (isPortalDate) {
            _loadJs(commercial);
        }

        /** ankete */
        var checkPolls = $('[data-type="rtv-polls"]');
        if (checkPolls) {
            _loadJs(rtvPolls);
        }

        /** dodal za fis */
        var checkFis = $('[data-type="fis-widget"]');
        if (checkFis) {
            checkFis.each(function (i, value) {
                var link = $(value).attr('data-href');
                var fisTemplate = '<figure class="c-figure-full" data-type="fis-widget-link"><img class="img-fluid" src="https://stari.rtvslo.si/_static/common/img/fis/rezultati.png" alt="Rezultati v živo" style="cursor:pointer;" onclick=fisFunction("' + link + '")></figure><script>function fisFunction(url) {var myWindow = window.open(url, "", "width=700,height=500");}</script>'
                $(value).replaceWith(fisTemplate);

            })

        }

        /** dodajanje tabelam div table-responsive       */

       /* var checkTable = $('.table');
        if (checkTable) {
            checkTable.each(function (i, value) {
   
              $(value).wrap("<div class='table-responsive'></div>");
            })
        } */


        //console.log('checkSoccer ' , checkSoccer);
    }

    function _checkDate(date) {
        var today = $('div#sitedate');
        var retVal = false;
        if (today) {
            if (today.text().indexOf(date) > -1) {
                retVal = true;
            }
        }
        return retVal;
    }

    return {
        init: _detectWidgets
    }
})($j);

workHorseLoader.init();