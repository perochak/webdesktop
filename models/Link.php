<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "link".
 *
 * @property int $link_id
 * @property int $folder_id
 * @property string $name
 * @property string $url
 * @property string $icon
 */
class Link extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'link';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['folder_id'], 'integer'],
            [['name', 'url', 'icon'], 'required'],
            [['url'], 'string'],
            [['name'], 'string', 'max' => 50],
            [['icon'], 'string', 'max' => 30],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'link_id' => 'Link ID',
            'folder_id' => 'Folder ID',
            'name' => 'Name',
            'url' => 'Url',
            'icon' => 'Icon',
        ];
    }
}
