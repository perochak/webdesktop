<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\Folder;
use app\models\File;
use app\models\Config;
use yii\helpers\Url;
use app\models\Link;

class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex($slug='')
    {
 
        if(!empty($slug)){
            $slug = urldecode($slug);
            $folder = Folder::find()->where(['name'=>$slug])->one();
            if($folder){
                // check if folder is secure
                $see_withoutpass = true;
                if(!$folder->isSecure()){
                    $see_withoutpass = false;
                }
                if(!Yii::$app->user->isGuest){
                    $see_withoutpass = true;
                }
                if($see_withoutpass){
                    return $this->render('folder',['folder'=>$folder]);
                }else{
                    if(!$folder->is_protected){
                        $parent = $folder->parent;
                        if($parent->isSecure()){
                            $password = isset(Yii::$app->session['folder'.$parent->folder_id])?Yii::$app->session['folder'.$parent->folder_id]:'';
                            if($password!=$parent->password){
                                return $this->redirect($parent->path);
                            }
                            
                        }
                    }elseif($folder->parent){
                        $parent = $folder->parent;
                        $password = isset(Yii::$app->session['folder'.$folder->folder_id])?Yii::$app->session['folder'.$folder->folder_id]:'';
                        if($password==$folder->password){

                        }
                    }
                    $posted = '';
                    if(Yii::$app->request->isPost){
                        $password = Yii::$app->request->post('password');
                        if($password==$folder->password){
                            Yii::$app->session['folder'.$folder->folder_id]=$password;
                        }else{
                            $posted = 'Invalid Password';
                        }
                    }
                    $password = isset(Yii::$app->session['folder'.$folder->folder_id])?Yii::$app->session['folder'.$folder->folder_id]:'';
                    if($password==$folder->password){
                        return $this->render('folder',['folder'=>$folder]);
                    }else{
                        return $this->render('folderpassword',['posted'=>$posted,'folder'=>$folder]);
                    }
                    
                }
            }else{
                return $this->render('invalid');
            }
        }else{
            return $this->render('index');
        }
    }
    public function actionCreatefolder()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $parent_folder_id = Yii::$app->request->post('parent_folder_id');
           $name = Yii::$app->request->post('name');
          
           if(!empty($name)){
               $folder = new Folder;
               $folder->name = $name;
               $folder->parent_folder_id = $parent_folder_id;
               $folder->icon='folder';
               $folder->is_protected=0;
              
               if($folder->save()){
                    return $this->asJson([
                        'result'=>'OK',
                        'folder'=>'<div class="folder  folder-'.$folder->folder_id.'" data-path="'.$folder->path.'" data-id="'.$folder->folder_id.'" data-name="'.$folder->name.'" data-icon="'.$folder->icon.'">
        <div class="folder-icon"><span class="fiv-sqo fiv-icon-'.$folder->icon.'"></span></div>
         <div class="folder-name">'.$name.'</div>
     </div>'
                    ]);
               }
           }
           
       }
        }
       return $this->asJson([
           'result'=>'Error'
           ]);
    }
    public function actionCreatelink()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $folder_id = Yii::$app->request->post('folder_id');
           $name = Yii::$app->request->post('name');
           $url = Yii::$app->request->post('url');
           $icon = Yii::$app->request->post('icon');
          
           if(!empty($name)){
               $link = new Link;
               $link->name = $name;
               $link->folder_id = $folder_id;
               $link->icon=$icon;
               $link->url = $url;
     
              
               if($link->save()){
                    return $this->asJson([
                        'result'=>'OK',
                        'link'=>'<div class="link  link-'.$link->link_id.'" data-url="'.$link->url.'" data-id="'.$link->link_id.'" data-name="'.$link->name.'" data-icon="'.$link->icon.'">
        <div class="link-icon"><span class="mdi mdi-'.$link->icon.'"></span></div>
         <div class="link-name">'.$link->name.'</div>
     </div>'
                    ]);
               }
           }
           
       }
        }
       return $this->asJson([
           'result'=>'Error'
           ]);
    }
    public function actionUpdatefolder()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $folder_id = Yii::$app->request->post('folder_id');
           $key = Yii::$app->request->post('key');
           $value = Yii::$app->request->post('val');
          
       
               $folder = Folder::find()->where(['folder_id'=>$folder_id])->one();
               if($folder){
                if($key=='name'){
                     $folder->name = $value;
                }elseif($key=='icon'){
                     $folder->icon = $value;
                }elseif($key=='password'){
                    if($value==''){
                        $folder->is_protected=0;
                        $folder->password='';
                    }else{
                        $folder->is_protected=1;
                        $folder->password=$value;
                    }
                }

              
               if($folder->save()){
                   $protected=$folder->is_protected==1?'protected':'';
                    return $this->asJson([
                        'result'=>'OK',
                        'folder'=>'<div class="folder '.$protected.' folder-'.$folder->folder_id.'" data-path="'.$folder->path.'" data-id="'.$folder->folder_id.'" data-name="'.$folder->name.'" data-icon="'.$folder->icon.'">
        <div class="folder-icon"><span class="fiv-sqo fiv-icon-'.$folder->icon.'"></span></div>
         <div class="folder-name">'.$folder->name.'</div>
     </div>'
                    ]);
               }
               }
           
       }
        }
       return $this->asJson([
           'result'=>'Error'
           ]);
    }
    public function actionUpdatefile()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $file_id = Yii::$app->request->post('file_id');
           $key = Yii::$app->request->post('key');
           $value = Yii::$app->request->post('val');
          
       
               $file = File::find()->where(['file_id'=>$file_id])->one();
               if($file){
                if($key=='name'){
                     $file->name = $value;
                }elseif($key=='icon'){
                     $file->icon = $value;
                }elseif($key=='password'){
                    if($value==''){
                        $file->is_protected=0;
                        $file->password='';
                    }else{
                        $file->is_protected=1;
                        $file->password=$value;
                    }
                }

              
               if($file->save()){
                   $protected=$file->is_protected==1?'protected':'';
                    return $this->asJson([
                        'result'=>'OK',
                        'file'=>'<div class="file '.$protected.' file-'.$file->file_id.'" data-path="'.$file->path.'" data-id="'.$file->file_id.'" data-name="'.$file->name.'">
        <div class="file-icon"><span class="fiv-sqo fiv-icon-'.$file->type.'"></span></div>
         <div class="file-name">'.$file->name.'</div>
     </div>'
                    ]);
               }
               }
           
       }
        }
       return $this->asJson([
           'result'=>'Error'
           ]);
    }
    
    public function actionUpdatelink()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $link_id = Yii::$app->request->post('link_id');
           $key = Yii::$app->request->post('key');
           $value = Yii::$app->request->post('val');
          
       
               $link = Link::find()->where(['link_id'=>$link_id])->one();
               if($link){
                if($key=='name'){
                     $link->name = $value;
                }elseif($key=='icon'){
                     $link->icon = $value;
                }elseif($key=='password'){
                    if($value==''){
                        $link->is_protected=0;
                        $link->password='';
                    }else{
                        $link->is_protected=1;
                        $link->password=$value;
                    }
                }

              
               if($link->save()){
                   $protected='';//;$link->is_protected==1?'protected':'';
                    return $this->asJson([
                        'result'=>'OK',
                        'link'=>'<div class="link '.$protected.' link-'.$link->link_id.'" data-id="'.$link->link_id.'" data-name="'.$link->name.'" data-icon="'.$link->icon.'">
        <div class="link-icon"><span class="mdi mdi-'.$link->icon.'"></span></div>
         <div class="link-name">'.$link->name.'</div>
     </div>'
                    ]);
               }
               }
           
       }
        }
       return $this->asJson([
           'result'=>'Error'
           ]);
    }
    
    public function actionDeletefolder(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
            if(Yii::$app->request->isPost){
                $folder_id = Yii::$app->request->post('folder_id');
                $folder = Folder::find()->where(['folder_id'=>$folder_id])->one();
                    if($folder){
                        $folder->delete();
                        return $this->asJson([
                            'result'=>'OK'
                        ]);
                    }
            }
        }
        return $this->asJson([
           'result'=>'Error'
           ]);
    }
     public function actionDeletefile(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
            if(Yii::$app->request->isPost){
                $file_id = Yii::$app->request->post('file_id');
                $file = File::find()->where(['file_id'=>$file_id])->one();
                    if($file){
                        $file->delete();
                        return $this->asJson([
                            'result'=>'OK'
                        ]);
                    }
            }
        }
        return $this->asJson([
           'result'=>'Error'
           ]);
    }
     public function actionDeletelink(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
            if(Yii::$app->request->isPost){
                $link_id = Yii::$app->request->post('link_id');
                $link = Link::find()->where(['link_id'=>$link_id])->one();
                    if($link){
                        $link->delete();
                        return $this->asJson([
                            'result'=>'OK'
                        ]);
                    }
            }
        }
        return $this->asJson([
           'result'=>'Error'
           ]);
    }
    public function actionUpload(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        if(!Yii::$app->user->isGuest){
       if(Yii::$app->request->isPost){
           $type = Yii::$app->request->post('type');
           $folder_id = Yii::$app->request->post('folder_id');
            if($type=='background' || $type=='file' || $type=='icon'){
                
                $uploader = \yii\web\UploadedFile::getInstanceByName('file');
                if($uploader){
                    $time = md5(time());
                    $path = Yii::$app->basePath.'/images/'.$uploader->name;
                    if($type=='file'){
                        $path=Yii::$app->basePath.'/uploads/'.$time.$uploader->name;
                    }
                    if($uploader->saveAs($path)){
                        if($folder_id=='0' && $type!='file'){
                                $config = Config::find()->where(['config_key'=>'background'])->one();
                                if($config){
                                    $config->config_value='/images/'.$uploader->name;
                                    $config->save();
                                    return $this->asJson([
                                        'result'=>'OK',
                                        'file'=>$config->config_value
                                    ]);
                                }
                        }elseif(($folder_id=='0' && $type=='file') || ($folder_id!='0' && $type=='file')){
                            $file = new File;
                            $file->folder_id = $folder_id;
                            $file->type = $uploader->extension;
                            $file->name=$uploader->name;
                            $file->path=$time.$uploader->name;
                            if($file->save()){
                                return $this->asJson([
                                    'result'=>'OK',
                                    'file'=>'<div class="file file-'.$file->file_id.'" data-name="'.$file->name.'" data-id="'.$file->file_id.'">
    <div class="file-icon"><span class="fiv-sqo fiv-icon-'.$file->type.'"></span></div>
    <div class="file-name">'.$file->name.'</div>
</div>  '
                                    ]);    
                            }
                        }else{
                            $folder = Folder::find()->where(['folder_id'=>$folder_id])->one();
                            if($folder){
                                if($type=='icon'){
                                    $folder->icon='/images/'.$uploader->name;
                                }elseif($type=='background'){
                                    $folder->background='/images/'.$uploader->name;
                                }
                                $folder->save();
                                return $this->asJson([
                                        'result'=>'OK',
                                        'file'=>$folder->$type
                                    ]);
                            }
                        }
                    }

                }
                
            }
       }     
        }
       return $this->asJson([
           'result'=>'Error'
           ]);       
    }
    public function actionPostwall(){
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
       if(Yii::$app->request->isPost){
           $message = Yii::$app->request->post('message');
           $config = Config::find()->where(['config_key'=>'config_allow_wall'])->one();
           if($config->config_value=='1'){
               $posted_by = 'Guest';
               if(!Yii::$app->user->isGuest){
                   $posted_by='Admin';
               }
               $wall = new \app\models\Wall;
               $wall->content = $message;
               $wall->posted_by = $posted_by;
               $wall->datetime = time();
               if($wall->save()){
                                return $this->asJson([
                                        'result'=>'OK',
                                        'content'=>'<div class="wall-message"><span class="posted_by">'.$wall->posted_by.'</span><time>'.date('Y-m-d H:i:s').'</time><div class="content">'.$wall->content.'</div></div>'
                                    ]);                   
               }
           }
       }
              return $this->asJson([
           'result'=>'Error'
           ]);   
    }
    public function actionFile($id){
        $file = File::find()->where(['file_id'=>$id])->one();
        if($file){
            if(!$file->is_protected){
                Yii::$app->session['file_'.$id]=md5($id);
              return $this->asJson([
                    'result'=>'OK',
                    'url'=>Url::to('/download/'.$id,true)
               ]);   
            }else{
              return $this->asJson([
                    'result'=>'OK',
                    'url'=>Url::to('/filepassword/'.$id,true)
               ]);                 
            }
        }
              return $this->asJson([
           'result'=>'Error'
           ]);         
    }
    public function actionDownload($id){
        $file = File::find()->where(['file_id'=>$id])->one();
        $msg='Invalid File';
        if($file){
                $s = isset(Yii::$app->session['file_'.$id])?Yii::$app->session['file_'.$id]:'';
                $p = md5($id);
                if($s==$p){
                     $f = Yii::$app->basePath.'/uploads/'.$file->path;
                    if(file_exists($f)){
                        $c = file_get_contents($f);
                        return Yii::$app->response->sendFile($f,$file->name);
                    }
                }else{
                    $msg='Invalid Download Session';
                }
        }
        return $this->render('invalidfile',[
            'msg'=>$msg
        ]);       
    }
    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }
}
