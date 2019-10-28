import calendarView from '../../views/main/calendar.art';

export const table = (req, res, next) => {
    let scriptTags = `<script src="/assets/vendors/fullcalendar/fullcalendar.js"></script>
                    <script src="/assets/vendors/fullcalendar/gcal.js"></script>
                    <script src="/assets/js/calendar.js"></script>`;
    $('#container').html(calendarView() + scriptTags);
}