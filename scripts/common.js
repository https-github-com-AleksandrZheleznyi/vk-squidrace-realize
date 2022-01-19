var IsMobilePlatform = false;

let cachedConfigFile = null;
let configUrl = 'https://spgames.s3.ap-south-1.amazonaws.com/squid-race/vkgames/0.3/RemoteConfig.json';

function LoadConfig(successCallback, errorCallback)
{
    if(cachedConfigFile != null)
    {
        successCallback(cachedConfigFile);
        return;
    }
    LoadStringFromUrl(configUrl, successCallback, errorCallback);
}

function CacheLoadedConfig(json)
{
    cachedConfigFile = json;
    console.log(cachedConfigFile);
}

function GetCachedGameConfig()
{
    return cachedConfigFile;
}

LoadConfig(CacheLoadedConfig);

function GetLoadingScreenLocalization()
{
    let langugages = [
        {
            lang: 'en',
            value: 'Loading'
        },
        {
            lang: 'ru',
            value: 'Загрузка'
        },
        {
            lang: 'tr',
            value: 'Yükleniyor'
        },
    ];

    let translated = langugages.find(lang => lang.lang == GetLanguageCode());
    if(translated == null)
        translated = langugages[0];
    return translated;
}

function SendSuccessMessage(request, parameters)
{
    if(request == null) return;
    BaseSendMessage(request.gameObjectName, request.successMethodName, parameters);
}

function SendFailedMessage(request, parameters)
{
    if(request == null) return;
    BaseSendMessage(request.gameObjectName, request.failedMethodName, parameters);
}


function BaseSendMessage(gameObjectName, functionName, parameters)
{
    if(unityInstance == null) return;
    if(parameters != null)
    {
        unityInstance.SendMessage(gameObjectName, functionName, parameters);
        return;
    }
    unityInstance.SendMessage(gameObjectName, functionName);
}

function WebRequestToObject(reqeust)
{
    return JSON.parse(reqeust);
}


window.onfocus = function()
{
    BaseSendMessage('SPGameService', 'FocusMode', 1);
};

window.onblur = function()
{
    BaseSendMessage('SPGameService', 'FocusMode', 0);
};

function setElementByIdStyleType(id, type)
{
    var element = document.getElementById(id);
    if(element == null) return;
    if(element.style == null) return;
    element.style.display=type;
}
