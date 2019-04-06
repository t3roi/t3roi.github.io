var contractAddress = 'TWnyj5NZc3L96qw8szRZ1fEAv1cnvXunCs';
var tronconquestContract;
var userTokenBalance;
var account;
var prev_account;
var timeleft = 0;
var time = {
    "\x64\x61\x79": '00',
    "\x68\x6F\x75\x72": '00',
    "\x6D\x69\x6E": '00',
    "\x73\x65\x63": '00'
};
async function loadTronWeb() {
    if (typeof(window['tronWeb']) === 'undefined') {
        setTimeout(loadTronWeb, 1000)
    } else {
        tronconquestContract = await tronWeb['contract']()['at'](contractAddress);
        setTimeout(function() {
            startLoop();
            setInterval(() => {
                cdTime()
            }, 1000)
        }, 1000)
    }
}
window['addEventListener']('load', function() {
    loadTronWeb();
    $('.country-container')['click'](function() {
        var _0x3c60x9 = tronWeb['toSun'](($(this)['find']('.conquest-price')['text']()));
        var _0x3c60xa = parseInt($(this)['data']('tronconquest-id'));
        tronconquestContract['buy'](_0x3c60xa)['send']({
            callValue: _0x3c60x9
        })['then']((_0x3c60xc) => {})['catch']((_0x3c60xb) => {
            console['log'](_0x3c60xb)
        })
    });
    $('.region-container')['click'](function() {
        var _0x3c60x9 = tronWeb['toSun'](($(this)['find']('.region-price')['text']()));
        var _0x3c60xd = parseInt($(this)['data']('region-id'));
        console['log'](_0x3c60xd);
        tronconquestContract['buyRegion'](_0x3c60xd)['send']({
            callValue: _0x3c60x9
        })['then']((_0x3c60xc) => {})['catch']((_0x3c60xb) => {
            console['log'](_0x3c60xb)
        })
    })
});

function startLoop() {
    refreshData();
    setTimeout(startLoop, 3000)
}

function refreshData() {
    updateUserInformation()
}

function cdTime() {
    timeleft = parseFloat(timeleft);
    let _0x3c60x11 = (new Date())['getTime']() / 1000;
    let _0x3c60x12 = timeleft - _0x3c60x11;
    if (_0x3c60x12 > 0) {
        time = getTimeCountDown(_0x3c60x12)
    };
    let _0x3c60x13 = time['hour'] + ' : ' + time['min'] + ' : ' + time['sec'];
    $('.tronconquest-cd-time')['html'](_0x3c60x13)
}

function getTimeCountDown(time) {
    return {
        "\x64\x61\x79": dealNum(time / (24 * 60 * 60)),
        "\x68\x6F\x75\x72": dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "\x6D\x69\x6E": dealNum((time % (60 * 60)) / 60),
        "\x73\x65\x63": dealNum(time % 60)
    }
}

function dealNum(_0x3c60x16) {
    let _0x3c60x17 = Math['floor'](_0x3c60x16);
    return (_0x3c60x17 < 10 ? '0' : '') + _0x3c60x17
}

