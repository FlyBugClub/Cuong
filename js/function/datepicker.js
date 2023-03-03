var fromDate
$('#fromDate').on('change', function(){
  fromDate = $(this).val();
  $('#toDay').prop('min', function(){
    return fromDate;
  })
});
var toDate
$('#toDate').on('change', function(){
  toDate = $(this).val();
  $('#toDay').prop('max', function(){
    return toDate;
  })
});