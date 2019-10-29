import calendarView from '../../views/main/calendar.art';
import httpModel from '../../models/http';
export const table = async (req, res, next) => {
    let list = await httpModel.get({url : '/api/position/list'});
    if(list.ret){
        let scriptTags = `<script src="/assets/vendors/fullcalendar/fullcalendar.js"></script>
                    <script src="/assets/vendors/fullcalendar/gcal.js"></script>
                    <script src="/assets/js/calendar.js"></script>`;
        $('#container').html(calendarView() + scriptTags);
    }else{
        res.go('/home');
    }
}