function updateUserInformation() {
    tronconquestContract['getData']()['call']()['then']((_0x3c60xc) => {
        let _0x3c60x19 = sunToDisplay(parseInt(_0x3c60xc._currentPot));
        timeleft = parseInt(_0x3c60xc._timeleft);
        $('.tronconquest-pot')['html'](_0x3c60x19);
        let _0x3c60x1a = tronWeb['address']['fromHex'](_0x3c60xc._lastplayer);
        $('.tronconquest-jackpotowner')['html']('\u76EE\u524D\u5927\u734E\u52DD\u5229\u8005: ' + _0x3c60x1a)
    })['catch']((_0x3c60xb) => {
        console['log'](_0x3c60xb)
    });
    for (let _0x3c60x1b = 0; _0x3c60x1b < 108; _0x3c60x1b++) {
        tronconquestContract['getCountryInfo'](_0x3c60x1b)['call']()['then']((_0x3c60x1c) => {
            let _0x3c60x1d = parseInt(_0x3c60x1c._id);
            let _0x3c60x1e = sunToDisplay(parseInt(_0x3c60x1c['price']));
            let _0x3c60x1f = tronWeb['address']['fromHex'](_0x3c60x1c['countryOwner']);
            $('.country-' + _0x3c60x1d)['find']('.conquest-price')['html'](_0x3c60x1e);
            if (_0x3c60x1f == tronWeb['defaultAddress']['base58']) {
                $('.country-' + _0x3c60x1d)['find']('.conquest-owner')['html']('\u60A8')['css']('color', '#4bc071');
                $('.country-' + _0x3c60x1d)['css']('border', '1px #4bc071 solid');
                $('.country-' + _0x3c60x1d)['find']('.owned')['show']();
                $('.country-' + _0x3c60x1d)['find']('.country-flag')['css']('opacity', 1)
            } else {
                $('.country-' + _0x3c60x1d)['find']('.conquest-owner')['html'](_0x3c60x1f)['css']('color', '');
                $('.country-' + _0x3c60x1d)['css']('border', '1px grey solid');
                $('.country-' + _0x3c60x1d)['find']('.owned')['hide']();
                $('.country-' + _0x3c60x1d)['find']('.country-flag')['css']('opacity', 0.1)
            }
        })['catch']((_0x3c60xb) => {
            console['log'](_0x3c60xb)
        })
    };
    for (let _0x3c60x1b = 0; _0x3c60x1b < 7; _0x3c60x1b++) {
        _0x3c60x20(_0x3c60x1b)
    };

    function _0x3c60x20(_0x3c60x21) {
        tronconquestContract['getRegionInfo'](_0x3c60x21)['call']()['then']((_0x3c60x22) => {
            let _0x3c60x23 = sunToDisplay(parseInt(_0x3c60x22['regionPrice']));
            let _0x3c60x24 = tronWeb['address']['fromHex'](_0x3c60x22['regionOwner']);
            $('.region-' + _0x3c60x21)['find']('.region-price')['html'](_0x3c60x23);
            if (_0x3c60x24 == tronWeb['defaultAddress']['base58']) {
                $('.region-' + _0x3c60x21)['find']('.region-owner')['html']('\u60A8')['css']('color', '#4bc071');
                $('.region-' + _0x3c60x21)['css']('border', '1px #4bc071 solid');
                $('.region-' + _0x3c60x21)['find']('.owned')['show']()
            } else {
                $('.region-' + _0x3c60x21)['find']('.region-owner')['html'](_0x3c60x24)['css']('color', '');
                $('.region-' + _0x3c60x21)['css']('border', '1px grey solid');
                $('.region-' + _0x3c60x21)['find']('.owned')['hide']()
            }
        })['catch']((_0x3c60xb) => {
            console['log'](_0x3c60xb)
        })
    }
}

function checkwallet() {
    var _0x3c60x26 = $('#thewallet')['val']();
    if (_0x3c60x26['length'] == 34) {
        for (i = 1; i <= 4; i++) {
            $('.f' + i)['show']()
        };
        account = _0x3c60x26;
        localStorage['setItem']('wallet', account)
    } else {
        account = 0
    }
}

function sunToDisplay(_0x3c60x28) {
    return formatTrxValue(tronWeb['fromSun'](_0x3c60x28))
}

function formatTrxValue(_0x3c60x2a) {
    return parseFloat(parseFloat(_0x3c60x2a)['toFixed'](5))
}

function getQueryVariable(_0x3c60x2c) {
    var _0x3c60x2d = window['location']['search']['substring'](1);
    var _0x3c60x2e = _0x3c60x2d['split']('&');
    for (var _0x3c60x1b = 0; _0x3c60x1b < _0x3c60x2e['length']; _0x3c60x1b++) {
        var _0x3c60x2f = _0x3c60x2e[_0x3c60x1b]['split']('=');
        if (_0x3c60x2f[0] == _0x3c60x2c) {
            return _0x3c60x2f[1]
        }
    };
    return (false)
}

function translateQuantity(_0x3c60x31, _0x3c60x32) {
    _0x3c60x31 = Number(_0x3c60x31);
    finalquantity = _0x3c60x31;
    modifier = '';
    if (_0x3c60x32 == undefined) {
        _0x3c60x32 = 0
    };
    if (_0x3c60x31 < 1000000) {
        _0x3c60x32 = 0
    };
    if (_0x3c60x31 > 1000000) {
        modifier = 'M';
        finalquantity = _0x3c60x31 / 1000000
    };
    if (_0x3c60x31 > 1000000000) {
        modifier = 'B';
        finalquantity = _0x3c60x31 / 1000000000
    };
    if (_0x3c60x31 > 1000000000000) {
        modifier = 'T';
        finalquantity = _0x3c60x31 / 1000000000000
    };
    if (_0x3c60x32 == 0) {
        finalquantity = Math['floor'](finalquantity)
    };
    return finalquantity['toFixed'](_0x3c60x32) + modifier
}