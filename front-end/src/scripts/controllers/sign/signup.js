import httpModel from '../../models/http';
import signupView from '../../views/sign/signup.art';
class Signup{
    constructor(){
        this.bindEvent();
    }
    bindEvent(){
        $('.signup').on('click',this.handleSubmit.bind(this));
    }
    async handleSubmit(){
        let data = $('.login-wrapper').serialize();
        console.log(data);
        let result = await httpModel.post({
            url :'/api/users/signup',
            data,
            type:'POST'
        });
        this.handleSuccess(result);
    }  
    handleSuccess(result){
        if(result.ret){
            location.hash = 'login'
        }else{
            $(`<div class="alert alert-danger alert-dismissible fade in" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <strong>${result.data.message}</strong>
            </div>`).appendTo('.my-alert-box');
        }
    }
}
export const signupController = (req,res,next)=>{
    res.render(signupView());
    new Signup()
} 