//window['JQ'] = $;
function initNotScroll(el) {
    // var canScroll = true;
    // function touchScroll(el) {
    //     canScroll = false;
    //     //el需要滑动的元素
    //     el.addEventListener('touchmove', (e) => {
    //         canScroll = true;
    //     })
    //     document.body.addEventListener('touchmove', (e) => {
    //         // 		    	alert(canScroll);
    //         if (!canScroll) {
    //             e.preventDefault(); //阻止默认事件(上下滑动)
    //         } else {
    //             //需要滑动的区域
    //             var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离 
    //             var scrollH = el.scrollHeight; //含滚动内容的元素大小
    //             var offsetH = el.offsetHeight; //网页可见区域高
    //             var cScroll = top + offsetH; //当前滚动的距离
    //             //被滑动到最上方和最下方的时候
    //             if (top == 0) {
    //                 top = 1; //0～1之间的小数会被当成0
    //             } else if (cScroll === scrollH) {
    //                 el.scrollTop = top - 0.1;
    //             }
    //         }
    //     }, { passive: false }) //passive防止阻止默认事件不生效
    // }
    // touchScroll(el);
}

var orientLayer = document.getElementById("orientLayer"); //判断横屏竖屏 
var nvLayer = document.getElementById("nvLayer"); //引导
function checkDirect() {
    if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
        return "portrait";
    } else {
        return "landscape";
    }
}
function screenORInit() {
    var scales = window.innerHeight / 236;
    var w = scales * 218;
    var wl = -w / 2;
    $(".icon").css({ "width": w, "height": window.innerHeight, "margin-left": wl });
}

function screenNVInit() {
    var s = window.innerWidth / 704;
    var h = s * 594;
    $("#nvimg").css({ "left": 0, "width": window.innerWidth, "height": h });
}


//显示屏幕方向提示浮层 
function orientNotice() {
    var orient = checkDirect();
    if (orient == "portrait") {
        orientLayer.style.display = "none";
        screenNVInit();
        //$('#main').css("height", window.innerHeight);
    } else {
        orientLayer.style.display = "block";
        screenORInit();
        // orientLayer.style.display = "none";
    }
}
function init() {
    orientNotice();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        setTimeout(orientNotice, 200);
    })
}
init();


function stopScroll() {
    document.body.addEventListener('touchmove', hidescroll, { passive: false });
}

function openScroll() {
    document.body.removeEventListener('touchmove', hidescroll);
}

function hidescroll() {
    e.preventDefault();
}



var loadScript = function (list, callback) {
    var loaded = 0;
    var loadNext = function () {
        loadSingleScript(list[loaded], function () {
            loaded++;
            if (loaded >= list.length) {
                callback();
            }
            else {
                loadNext();
            }
        })
    };
    loadNext();
};

var loadSingleScript = function (src, callback) {
    var s = document.createElement('script');
    s.async = false;
    s.src = src;
    s.addEventListener('load', function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
        callback();
    }, false);
    document.body.appendChild(s);
};

var xhr = new XMLHttpRequest();
xhr.open('GET', './manifest.json?v=' + Math.random(), true);
xhr.addEventListener("load", function () {
    var manifest = JSON.parse(xhr.response);
    var list = manifest.initial.concat(manifest.game);
    loadScript(list, function () {
        /**
         * {
         * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
         * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
         * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
         * "calculateCanvasScaleFactor": //a function return canvas scale factor
         * }
         **/
        egret.runEgret({
            renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor: function (context) {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            }
        });
    });
});
xhr.send(null);