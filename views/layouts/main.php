<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/file-icon-vectors@1.0.0/dist/file-icon-vectors.min.css" />
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <div class="container-fluid">
        <?= $content ?>
    </div>
</div>
     <div style="display: none">
    <input type="hidden" id="parent_folder_id"/>
    <input type="hidden" id="folder_id"/>
    <input type="hidden" id="file_id"/>
    <input type="hidden" id="link_id"/>
    <div id="addfolder" class="model">
        
        <div class="field">
            <label>Folder Name</label>
            <input type="text" id="folder_name" />
        </div>    
        <div class="field">
            <label></label>
            <button  id="createfolder">Save</button>
        </div>        
    </div>  
      
<div id="renamefolder" class="modal">
  
    <div class="field">
        <label>Name</label>
        <input type="text" id="r_folder_name" />
    </div>
    
    <div class="field">
        <label></label>
        <button id="srenamefolder">Save</button>
    </div>
</div>     
<div id="renamefile" class="modal">
  
    <div class="field">
        <label>Name</label>
        <input type="text" id="r_file_name" />
    </div>
    
    <div class="field">
        <label></label>
        <button id="srenamefile">Save</button>
    </div>
</div>  
<div id="renamelink" class="modal">
  
    <div class="field">
        <label>Name</label>
        <input type="text" id="r_link_name" />
    </div>
    
    <div class="field">
        <label></label>
        <button id="srenamelink">Save</button>
    </div>
</div>     
<div id="passwordfolder" class="modal">
    <div class="field">
        <label>Password</label>
        <input type="text" id="folder_password" />
    </div>
    
    <div class="field">
        <label></label>
        <button id="spoasswirdfolder">Save</button>
    </div>
</div>    
   
        <input type="hidden" id="upload_type" />
        <input type="file" id="filepicker">
        
        <div id="addlink" class="model">
            <b>Add New Link</b>
        <div class="field">
            <label>Name</label>
            <input type="text" id="link_name" />
        </div>   
        <div class="field">
            <label>URL</label>
            <input type="text" id="link_url" />
        </div>    
        <div class="field">
            <label>ICON</label>
            <input type="text" id="link_icon" />
            <a href="https://cdn.materialdesignicons.com/5.4.55/" target="_blank">Icons List</a>
        </div>    
        <div class="field">
            <label></label>
            <button  id="createlink">Save</button>
        </div>        
    </div>
        
        <a href="" id="link_open" target="_blank"></a>
    </div>
    <?php 
    if(Yii::$app->controller->action->id!='login' && Yii::$app->controller->action->id!='setting'){
        ?>
      <a href="/setting" class="settingpage">Setting</a>    
        <?php
$config = app\models\Config::find()->where(['config_key'=>'config_allow_wall'])->one();
if($config){
    if($config->config_value=='1'){
        $messages = \app\models\Wall::find()->limit(10)->all();
        
        ?>
<div class="wall">
    <div class="wall-messages">
        <?php 
        if($messages){
            foreach($messages as $wall){
                ?>
        <div class="wall-message"><span class="posted_by"><?=$wall->posted_by?></span><time><?=date('Y-m-d H:i:s')?></time><div class="content"><?=$wall->content?></div></div>    
                <?php
            }
        }
        ?>
    </div>
    <div class="wall-input">
        <textarea id="wallmsg"></textarea>
        <button  id="sendwallmsg">Send</button>
    </div>
</div>
        <?php
    }
}
    }
    ?>
      <div class="serverworks"><p>Working...</p></div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
