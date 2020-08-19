<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "file".
 *
 * @property int $file_id
 * @property int $folder_id
 * @property string $name
 * @property int $is_protected
 * @property string $password
 * @property string $icon
 * @property string $type
 * @property string $path
 */
class File extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['folder_id', 'is_protected'], 'integer'],
            [['name', 'type', 'path'], 'required'],
            [['name'], 'string', 'max' => 200],
            [['password'], 'string', 'max' => 120],
            [['icon', 'type'], 'string', 'max' => 30],
            [['path'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'file_id' => 'File ID',
            'folder_id' => 'Folder ID',
            'name' => 'Name',
            'is_protected' => 'Is Protected',
            'password' => 'Password',
            'icon' => 'Icon',
            'type' => 'Type',
            'path' => 'Path',
        ];
    }
}
