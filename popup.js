function get(name){
    var val = localStorage[name];
    if(!val || val == 'false'){
        return false;
    }
    return val;
}

function set(name,val){
    localStorage[name] = val;
}

function render(items){
    if(items.length > 0){
        var list = $('#list');
        $('#list').append(
            $('<span id="down_all">DOWNLOAD ALL</span>').click(function(){
                if(confirm('Really start download all files?')){
                    for(var i in items){
                        chrome.downloads.download({url:items[i].url, filename: items[i].downloadFile}, function(){});
                    }
                }
            })
        );

        for(var i in items){
            var fileName = items[i].url
            if (items[i].fileName) {
                fileName = items[i].fileName
            }

            var item = $('<div class="item" data-url="'+items[i].url+'">' + items[i].fileName+'</div>');
            $('#list').append(item);
            item.append(
                $('<img class="down ico" src="img/down.png" />').click(function(){
                    var url = $(this).parent('.item').data('url');
                    chrome.downloads.download({url:url, filename: items[i].downloadFile}, function(){});
                })
            );
            item.append(
                $('<img class="stop ico" src="img/stop.png" />').click(function(){
                    play('');
                })
            );
            item.append(
                $('<img class="play ico" src="img/play.png" />').click(function(){
                    var url = $(this).parent('.item').data('url');
                    play(url);
                })
            );
            item.append(
                $('<span class="name">' + items[i].url + '</span>')
            );
        }
        $('#list').append('<div class="clear"></div>');
    }else{
        $('#main').append('<div style="padding-top:260px;text-align:center;font-weight:bold;">No results on this page!</div>');
    }
}

function play(url){
    $('#iframe').attr('src',url);
}

$(document).ready(function(){
    chrome.extension.getBackgroundPage().chrome.tabs.getSelected(null, function(tab){
        if((tab.url.indexOf("http://") != -1 || tab.url.indexOf("https://") != -1) && tab.url.indexOf('chrome.google.com/webstore') == -1){
            chrome.extension.getBackgroundPage().checkPage();
        }else{
            $('#main').append('<div style="padding-top:260px;text-align:center;font-weight:bold;">Extension does not work on this page!</div>');
        }
    });
    
});

chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
    if(request.data){
        render(request.data);
    }
});