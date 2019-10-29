import store from 'store';
export default {
    post({ url , data={} , type= 'POST',boo = true}){
        let headers ={};
        if(!boo){
            let token = store.get('token');
            headers = {
                'x-access-token' : token
            }
        }
        return $.ajax({
            url,
            data,
            type,
            dataType: "json",
            headers,
            success: (result, textStatus, jqXHR)=>{
                boo ? store.set('token',jqXHR.getResponseHeader('x-access-token')): '';
                return result;
            }
        })
    },
    get({ url , data={} , type = 'GET' }){
        let token = store.get('token');
        return $.ajax({
            url,
            data,
            type,
            dataType: "json",
            headers : {
                'x-access-token' : token
            },
            success: (result)=>{
                return result;
            }
        })
    }
}