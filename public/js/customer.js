$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/customers",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $.each(data, function (key, value) {
                var id = value.user_id;
                var img = "<img src='/storage/images/" + value.image_path + "' width='200px' height='200px'/>";
                var tr = $("<tr>");
                tr.append($("<td>").html(value.user_id));
                tr.append($("<td>").html(img));
                tr.append($("<td>").html(value.last_name));
                tr.append($("<td>").html(value.first_name));
                tr.append($("<td>").html(value.phone_number));
                tr.append($("<td>").html(value.address));
                tr.append("<td align='center'><a href='#' data-toggle='modal' data-target='#customerModal' id='editbtn' data-id=" + id + "><i class='fas fa-edit' aria-hidden='true' style='font-size:24px; color:blue'></i></a></td>");
                tr.append("<td><a href='#' class='deletebtn' data-id=" + id + "><i class='fa fa-trash' style='font-size:24px; color:red'></a></i></td>");
                $("#cbody").append(tr);
            });
        },
        error: function () {
            console.log('AJAX load did not work');
            alert("Error loading customers.");
        }
});

    $("#customerSubmit").on('click', function (e) {
        e.preventDefault();
        var data = $('#cform')[0];
        console.log(data);
        let formData = new FormData(data);
        console.log(formData);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        $.ajax({
            type: "POST",
            url: "/api/customers",
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#customerModal").modal("hide");
                var img = "<img src=" + data.customer.image_path + " width='200px', height='200px'/>";
                var tr = $("<tr>");
                tr.append($("<td>").html(data.customer.user_id));
                tr.append($("<td>").html(img));
                tr.append($("<td>").html(data.customer.last_name));
                tr.append($("<td>").html(data.customer.first_name));
                tr.append($("<td>").html(value.first_name));
                tr.append($("<td>").html(value.phone_number));
                tr.append($("<td>").html(data.customer.address));
                tr.append("<td align='center'><a href='#' data-toggle='modal' data-target='#customerModal' id='editbtn' data-id=" + data.customer.user_id + "><i class='fas fa-edit' aria-hidden='true' style='font-size:24px' ></a></i></td>");
                tr.append("<td><a href='#'  class='deletebtn' data-id=" + data.customer.user_id + "><i  class='fa fa-trash' style='font-size:24px; color:red' ></a></i></td>");
                $("#cbody").prepend(tr);

            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#customerModal').on('show.bs.modal', function(e) {
        $("#cform").trigger("reset");
        $('#user_id').remove()
        $('#image').remove()
        console.log(e.relatedTarget)
        var id = $(e.relatedTarget).attr('data-id');
        console.log(id);

        $('<input>').attr({type: 'hidden', id:'user_id',name: 'user_id',value: id}).appendTo('#cform');
        $.ajax({
            type: "GET",
            url: `/api/customers/${id}`,
            success: function(data){
                   // console.log(data);
                   $("#user_id").val(data.user_id);
                   $("#last_name").val(data.last_name);
                   $("#first_name").val(data.first_name);
                   $("#address").val(data.address);
                //    $("#zip_code").val(data.zip_code);
                   $("#phone_number").val(data.phone_number);
                   $("#email").val(data.user.email);
                   $("#cform").append(`<img src=" ${data.image_path}" width='200px', height='200px' id="image"   />`)
              },
             error: function(){
              console.log('AJAX load did not work');
              alert("error");
              }
          });
    });

    /* $("#customerUpdate").on('click', function (e) {
        e.preventDefault
        var id = $('#user_id').val();
        var $row = $('tr td > a[data-id="' + id + '"]').closest('tr');
        console.log($row)
        // var data = $('#cform')[0];
        let formData = new FormData($('#cform')[0]);
        //formData.append('_method', 'PUT')
        $.ajax({
            type: "PUT",
            url: `/api/customers/${id}`,
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);

                $('#customerModal').modal('hide')
                $row.remove()
                var img = "<img src=" + data.customer.image_path + " width='200px', height='200px'/>";
                var tr = $("<tr>");
                tr.append($("<td>").html(data.customer.user_id));
                tr.append($("<td>").html(img));
                tr.append($("<td>").html(data.customer.last_name));
                tr.append($("<td>").html(data.customer.first_name));
                tr.append($("<td>").html(value.first_name));
                tr.append($("<td>").html(value.phone_number));
                tr.append($("<td>").html(data.customer.address));
                tr.append("<td align='center'><a href='#' data-toggle='modal' data-target='#customerModal' id='editbtn' data-id=" + data.customer.user_id + "><i class='fas fa-edit' aria-hidden='true' style='font-size:24px' ></a></i></td>");
                tr.append("<td><a href='#'  class='deletebtn' data-id=" + data.customer.user_id + "><i  class='fa fa-trash' style='font-size:24px; color:red' ></a></i></td>");
                $('#ctable').prepend(tr.hide().fadeIn(5000));
            },
            error: function (error) {
                console.log(error);
            }
        });
    }); */

    $("#customerUpdate").on('click', function (e) {
        e.preventDefault();
        var id = $('#user_id').val();
        console.log(id);
        var table = $('#ctable').DataTable();
        var data = $('#cform')[0];
        let formData = new FormData(data);
        formData.append("_method", "PUT")
        $.ajax({
            type: "POST",
            url: `http://localhost:8000/api/customers/${id}`,
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#customerModal').modal("hide");

                table.ajax.reload()

            },
            error: function (error) {
                console.log(error);
            }
        });
    });


    $('#ctable tbody').on('click', 'a.deletebtn', function (e) {

        var id = $(this).data('id');
        var $row = $(this).closest('tr');
        console.log(id);
        // console.log(table);
        e.preventDefault();
        bootbox.confirm({
            message: "do you want to delete this customer",
            buttons: {
                confirm: {
                    label: 'yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'no',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log(result);
                if (result)
                    $.ajax({
                        type: "DELETE",
                        url: `/api/customers/${id}`,
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            $row.fadeOut(4000, function () {
                                $row.remove()
                            });

                            bootbox.alert(data.message);
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
            }
        });
    });


})
