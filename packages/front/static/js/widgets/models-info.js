$(function () {
    $('.widget-models-info').each(function() {
        var $this = $(this);

        $.ajax({
            method: 'GET',
            url: $this.data('url')
        }).done(function(data) {
            data.forEach(function(info) {
                $this.find('.info-box[data-model=' + info.model + '] .count-to').data('to', info.count);
            });
            $('.widget-models-info .count-to').countTo();
        });
    })
});