<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "folder".
 *
 * @property int $folder_id
 * @property int $parent_folder_id
 * @property string $name
 * @property string $icon
 * @property int $is_protected
 * @property string $password
 * @property string $path
 */
class Folder extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'folder';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['parent_folder_id', 'is_protected'], 'integer'],
            [['name'], 'required'],
            [['name', 'path','background'], 'string', 'max' => 255],
            [['icon'], 'string', 'max' => 255],
            [['password'], 'string', 'max' => 120],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'folder_id' => 'Folder ID',
            'parent_folder_id' => 'Parent Folder ID',
            'name' => 'Name',
            'icon' => 'Icon',
            'is_protected' => 'Is Protected',
            'password' => 'Password',
            'path' => 'Path',
        ];
    }
    public function beforeSave($insert) {
        $parent = Folder::find()->where(['folder_id'=>$this->parent_folder_id])->one();
        if($parent){
            $this->path=$parent->path.'/'.$this->name;
        }else{
            $this->path='/'.$this->name;
        }
        return parent::beforeSave($insert);
    }
    
    public function afterSave($insert, $changedAttributes) {

        $childs = Folder::find()->where(['parent_folder_id'=>$this->folder_id])->all();
        if($childs){
            foreach($childs as $child){
                $folder = Folder::find()->where(['folder_id'=>$child->folder_id])->one();
                $folder->save();
            }
        }
        return parent::afterSave($insert, $changedAttributes);
    }
    public function afterDelete() {

        $childs = Folder::find()->where(['parent_folder_id'=>$this->folder_id])->all();
        if($childs){
            foreach($childs as $child){
                $folder = Folder::find()->where(['folder_id'=>$child->folder_id])->one();
                $folder->delete();
            }
        }
        $files = File::find()->where(['folder_id'=>$this->folder_id])->all();
        if($files){
            foreach($files as $file){
                $file->delete();
            }
        }
        return parent::afterDelete();
    }
    public function getParent(){
        return $this->hasOne(Folder::className(), array('folder_id'=>'parent_folder_id'));
    }
    public function isSecure(){
        $is_secure = false;
        if($this->is_protected){
            return true;
        }
        if($this->parent){
            $is_secure = $this->parent->isSecure();
        }
        return $is_secure;
    }
}
