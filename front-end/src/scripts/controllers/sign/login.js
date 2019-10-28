import httpModel from '../../models/http';
import loginView from '../../views/sign/login.art';
class Login{
    constructor(){
        this.bindEvent();
    }
    bindEvent(){
        $('.signup').on('click',this.handlePostData.bind(this));
    }
    async handlePostData(){
        let data = $('.content-wrap').serialize();
        let result = await httpModel.post({
            url:'/api/users/login',
            data,
            type:'post'
        });
        this.handleSuccess(result);
    }
    handleSuccess(res){
        if(res.ret === true){
            location.href = 'index.html';
        }else{
            $(`<div class="alert alert-danger alert-dismissible fade in" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <strong>${res.data.message}</strong>
            </div>`).appendTo('.social');
        }
    }
}
export const loginController =(req,res,next)=> {
    res.render(loginView());
    new Login();
}
