<?php

/* @var $this yii\web\View */
$bg = \app\models\Config::find()->where(['config_key'=>'background'])->one();
$name = \app\models\Config::find()->where(['config_key'=>'name'])->one();
$this->title = $name->config_value;
$bgs = $bg->config_value;
if(!empty($folder->background)){
    $bgs=$folder->background;
}
$bk='/';
if($folder->parent){
    $bk=$folder->parent->path;
}
?>
<style>
    .wrap{
        background-image:url('<?=$bgs?>');
    }
</style>
<div>
    <div class="folder-header">
        <a href="<?=$bk?>"><i class="fa fa-long-arrow-alt-left"></i></a><h1><?=$folder->name?></h1>
    </div>
    <div class="folder-content">
<?php
$folders = app\models\Folder::find()->where(['parent_folder_id'=>$folder->folder_id])->all();
$files = app\models\File::find()->where(['folder_id'=>$folder->folder_id])->all();
$links = app\models\Link::find()->where(['folder_id'=>$folder->folder_id])->all();
$wall = app\models\Wall::find()->all();
if($folders){
    foreach($folders as $cfolder){
        ?>
<div class="folder <?=$cfolder->is_protected?'protected':'';?> folder-<?=$cfolder->folder_id?>" data-path="<?=$cfolder->path?>" data-id="<?=$cfolder->folder_id?>" data-name="<?=$cfolder->name?>" data-icon="<?=$cfolder->icon?>">
    <div class="folder-icon"><span class="fiv-sqo fiv-icon-<?=$cfolder->icon?>"></span></div>
    <div class="folder-name"><?=$cfolder->name?></div>
</div>    
        <?php
    }
}
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
</div>
<span class="parent_folder_id" style="display:none"><?=$folder->folder_id?></span>