function init(){
    if(!get('first_start')){
        set('first_start',true);
    }
}

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

function checkPage(){
    chrome.tabs.executeScript(null,{file:'jquery.js',runAt:'document_end'},function(){
        chrome.tabs.executeScript(null,{file:'content.js',runAt:'document_end'},function(){});
    });
}

$(document).ready(function(){
    init();
});