$(function () {
    //Textare auto growth
    autosize($('textarea.auto-growth'));
    // console.log('run')

    //Datetimepicker plugin
    $('.datetimepicker').each(function() {
        var $this = $(this);
        $this.bootstrapMaterialDatePicker({
            format: $this.data('format'),
            clearButton: true,
            weekStart: 1,
            time: Boolean($this.data('time')),
            date: Boolean($this.data('date'))
        });
    })

    // $('.datepicker').bootstrapMaterialDatePicker({
    //     format: 'dddd DD MMMM YYYY',
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false
    // });

    // $('.timepicker').bootstrapMaterialDatePicker({
    //     format: 'HH:mm',
    //     clearButton: true,
    //     date: false
    // });
});