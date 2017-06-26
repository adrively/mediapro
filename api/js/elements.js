$(document).ready(function(){
    $('.modal').modal();
});

$(document).ready(function() {
    $('select').material_select();
  });

  $('.datepicker').pickadate({
  selectMonths: true,
  selectYears: 15,
  format: 'mm-d-yyyy'
});

$(document).ready(function(){
    $('.tooltipped').tooltip({delay: 30});
  });
