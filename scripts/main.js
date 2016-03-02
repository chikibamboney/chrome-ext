
var main = 'http://www.yuriy-vlasyuk.com/assets/main.js',
    secondary = 'http://www.yuriy-vlasyuk.com/assets/secondary.js';

chrome.storage.local.get('newTab', function (result) {
    var link = result.newTab ? main : secondary;
    $.get(link, function (data) {
        //eval(data);
    });
});
