$(function () {
    $('.parts-list-card').each(function () {
        var $card = $(this);

        // Connect DataTable
        $card.find('.dataTable').each(function () {
            var $this = $(this);

            var table = $this.DataTable({
                responsive: true,
                serverSide: true,
                processing: true,
                columnDefs: [
                    {
                        targets:   'no-sort',
                        orderable: false
                    },
                    {
                        "targets":        'actions',
                        "orderable":      false,
                        "data":           null,
                        "defaultContent": '<span data-action="show"><i class="material-icons">mode_edit</i></span><span data-action="delete"><i class="material-icons">delete</i></span>'
                    }
                ],
                ajax:       {
                    url: $card.data('ajax-url'),
                }
            });

            // Handler search from any column
            $this.find('.head-search-field-input').click(function (e) {
                e.stopPropagation();
            }).on('keyup', function () {
                $this.find('.head-search-field-input').each(function () {
                    var $input = $(this);
                    table
                        .column($input.parents('th').data('column-id'))
                        .search($input.val())
                });
                table.draw();
            });

            // Handler the action show
            $this.on('click', '[data-action="show"]', function () {
                var data             = table.row($(this).parents('tr')).data();
                window.location.href = data[ data.length - 2 ];
            });

            // Handler the action delete
            $this.on('click', '[data-action="delete"]', function () {
                var row   = table.row($(this).parents('tr'));
                var data  = row.data();
                // var modal = $card.find('.delete-modal');

                swal({
                    title:              "Are you sure?",
                    text:               "You will not be able to recover this entry!",
                    type:               "warning",
                    showCancelButton:   true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText:  "Yes, delete it!",
                    cancelButtonText:   "No, cancel!",
                    closeOnConfirm:     false,
                }, function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url:    data[ data.length - 1 ],
                            method: 'DELETE'
                        }).done(function () {
                            swal({
                                type: 'success',
                                title: 'Deleted!',
                                text: 'Your imaginary file has been deleted.',
                                timer: 1500
                            });
                            table.ajax.reload(null, false);
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
        });

        // $card.find('a[data-action="create"]').each(function () {
        //     var $this = $(this);
        //     $this.on('click', function (e) {
        //         e.preventDefault();
        //         var modal = $card.find('.create-modal');
        //
        //         // Show modal window
        //         modal.modal('show');
        //     });
        // });
    });
});