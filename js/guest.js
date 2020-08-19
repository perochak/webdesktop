function openfolder(path){
    window.location.href=path;
}
function downloadFile(id){
    // get file url to download or ask for password
    $.ajax({
        url:'/file/'+id,
        success:function(data){
            if(data.result=='OK'){
                window.location.href=data.url;
            }
        }
    })
}
(function($){
    $(document).ready(function(){
        $(document).on('click','.folder',function(){
            openfolder($(this).data('path'));
        });
        $(document).on('click','.file',function(){
            downloadFile($(this).data('id'));
        });
        $(document).on('click','.link',function(){
            $('#link_open').attr('href',$(this).data('url'));
            document.getElementById('link_open').click();
        });        
    })
})(jQuery);