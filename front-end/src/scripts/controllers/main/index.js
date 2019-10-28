import indexView from '../../views/main/index.art';

class Index{
    constructor(){
        $('#root').html(indexView());
    }
}
export default new Index()