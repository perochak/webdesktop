<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;
use Yii;
/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css?t=1'
    ];
    public $js = [
        'js/jquery.modal.min.js',
        'js/guest.js'
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];
    public function init() {
        if(!Yii::$app->user->isGuest){
            $this->js[]='js/common.js';
        }
        return parent::init();
    }
}
