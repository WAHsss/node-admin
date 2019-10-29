import userView from '../../views/main/user.art';
import httpMode from '../../models/http';
import store from 'store';
class User{
    constructor(){
        this.isSignin = false;
        this.username = '';
        this.render();
    }
    async render(){
        await this.getIsSign();
        $('#user-cont').html(userView({
            isSignin: this.isSignin,
            username : this.username
        }))
        $('#singout').on('click',async ()=>{
            let result = await httpMode.get({url: '/api/users/signout'});
            if(result.ret){
                store.remove('token');
                location.href = 'sign.html'
            }
        })
    }
    async getIsSign(){
        let result = await httpMode.get({url: '/api/users/isSignin'});
        let username = result.data.username;
        
        this.isSignin = username ? true : false;
        this.username = username;
    }
}
export default new User()