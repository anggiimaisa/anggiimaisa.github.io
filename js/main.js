var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/fWGnupC2PEg:APA91bF7q2u0IOORmVvrpLNhizLppsbAarkSj7Uo1_qXcR6VtEP9AOazgMHLfkCC07ECyVKfN5p90fEJTF29hKmuY05d_xJh07WkVzB31WMLsK9oRsf5Cxk41oLyNcz06IMqG-AyOOBS",
    "keys": {
        "p256dh": "BEMqxrv3BeRAvo3NTbryOtEgLqTH274AV04BwduqVLsA8dv3dOswXAxstGA75JjNAIFMir72zc+wsqSXhfb3Ufs=", 
        "auth": "r46hFTRfn2Lsq5QMj00QbQ=="
    }
};
var payload = 'Here is a payload!';

var options = {
    gcmAPIKey: '639527040782',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);