
// блоки расчета стоимости полиса, ведущие на страницу магазина (тут же формируется base64 в get'е для подстановки в поля на стрнице магазина)
$( document ).ready(function() {

    // выбор стран
    $('#input-main-wrapp .countrypick').select2({
        // сортируем резульат по самому раннему вхождению
        // multiple: true,
        maximumSelectionLength: 1,
        width: 312,
        sorter: function(results) {
            var query = $('.select2-search__field').val().toLowerCase();
            return results.sort(function(a, b) {
              return a.text.toLowerCase().indexOf(query) -
                b.text.toLowerCase().indexOf(query);
            });
          }
    });

    // выбор стран
    $('#product-country-wrapp .countrypick').select2({
        // сортируем резульат по самому раннему вхождению
        // multiple: true,
        maximumSelectionLength: 1,
        width: "100%",
        sorter: function(results) {
            var query = $('.select2-search__field').val().toLowerCase();
            return results.sort(function(a, b) {
                return a.text.toLowerCase().indexOf(query) -
                b.text.toLowerCase().indexOf(query);
            });
            }
    });

    // страница оптимы верхний блок
    // $("#optima-calc-form").validationEngine({
    //     promptPosition: "topLeft",
    //     scroll: false,
    // }),
   

    $(".btns_form-prices .upper-btn").click(function(e){
        e.preventDefault();
        console.log("UPPER BTN CLICK!!!");
        var formIsValid = $("#optima-calc-form").validationEngine("validate",{ scroll: false });
        if(formIsValid) {

                var link = "/online-insurance-of-tourists/#"
                var program = $(".prorgam").val();
                var type = $(".prorgam-type").val();
                var country = $("select[name='country'] option:selected").attr('data-country-code');
                console.log(country);
                var dateIn = $("#from-date").val();
                var dateOut = $("#to-date").val();
                if(testCyrilic(country)){
                    country = encodeURIComponent(country);
                }
                console.log(country);
                var country_encode = base64.encode('country=' + country);
                var dateInEncode = base64.encode('%26startDate=' + dateIn);
                var dateOutEncode = base64.encode('%26endDate=' + dateOut);

                originParams = "country=" + country + "&startDate=" + dateIn + "&endDate=" + dateOut + "&program=" + program + "&type=" + type;
                console.log(originParams);
                originParams = base64.encode(originParams);
                link = link + originParams;
                window.location.href = link;
        } 
        
    });
    
    // страница оптимы нижний блок
    // $("#optima-calc-form-bottom").validationEngine({
    //     promptPosition: "topLeft",
    //     scroll: false,
    // }),

    $(".btns_form-prices .bottom-btn").click(function(e){
        e.preventDefault();
        console.log("BOTTOM BTN CLICK!!!");
        //var formIsValid = $("#optima-calc-form-bottom").validationEngine("validate",{ scroll: false });
        var formIsValid = true;
        if(formIsValid) {
                var link = "/online-insurance-of-tourists/#"
                var program = $(".prorgam").val();
                var type = $(".prorgam-type").val();
                var country = $("select[name='country'] option:selected").attr('data-country-code');
                console.log(country);
                var dateIn = $("#from-date_bottom").val();
                var dateOut = $("#to-date_bottom").val();
                if(testCyrilic(country)){
                    country = encodeURIComponent(country);
                }
                console.log(country);
                var country_encode = base64.encode('country=' + country);
                var dateInEncode = base64.encode('%26startDate=' + dateIn);
                var dateOutEncode = base64.encode('%26endDate=' + dateOut);
                originParams = "country=" + country + "&startDate=" + dateIn + "&endDate=" + dateOut + "&program=" + program + "&type=" + type;
                originParams = base64.encode(originParams);
                link = link + originParams;
                window.location.href = link;
        } 
        
    });

    function testCyrilic(term){
        return /[а-яА-ЯЁё]/.test(term);
    }

});