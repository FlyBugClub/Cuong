$(function () {
  $('#datetimes').daterangepicker({
    timePicker: true,
    // singleDatePicker: true,
    startDate: moment().startOf("hour"),
    maxDate: moment().startOf("hour" + "minute"),
    locale: {
      format: "MM/DD/YYYY hh:mm:ss A",
    },
  });
});