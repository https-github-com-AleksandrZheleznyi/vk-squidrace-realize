async function BridgeInitialize(request) 
{
    try {
        await vkBridge.send('VKWebAppInit');
        SendSuccessMessage(request);
        console.log('-Success init VKBridge SDK');
    } 
    catch (err) {
        SendFailedMessage(request, JSON.stringify(err));
        console.log('-Failed init VKBridge SDK: '+JSON.stringify(err));
    }
}

// ADS 
async function BridgeShowBannerAd(request, bannerId)
{
    // bannerId: 'interstitial' or 'preloader'
    try {
        var data = await vkBridge.send('VKWebAppShowNativeAds', { ad_format: bannerId });
        SendSuccessMessage(request);
        console.log('-Success show VKBridge Intestitial Ad! Data result: '+data.result);
    } catch (err) {
        SendFailedMessage(request, JSON.stringify(err));
        console.log('-Failed show VKBridge Interstitial Ad: '+JSON.stringify(err));
    }
}

async function BridgeShowRewardVideoAd(request)
{
    try {
        var data = await vkBridge.send('VKWebAppShowNativeAds', { ad_format:'reward' });
        console.WriteLine(JSON.stringify(data));
        if(data.result == true)
        {
            SendSuccessMessage(request);
            return;
        }
        SendFailedMessage(request, 'Failed receive reqward');
    } catch (err) {
        SendFailedMessage(request, JSON.stringify(err));
        console.log('-Failed receive reward');
    }
}

// Storage
async function BridgeSetUserData(request)
{
    var requestData = JSON.parse(request.jsonData);
    try {
        await vkBridge.send('VKWebAppStorageSet', {'key': requestData.keys[0], 'value': requestData.values[0]});
        SendSuccessMessage(request);
    } catch (err) {
        SendFailedMessage(request, JSON.stringify(err));
    }
}

async function BridgeGetUserData(request)
{
    var requestData = JSON.parse(request.jsonData);
    try {
        var data = await vkBridge.send('VKWebAppStorageGet', { 'keys': requestData.keys });
        var keys = [];
        var values = [];
        for (var item in data.keys)
        {
            keys.push(item.key);
            values.push(item.value);
        }
        var result = {
            keys: keys,
            values: values
        };
        SendSuccessMessage(request, JSON.stringify(result));
    } catch (e) {
        SendFailedMessage(request, JSON.stringify(e));
    }
}

async function BridgeShowLeaderboard(request)
{
    try { 
        var data = await vkBridge.send('VKWebAppShowLeaderBoardBox', { 'user_result': Number(request.jsonData) });
        SendSuccessMessage(request);
    } catch (e) {
        SendFailedMessage(request, e);
    }
}

async function BridgeGetUserInfo(request)
{
    try {
        var result = await vkBridge.send('VKWebAppGetUserInfo');
        SendSuccessMessage(request, JSON.parse(result.data));
    } catch (e) {
        SendFailedMessage(request, JSON.parse(e));
    }
}

async function BridgeInviteFriend(request)
{
    try {
        await vkBridge.send('VKWebAppShowInviteBox');
        SendSuccessMessage(request);
    } catch (e) {
        SendFailedMessage(request, JSON.parse(e));
    }
}

async function BridgeSendPostOnWall(request)
{
    try {
        await vkBridge.send('VKWebAppShowWallPostBox', { 'message': request.jsonData });
        SendSuccessMessage(request);
    } catch (e) {
        SendFailedMessage(request, JSON.parse(e));
    }
}

async function BridgeJoinGroup(request)
{
    try {
        await vkBridge.send('VKWebAppJoinGroup', { 'group_id': Number(request.jsonData) });
        SendSuccessMessage(request);
    } catch (e) {
        SendFailedMessage(request, JSON.parse(e));
    }
}

async function BridgeAppAddToFavorites(request)
{
    try {
        await vkBridge.send('VKWebAppAddToFavorites');
        SendSuccessMessage(request);
    } catch (e)
    {
        SendFailedMessage(request, JSON.parse(e));
    }
}

function GetLanguageCode()
{
    return navigator.language || navigator.userLanguage;
}

BridgeInitialize();