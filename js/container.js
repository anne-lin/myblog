addPhotos();
function g(selector){
    return selector.substring(0, 1) == '.' ? document.getElementsByClassName(selector.substring(1)) : document.getElementById(selector.substring(1));
}
function random(range){
    var min = Math.min(range[0], range[1]);
    var max = Math.max(range[0], range[1]);
    var diff = max - min;
    var number = Math.round(Math.random() * diff) + min;
    return number;
}
function addPhotos(){
    var _wrap = '';
    var _nav = '';
    for(var i = 0; i < data.length; i++){
       var container='';
        for(var j=0;j<data[i].desc.length;j++){
           container+=data[i].desc[j]+'<br>';
       }
        _wrap += '<div class="photo  photo_front" onclick="turn(this)" id="photo_' + (i + 1) + '">' +
            '<div class="photo-wrap"><div class="side side-front"><p class="image">' +
            '<img src="' + data[i].img + '"></p><p class="caption">' + data[i].caption + '</p></div>' +
            '<div class="side side-back"><p class="desc">' + container + '</p></div></div></div></div>';

        _nav += '<span id="nav_' + (i + 1) + '" onclick="turn(g(\'#photo_' + (i + 1) + '\'))" class="i"></span>';
    }
    var navigation = '<div class="nav">' + _nav + '</div>'
    g('#wrap').innerHTML = _wrap + navigation;

    rsort(random([1, data.length]));
}
function range(){
    var range = {
        left: {
            x: [],
            y: []
        },
        right: {
            x: [],
            y: []
        }
    };
    var wrap = {
        width: g('#wrap').clientWidth,
        height: g('#wrap').clientHeight
    };
    var photo = {
        width: g('.photo')[0].clientWidth,
        height: g('.photo')[0].clientHeight
    };
    range.left.x = [0 - photo.width / 4 + 130, wrap.width / 2 - photo.width * 5 / 4 + 130];
    range.left.y = [0 - photo.height / 4 + 160, wrap.height - photo.height * 3 / 4 + 160];
    range.right.x = [wrap.width / 2 + photo.width / 4 + 130, wrap.width - photo.width / 4 + 130];
    range.right.y = range.left.y;

    return range;
}
function rsort(n){
    var _photo = g('.photo');
    var photos = [];
    for(var i = 0; i < _photo.length; i++){
        _photo[i].className = 'photo photo_front';
        _photo[i].style.left = '';
        _photo[i].style.top = '';
        _photo[i].style['transform'] = _photo[i].style['-webkit-transform'] = 'scale(1.3)';

        photos.push(_photo[i]);
    }
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center';

    photo_center = photos.splice(n-1, 1);
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    var ranges = range();
    for(var j = 0; j < photos_left.length; j++){
        var photo = photos_left[j];
        photo.style.left = random(ranges.left.x) + 'px';
        photo.style.top = random(ranges.left.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }
    for(var s = 0; s < photos_right.length; s++){
        var photo = photos_right[s];
        photo.style.left = random(ranges.right.x) + 'px';
        photo.style.top = random(ranges.right.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }
    var navs = g('.i');
    for(var k = 0; k < navs.length; k++){
        navs[k].className = 'i';
    }
    g('#nav_' + n).className += ' i_current';
}
function turn(elem){
    var cls = elem.className;
    var n = elem.id.split('_')[1];
    if(!/photo_center/.test(cls)){
        return rsort(n);
    }
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/, 'photo_back');
        g('#nav_' + n).className += ' i_back';
    } else{
        cls = cls.replace(/photo_back/, 'photo_front');
        g('#nav_' + n).className = g('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');
    }
    elem.className = cls;
}