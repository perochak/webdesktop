<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'U4vdfMvKxd17f65bSrSgb-FiydbRLVWn',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'folder/create'=>'site/createfolder',
                'folder/update'=>'site/updatefolder',
                'folder/delete'=>'site/deletefolder',
                'link/create'=>'site/createlink',
                'link/update'=>'site/updatelink',
                'link/delete'=>'site/deletelink',                
                'file/update'=>'site/updatefile',
                'file/delete'=>'site/deletefile',                
                'upload'=>'site/upload',
                'postwall'=>'site/postwall',
                'login'=>'site/login',
                'setting'=>'site/setting',
                'file/<id:\d+>'=>'site/file',
                'download/<id:\d+>'=>'site/download',
                'filepassword/<id:\d+>'=>'site/filepassword',
                [
                    'class'=>'\app\models\FolderRule',
                    'route'=>'site/index',
                    'pattern'=>'<slug>'
                ]
            ],
        ],
        
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        'allowedIPs' => ['127.0.0.1', '::1','119.160.66.146'],
    ];
}

return $config;
