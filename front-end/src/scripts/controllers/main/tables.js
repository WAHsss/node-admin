import tableView from '../../views/main/tables.art';

export const list = (req,res,next)=>{
    res.render(tableView());
}
