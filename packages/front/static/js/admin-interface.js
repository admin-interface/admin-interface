// update model
$(document).on('click', 'button.update-model', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $form = $this.parents('form');
    var url   = $form.attr('action');

    $.ajax({
        url:    url,
        method: 'PUT',
        data:   $form.serializeArray()
    }).done(function () {
        swal({
            type:  'success',
            title: 'Updated!',
            timer: 1500
        });
    }).fail(function () {
        swal({
            type:  'error',
            title: 'Error!',
            text:  'An error occurred during the upgrade'
        });
    });
});

// delete model item
$(document).on('click', 'a.delete-single-model[data-action=delete]', function (e) {
    e.preventDefault();
    var $this = $(this);

    swal({
        title:              "Are you sure?",
        text:               "You will not be able to recover this entry!",
        type:               "warning",
        showCancelButton:   true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText:  "Yes, delete it!",
        cancelButtonText:   "No, cancel!",
        closeOnConfirm:     false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                url:    $this.data('api-url'),
                method: 'DELETE'
            }).done(function (response) {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
                if (response.redirect) {
                    setTimeout(function () {
                        window.location.replace(response.redirect);
                    }, 1500);
                }
            }).fail(function () {
                swal({
                    type:  'error',
                    title: 'Error!',
                    text:  'An error occurred during the delete'
                });
            });
        }
    });
});

// create model item
$(document).on('click', 'a.create-single-model[data-action=create]', function (e) {
    e.preventDefault();
    var $this = $(this);
    var modal = $(document).find('.create-modal[data-modal-key=' + $this.data('modal-key') + ']');
    var $form = modal.find('form');

    function _sendData(e) {
        e.preventDefault();

        $.ajax({
            url:    $form.attr('action'),
            method: 'POST',
            data:   $form.serializeArray()
        }).done(function (response) {
            swal("Created!", "", "success");
            if (response.redirect) {
                setTimeout(function () {
                    window.location.replace(response.redirect);
                }, 1500);
            }
        }).fail(function () {
            swal({
                type:  'error',
                title: 'Error!',
                text:  'An error occurred during the creation'
            });
        });
    }

    // Show modal window
    modal.modal('show');

    // Add event listener
    $form.on('submit', _sendData);

    // Remove event listener
    modal.on('hidden.bs.modal', function () {
        $form.off('submit', _sendData);
    });
});

// TinyMCE
setTimeout(function () {
    $(document).find('textarea.tinymce-field-type').each(function () {
        var $this = $(this);
        tinymce.init({
            target:   this,
            theme:    $this.data('tinymce-theme'),
            height:   $this.data('tinymce-height'),
            plugins:  $this.data('tinymce-plugins'),
            toolbar1: $this.data('tinymce-toolbar1'),
            toolbar2: $this.data('tinymce-toolbar2'),
            readonly: $this.data('disable'),
            setup: function (editor) {
                editor.on('change', function () {
                    editor.save();
                });
            }
        });
    });
}, 0);
