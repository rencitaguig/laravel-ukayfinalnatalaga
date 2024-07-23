$(document).ready(function () {
    var table = $('#brandtable').DataTable({
        ajax: {
            url: "/api/brands",
            dataSrc: ""
        },
        dom: 'Bfrtip',
        buttons: [
            'pdf',
            'excel',
            {
                text: 'Add Brand',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    $("#brandform").trigger("reset");
                    $('#brandModal').modal('show');
                    $('#brandUpdate').hide();
                    $('#brandSubmit').show();
                    $('#brandImages').remove();
                }
            }
        ],
        columns: [
            { data: 'id', title: 'ID' },
            { data: 'name', title: 'name' },
            { data: 'company', title: 'company' },
            { data: 'website', title: 'website' },
            { data: 'description', title: 'description' },
            { data: 'status', title: 'status' },
            {
                data: 'logo',
                title: 'Image',
                render: function (data, type, row) {
                    var imgPaths = data.split(',');
                    var imagesHTML = '';
                    imgPaths.forEach(function (path) {
                        if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png')) {
                            imagesHTML += `<img src="${path}" width="50" height="60" style="margin-right: 5px;">`;
                        }
                    });
                    return imagesHTML;
                }
            },
            {
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    return `<a href='#' class='editBtn' data-id="${data.id}"><i class='fas fa-edit' style='font-size:24px'></i></a>
                            <a href='#' class='deleteBtn' data-id="${data.id}"><i class='fas fa-trash-alt' style='font-size:24px; color:red'></i></a>`;
                }
            }
        ],
    });

        // Event listener for the "Generate Chart" button
        $("#generateChartBtn").on('click', function () {
            fetchBrandData();
        });
    
        // Fetch brand data and render pie chart
        function fetchBrandData() {
            $.ajax({
                url: "/api/brands",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    renderPieChart(data);
                },
                error: function (error) {
                    console.error("Error fetching brand data:", error);
                }
            });
        }
    
        function renderPieChart(data) {
            var brandStatusCounts = data.reduce((acc, brand) => {
                acc[brand.status] = (acc[brand.status] || 0) + 1;
                return acc;
            }, {});
    
            var labels = Object.keys(brandStatusCounts);
            var counts = Object.values(brandStatusCounts);
    
            var ctx = document.getElementById('brandPieChart').getContext('2d');
            var brandPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    var label = context.label || '';
                                    var value = context.raw || 0;
                                    var total = context.chart._metasets[0].total;
                                    var percentage = ((value / total) * 100).toFixed(2) + '%';
                                    return label + ': ' + value + ' (' + percentage + ')';
                                }
                            }
                        }
                    }
                }
            });
    
            // Show the chart container
            $('#chartContainer').show();
        }

    $("#brandSubmit").on('click', function (e) {
        e.preventDefault();
        var data = $('#brandform')[0];
        let formData = new FormData(data);
        $.ajax({
            type: "POST",
            url: "/api/brands",
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                $("#brandModal").modal("hide");
                table.ajax.reload();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#brandtable tbody').on('click', 'a.editBtn', function (e) {
        e.preventDefault();
        $('#brandImages').remove();
        $('#brandId').remove();
        $("#brandform").trigger("reset");

        var id = $(this).data('id');
        $('<input>').attr({ type: 'hidden', id: 'brandId', name: 'id', value: id }).appendTo('#brandform');
        $('#brandModal').modal('show');
        $('#brandSubmit').hide();
        $('#brandUpdate').show();

        $.ajax({
            type: "GET",
            url: `/api/brands/${id}`,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                $('#name_id').val(data.name);
                $('#company_id').val(data.company);
                $('#website_id').val(data.website);
                $('#description_id').val(data.description);
                $('#status_id').val(data.status);

                var imagesHTML = '';
                data.logo.split(',').forEach(function (path) {
                    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png')) {
                        imagesHTML += `<img src="${path}" width='200px' height='200px'>`;
                    }
                });
                $("#brandform").append("<div id='brandImages'>" + imagesHTML + "</div>");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#brandUpdate").on('click', function (e) {
        e.preventDefault();
        var id = $('#brandId').val();
        var data = $('#brandform')[0];
        let formData = new FormData(data);
        formData.append("_method", "PUT");
        $.ajax({
            type: "POST",
            url: `/api/brands/${id}`,
            data: formData,
            contentType: false,
            processData: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType: "json",
            success: function (data) {
                $('#brandModal').modal("hide");
                table.ajax.reload();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#brandtable tbody').on('click', 'a.deleteBtn', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var $row = $(this).closest('tr');
        bootbox.confirm({
            message: "Do you want to delete this brand?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    $.ajax({
                        type: "DELETE",
                        url: `/api/brands/${id}`,
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        dataType: "json",
                        success: function (data) {
                            table.row($row).remove().draw();
                        },
                        error: function (error) {
                            console.log(error);
                        }
                        
                    });
                }
            }
        });
    });
});
