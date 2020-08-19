<?php
namespace app\models;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class FolderRule extends \yii\web\UrlRule{
    public function parseRequest($manager, $request) {
        
        $url = explode('/',trim($request->url,'/'));
        $params=array();
        if($url){
            foreach($url as $folder){
                
            }
            $params['slug']= array_pop($url);
        }
        return ['site/index',$params];
    }
}
