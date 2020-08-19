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
    <div class="folder-header">
        <a href="/"><i class="fa fa-long-arrow-alt-left"></i></a><h1>Home</h1>
    </div>
<div><p><?=$msg?></p></div>