<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "config".
 *
 * @property int $config_id
 * @property string $config_key
 * @property string $config_value
 */
class Config extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'config';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['config_key', 'config_value'], 'required'],
            [['config_value'], 'string'],
            [['config_key'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'config_id' => 'Config ID',
            'config_key' => 'Config Key',
            'config_value' => 'Config Value',
        ];
    }
}
