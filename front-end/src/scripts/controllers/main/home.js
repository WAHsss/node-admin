import homeView from '../../views/main/home.art';

export const artical = (req,res,next)=>{
    res.render(homeView());
}