<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Protected Folder';
$this->params['breadcrumbs'][] = $this->title;
?>
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
<div class="site-login">
    <h1><?= Html::encode($folder->name) ?> Password</h1>
    <?php 
    if($posted){
        echo '<p>'.$posted.'</p>';
    }
    ?>
        <?php $form = ActiveForm::begin([
        'id' => 'login-form',
        'layout' => 'horizontal',
        'fieldConfig' => [
            'template' => "{label}\n<div class=\"col-lg-3\">{input}</div>\n<div class=\"col-lg-8\">{error}</div>",
            'labelOptions' => ['class' => 'col-lg-1 control-label'],
        ],
    ]); ?>
    <input type="password" name="password" value="" placeholder="Password">
        <div class="form-group">
            <div class="col-lg-offset-1 col-lg-11">
                <?= Html::submitButton('Password', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
            </div>
        </div>

    <?php ActiveForm::end(); ?>
</div>
