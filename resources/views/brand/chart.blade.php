@extends('layouts.master')

@section('content')
<div class="container">
    <h2>Brand Status Pie Chart</h2>
    <canvas id="brandPieChart"></canvas>
</div>

@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var brands = @json($brands);

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
        }

        renderPieChart(brands);
    });
</script>
@endsection
