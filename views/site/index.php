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
<div class="folder-content">
<?php
$folders = app\models\Folder::find()->where(['parent_folder_id'=>0])->all();


if($folders){
    foreach($folders as $folder){
        ?>
<div class="folder <?=$folder->is_protected?'protected':'';?> folder-<?=$folder->folder_id?>" data-path="<?=$folder->path?>" data-id="<?=$folder->folder_id?>" data-name="<?=$folder->name?>" data-icon="<?=$folder->icon?>">
    <div class="folder-icon"><span class="fiv-sqo fiv-icon-<?=$folder->icon?>"></span></div>
    <div class="folder-name"><?=$folder->name?></div>
</div>    
        <?php
    }
}
$files = app\models\File::find()->where(['folder_id'=>0])->all();
if($files){
    foreach($files as $file){
        ?>
<div class="file <?=$file->is_protected?'protected':'';?> file-<?=$file->file_id?>" data-id="<?=$file->file_id?>" data-name="<?=$file->name?>">
    <div class="file-icon"><span class="fiv-sqo fiv-icon-<?=$file->type?>"></span></div>
    <div class="file-name"><?=$file->name?></div>
</div>     
        <?php
    }
}
$links = app\models\Link::find()->where(['folder_id'=>0])->all();
if($links){
    foreach($links as $link){
        ?>
<div class="link  link-<?=$link->link_id?>" data-id="<?=$link->link_id?>" data-url="<?=$link->url?>" data-name="<?=$link->name?>" data-icon="<?=$link->icon?>">
    <div class="link-icon"><span class="mdi mdi-<?=$link->icon?>"></span></div>
    <div class="link-name"><?=$link->name?></div>
</div>     
        <?php
    }
}
?>
</div>
<span class="parent_folder_id" style="display:none">0</span>