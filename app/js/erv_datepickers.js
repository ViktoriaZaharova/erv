// все новые дейтпикеры
$( document ).ready(function() {

  $(".ui-datepicker-trigger").click(function () {
      $(this).siblings("input").focus();
  });
  $('#optima-calc-country').bind('focus', function () {
      $(this).siblings('label').addClass('focused-label');
  })

  $('.input_focus-el').bind('focus', function () {
    $(this).siblings('label').addClass('focused-label');
  });

  $('.input_focus-el.input_country').bind('focusout', function () {
    if($(this).val() == ''){
      $(this).siblings('label').removeClass('focused-label');
      $(this).parent().removeClass("flat_before");
    }
  })

    console.log("document ready!");
    //datapickers на главной

    var weekday = new Array(7);
    weekday[0] = "Понедельник";
    weekday[1] = "Вторник";
    weekday[2] = "Среда";
    weekday[3] = "Четверг";
    weekday[4] = "Пятница";
    weekday[5] = "Суббота";
    weekday[6] = "Воскресенье";

    $('#form__input--from').datepicker({
        dateFormat: 'dd.mm.yy',
        // dateFormat: 'd MM yy',
        minDate: 0,
        changeYear: true,
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        changeMonth: true,
        altField: "#from-date",
        altFormat: "dd.mm.yy",
        beforeShow: customMainRange,
        onSelect: customMainRange,
        onSelect: function (dateStr, inst) {
            console.log("date FROM selected!");
            console.log(inst);
            var date = $(this).datepicker('getDate');
            var dayOfWeek = date.getUTCDay();
            console.log(weekday[dayOfWeek]);
            $("#form__input--to").datepicker("option", "minDate", dateStr);
            // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
            // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
            $(this).siblings('.shower').text(weekday[dayOfWeek]);
            // $(this).datepicker("refresh");

            localStorage.setItem('datefrom', date.getTime());

            //Оформление Отмены Поездки (как доп. Тариф и как основной) возможно только если до поездки не менее 5-ти дней.
            var today = new Date();
            console.log('Осталось ');
            console.log(parseInt(date.getTime()) - parseInt(today.getTime()));

            if (parseInt(date.getTime()) - parseInt(today.getTime()) < 432000000) {
                $('.rejectcheck').each(function () {
                    $(this)[0].checked = false;
                    $(this).attr('disabled', 'disabled');
                });
                $('.dateblocked').show();
                $('.rejectinput').val(0).attr('disabled', 'disabled');
                $('.summ.rejectprice').html('+ 0<span>,00</span> Р');
            } else {
                $('.rejectcheck').each(function () {
                    $(this).removeAttr('disabled');
                })
                $('.dateblocked').hide();
                $('.rejectinput').removeAttr('disabled');
            }
            // checkCol();
            // calculate();
        }
    });

    $('#form__input--to').datepicker({
        // dateFormat: 'd MM yy',
        dateFormat: 'dd.mm.yy',
        minDate: 0,
        changeYear: true,
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        changeMonth: true,
        altField: "#to-date",
        altFormat: "dd.mm.yy",
        beforeShow: customMainRange,
        onSelect: customMainRange,
        onSelect: function (dateStr, inst) {
            console.log("date FROM selected!");
            var date = $(this).datepicker('getDate');
            var dayOfWeek = date.getUTCDay();
            console.log(weekday[dayOfWeek]);
            $("#form__input--from").datepicker("option", "maxDate", dateStr);
            // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
            // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
            $(this).siblings('.shower').text(weekday[dayOfWeek]);
            // $(this).change();

            // localStorage.setItem('dateto', date.getTime());

            // calculate();
        }
    });

    // верхние на странице продукта
    var weekday = new Array(7);
    weekday[0] = "Понедельник";
    weekday[1] = "Вторник";
    weekday[2] = "Среда";
    weekday[3] = "Четверг";
    weekday[4] = "Пятница";
    weekday[5] = "Суббота";
    weekday[6] = "Воскресенье";

    $('#from-date-top').inputmask({"mask": "99.99.9999", "showMaskOnHover": false});
    $('#to-date-top').inputmask({"mask": "99.99.9999", "showMaskOnHover": false});

    $('#to-date-top').datepicker({
        dateFormat: 'dd.mm.yy',
        // dateFormat: 'd MM yy',
        minDate: 0,
        changeYear: true,
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        changeMonth: true,
        altField: "#to-date",
        altFormat: "dd.mm.yy",
        // beforeShow: customRange,
        // onSelect: customRange,
        onChangeMonthYear: function(a,b,c) {
            console.log("CHANGEEED!!!!!!!!!!!!!!!!!!!!!");
        },
        onSelect: function (dateStr, inst) {
            console.log("date FROM selected!");
            var date = $(this).datepicker('getDate');
            var dayOfWeek = date.getUTCDay();
            console.log(weekday[dayOfWeek]);
            $("#from-date-top").datepicker("option", "maxDate", dateStr);
            // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
            // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
            $(this).siblings('.shower').text(weekday[dayOfWeek]);
            $(this).change();

            //localStorage.setItem('dateto', date.getTime());
        },
        // onClose: function(){
        //     $('#from-date-top').datepicker("show");
        // }
    });

    $('#from-date-top').datepicker({
        dateFormat: 'dd.mm.yy',
        // dateFormat: 'd MM yy',
        minDate: 0,
        changeYear: true,
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        changeMonth: true,
        altField: "#from-date",
        altFormat: "dd.mm.yy",
        beforeShow: customRange,
        // onSelect: customRange,
        onSelect: function (dateStr, inst) {
            console.log("date FROM selected!");
            console.log(inst);
            var date = $(this).datepicker('getDate');
            var dayOfWeek = date.getUTCDay();
            console.log(weekday[dayOfWeek]);
            $("#to-date-top").datepicker("option", "minDate", dateStr);
            // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
            // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
            $(this).siblings('.shower').text(weekday[dayOfWeek]);
            // $(this).datepicker("refresh"); 
            $(this).change();
            //$('#to-date-top').focus();
            // $('#to-date-top').datepicker("show");
        },
        onClose: function(){
            console.log("closing 1st datepicker!!!");
            //return $('#to-date-top').datepicker("show");
            setTimeout(function () {
                $('#to-date-top').focus();
            }, 100);
        }
    });

    function showNextPicker(){
        $('#to-date-top').datepicker("show");
    }




    $('#from-date-top-bottom').inputmask({"mask": "99.99.9999", "showMaskOnHover": false});
    $('#to-date-top-bottom').inputmask({"mask": "99.99.9999", "showMaskOnHover": false});
    // нижние
    $('#from-date-top-bottom').datepicker({
      //dateFormat: 'mm,dd,DD',
      dateFormat: 'd MM yy',
      minDate: 0,
      changeYear: true,
      monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
      changeMonth: true,
      altField: "#from-date_bottom",
      altFormat: "dd.mm.yy",
      beforeShow: customRangeBottom,
      onSelect: customRangeBottom,
      onSelect: function (dateStr, inst) {
          console.log("date FROM selected!");
          console.log(inst);
          var date = $(this).datepicker('getDate');
          var dayOfWeek = date.getUTCDay();
          console.log(weekday[dayOfWeek]);
          $("#to-date-top-bottom").datepicker("option", "minDate", dateStr);
          // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
          // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
          $(this).siblings('.shower').text(weekday[dayOfWeek]);
          // $(this).datepicker("refresh"); 
          $(this).change();
      }
  });

  $('#to-date-top-bottom').datepicker({
      dateFormat: 'd MM yy',
      minDate: 0,
      changeYear: true,
      monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNames: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
      changeMonth: true,
      altField: "#to-date_bottom",
      altFormat: "dd.mm.yy",
      beforeShow: customRangeBottom,
      onSelect: customRangeBottom,
      onSelect: function (dateStr, inst) {
          console.log("date FROM selected!");
          var date = $(this).datepicker('getDate');
          var dayOfWeek = date.getUTCDay();
          console.log(weekday[dayOfWeek]);
          $("#from-date-top-bottom").datepicker("option", "maxDate", dateStr);
          // $(this).siblings('input[type="hidden"]').val(inst.selectedDay+'.'+(parseInt(inst.selectedMonth) + 1)+'.'+inst.selectedYear);
          // $(this).val(datearray[1]+' '+month+' '+inst.selectedYear);
          $(this).siblings('.shower').text(weekday[dayOfWeek]);
          // $(this).change();

          localStorage.setItem('dateto', date.getTime());
          $(this).change();
      }
  });

    function customMainRange(input, inst) {
      var dateFrom = $("#form__input--from").val();
      if (input.id == "form__input--to" && dateFrom) {
          var minD = inst.settings.minDate.split(" ");
          inst.dpDiv.addClass('dateto');
          $("a:contains('" + minD[0] + "')").addClass("first-date");
          $("#ui-datepicker-div:not(.agepick) td").live({
              mouseenter: function () {
                  $(this).parent().addClass("finalRow");
                  $(".finalRow").prevAll().find("td:not(.ui-datepicker-unselectable)").addClass("highlight");
                  $(this).prevAll("td:not(.ui-datepicker-unselectable)").addClass("highlight");
              },
              mouseleave: function () {
                  $(this).parent().removeClass("finalRow");
                  $("#ui-datepicker-div td").removeClass("highlight");
              }
          });
      } else {
          inst.dpDiv.removeClass('dateto');
      }
  }


    function customRange(input) {
        // if (input.id == "from-date-top") {

        //     $("#ui-datepicker-div td").die();

        //     if (selectedDate != null) {
        //         $('#to-date-top').datepicker('option', 'minDate', selectedDate).datepicker('refresh');
        //     }
        // }
        if (input.id == "to-date-top") {

            $("#ui-datepicker-div td").live({
                mouseenter: function () {
                    $(this).parent().addClass("finalRow");
                    $(".finalRow").prevAll().find("td:not(.ui-datepicker-unselectable)").addClass("highlight");
                    $(this).prevAll("td:not(.ui-datepicker-unselectable)").addClass("highlight");
                },
                mouseleave: function () {
                    $(this).parent().removeClass("finalRow");
                    $("#ui-datepicker-div td").removeClass("highlight");
                }
            });

            // var selectedDate = $("#from-date-top").datepicker("getDate");
            // if (selectedDate != null) {
            //     $('#to-date-top').datepicker('option', 'minDate', selectedDate).datepicker('refresh');
            // }
        }
    }

    function customRangeBottom(input) {
      if (input.id == "to-date-top-bottom") {
          $("#ui-datepicker-div td").live({
              mouseenter: function () {
                  $(this).parent().addClass("finalRow");
                  $(".finalRow").prevAll().find("td:not(.ui-datepicker-unselectable)").addClass("highlight");
                  $(this).prevAll("td:not(.ui-datepicker-unselectable)").addClass("highlight");
              },
              mouseleave: function () {
                  $(this).parent().removeClass("finalRow");
                  $("#ui-datepicker-div td").removeClass("highlight");
              }
          });
      }
  }

    // let inputMy = document.getElementById('optima-calc-country');
    $('#form__input--from').inputmask("99.99.9999");
    $('#form__input--to').inputmask("99.99.9999");

});