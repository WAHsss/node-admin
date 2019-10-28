import signLayoutView from  '../../views/sign/layout.art';

class Layout{
    render(){
        $('#root').html(signLayoutView());
    }
}
export default new Layout().render()