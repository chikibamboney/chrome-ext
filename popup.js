function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function setConfig(checked) {
    $('#newTab').prop('checked', checked).attr('checked', checked);
    $('#sameTab').prop('checked', !checked).attr('checked', !checked)
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (url) {
        chrome.storage.local.get('newTab', function (result) {
            config = result.newTab;
            setConfig(config)
        });

        $('input').click(function () {
            $('input').removeAttr('checked').removeProp('checked');
            $(this).prop('checked', true).attr('checked', true);
            chrome.storage.local.set({'newTab': Boolean(+($(this).val()))})
        });
    });
});
