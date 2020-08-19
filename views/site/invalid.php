<?php

/* @var $this yii\web\View */
$bg = \app\models\Config::find()->where(['config_key'=>'background'])->one();
$name = \app\models\Config::find()->where(['config_key'=>'name'])->one();
$this->title = $name->config_value;
?>
<style>
    .wrap{
        background-image:url('<?=$bg->config_value?>');
    }
</style>
<?php
$folders = app\models\Folder::find()->where(['parent_folder_id'=>0])->all();
$files = app\models\File::find()->where(['folder_id'=>0])->all();
$wall = app\models\Wall::find()->all();
if($folders){
    foreach($folders as $folder){
        ?>
<div class="folder <?=$folder->is_protected?'protected':'';?>" data-path="<?=$folder->path?>">
    <div class="folder-icon" style="background-image: url(<?=$folder->icon?>)"></div>
    <div class="folder-name"><?=$folder->name?></div>
</div>    
        <?php
    }
}
if($files){
    foreach($files as $file){
        ?>
<div class="file <?=$file->is_protected?'protected':'';?>">
    <div class="file-icon" style="background-image: url(<?=$file->icon?>)"></div>
    <div class="file-name"><?=$file->name?></div>
</div>    
        <?php
    }
}
?>