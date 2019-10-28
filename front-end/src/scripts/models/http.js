export default {
    post({ url , data={} , type = 'GET' }){
        return $.ajax({
            url,
            data,
            type,
            dataType: "json",
            success: (result)=>{
                return result;
            }
        })
    }
}