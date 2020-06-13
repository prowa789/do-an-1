$(document).ready(function () {
    var dropdown=$('.dropdown1');
    var sub_sidebar =$('.sub-sidebar');
    sub_sidebar.hide();
    dropdown.click(function (e) { 
        e.preventDefault();
        $(this).next().slideToggle();
    });

    $('#table1').DataTable();
});

