<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "wall".
 *
 * @property int $wall_id
 * @property string $posted_by
 * @property string $content
 * @property int $datetime
 */
class Wall extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'wall';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['posted_by', 'content', 'datetime'], 'required'],
            [['content'], 'string'],
            [['datetime'], 'integer'],
            [['posted_by'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'wall_id' => 'Wall ID',
            'posted_by' => 'Posted By',
            'content' => 'Content',
            'datetime' => 'Datetime',
        ];
    }
}
