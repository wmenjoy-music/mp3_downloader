setTimeout(function(){

function correctUrl(url){
    if(url){
        if(url.indexOf('http') == -1){
            url = location.protocol + '//' + location.host + url;
        }
        return url;
    }else{
        return false;
    }
}

var ablumName = $("#bodyContent meta[itemprop=name]").attr("content")

var data = [];
var items = $('*[href*=".mp3"], *[href*=".wav"], *[href*=".wma"], *[href*=".ogg"]');

for(var i=0; i<items.length; i++){
    var url = correctUrl(items[i].href);
    if(url){
        if (location.host != "w1.musify.club") {
            data.push({url:url});
        }


    }
}

var items = $('*[src*=".mp3"], *[src*=".wav"], *[src*=".wma"], *[src*=".ogg"]');
for(var i=0; i<items.length; i++){
    var url = correctUrl(items[i].src);
    if(url){

        data.push({url:url});
    }
}

var items = $('*[data-url*=".mp3"], *[data-url*=".wav"], *[data-url*=".wma"], *[data-url*=".ogg"]');

for(var i=0; i<items.length; i++){
    var url = correctUrl(items[i].getAttribute("data-url"));
    if(url){
        if (location.host == "w1.musify.club") {
            if (items[i].nodeName == "DIV") {
                prefix = url.substr(url.lastIndexOf("."));
                filePath = ablumName + "/" +  items[i].getAttribute("data-position") +". "+ items[i].getAttribute("data-title") + prefix
                data.push({url:url, downloadFile: filePath, fileName:  items[i].getAttribute("data-title")});
            }

        } else {
            data.push({url:url});
        }
    }
}

var items = $('*[value*=".mp3"], *[value*=".wav"], *[value*=".wma"], *[value*=".ogg"]');

for(var i=0; i<items.length; i++){
    var url = correctUrl(items[i].value);
    if(url){
        data.push({url:url});
    }
}
chrome.extension.sendRequest({data:data},function(response){});

},150);