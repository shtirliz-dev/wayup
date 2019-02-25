//функция валидации e-mail
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //alert(pattern.test(emailAddress));
    return pattern.test(emailAddress);
}

function text_error(typeinput){

    switch (typeinput){
        case "name":
            return "Укажите ваше имя";
            break;
        case "mail":
            return "Укажите e-mail";
            break;
        case "mail1":
            return "Неверно указан e-mail";
            break;
        case "phone1":
            return "Неверно указан номер телефона";
            break;
        case "phone":
            return "Пожалуйста, укажите Ваш номер телефона";
            break;
        case "adress":
            return "Укажите адрес отделения Нова Пошта";
            break;
        case "comment":
            return "Укажите комментарий к заявке";
            break;
        default:
            return "Ошибка при вводе данных";
    }

}

function check_no_empty(typeinput, numberinput){
    var inputform = $('#' + typeinput + '_input' + numberinput).val();

    if($.trim(inputform).length == 0)
    {
        $('#' + typeinput + '_input' + numberinput).css('border-color','red');
        $('.error_'+ typeinput + numberinput).remove();
        $('.'+ typeinput +'_div' + numberinput).append('<span class="error_'+ typeinput + numberinput + '">'+ text_error(typeinput) +'</span>');
        //alert("Уважите Ваше имя");
        return true;
    }
    else{
        $('#' + typeinput + '_input' + numberinput).css('border-color','#ffffff');
        $('.error_'+ typeinput + numberinput).remove();
        return false;
    }
    return false;
}

function check_phonenumber(typeinput, numberinput){
    var phonenumber = $('#' + typeinput + '_input' + numberinput).val();

    if($('#' + typeinput + '_input' + numberinput).val().length==19 && phonenumber != "+38 (___) ___-__-__")
    {
        phonenumber = phonenumber.substring(5, 8);
        if (phonenumber == "000" || phonenumber == "111" || phonenumber == "222" || phonenumber == "333" || phonenumber == "444"
            || phonenumber == "555" || phonenumber == "666" || phonenumber == "777" || phonenumber == "888" || phonenumber == "999")
        {
            $('#' + typeinput + '_input' + numberinput).css('border-color','red');
            $('.error_'+ typeinput + numberinput).remove();
            $('.'+ typeinput +'_div' + numberinput).append('<span class="error_'+ typeinput + numberinput + '">'+ text_error(typeinput + 1) +'</span>');
            return true;
            //alert("Неверно указан номер телефона");
        }
        else
        {
            $('#' + typeinput + '_input' + numberinput).css('border-color','#ffffff');
            $('.error_'+ typeinput + numberinput).remove();
            return false;
        }
    }
    else
    {
        $('#' + typeinput + '_input' + numberinput).css('border-color','red');
        $('.error_'+ typeinput + numberinput).remove();
        $('.'+ typeinput +'_div' + numberinput).append('<span class="error_'+ typeinput + numberinput + '">'+ text_error(typeinput) +'</span>');
        return true;
        //alert("Пожалуйста, укажите Выш номер телефона");

    }
    return false;
}

function check_mailinput(typeinput, numberinput){

    var mailinput = $('#' + typeinput + '_input' + numberinput).val();

    if($.trim(mailinput).length == 0){
        $('.error_'+ typeinput + numberinput).remove();
        $('.'+ typeinput +'_div' + numberinput).append('<span class="error_'+ typeinput + numberinput + '">'+ text_error(typeinput) +'</span>');
        $('#' + typeinput + '_input' + numberinput).css('border-color','red');
        return true;
        //alert("Укажите e-mail");
    }
    else
    {
        //alert(isValidEmailAddress(mailinput));
        if(!isValidEmailAddress(mailinput))
        {
            $('#' + typeinput + '_input' + numberinput).css('border-color','red');
            $('.error_'+ typeinput + numberinput).remove();
            $('.'+ typeinput +'_div' + numberinput).append('<span class="error_'+ typeinput + numberinput + '">'+ text_error(typeinput + 1) +'</span>');
            //alert("Неверно указан e-mail");
            return true;
        }
        else{
            $('#' + typeinput + '_input' + numberinput).css('border-color','#dddede');
            $('.error_'+ typeinput + numberinput).remove();
            return false;
        }

    }

}

function close_window_recall(){
    $('.modal_background').fadeOut(500);
    $('.mask_div').fadeOut(500);

    $('input, textarea').each(
        function(index){
            var input = $(this);
            input.css({'border-color' : '#dddede'});
            input.val("");
        }
    );

    $(".search-send").val("поиск");

    $('.error_name').remove();
    $('.error_text').remove();
    $('.error_phone').remove();
    $('.error_mail').remove();
    $('.send_recall').val("Отправить запрос");
}

function func_send_mail(){
    if(!check_mailinput() && !check_nameinput() && !check_phonenumber() && !check_textinput()){
        $.ajax({
            async:false,
            type: 'POST',
            url: 'send_mail_phone.php',
            data: {
                phone: $(".phoneinput").val(),
                name: $('.name_input').val(),
                mail: $('.mail_input').val(),
                text_mess: $('.text_input').val()
            },
            success: function (data) { console.log(data);
                if(data == "OK"){
                    $('.modal_background').fadeOut(500);
                    $('.mask_div').fadeOut(500);
                    close_window_recall();

                    $('.phoneinput').val("");
                }else{
                    $(".phoneinput").css('color','red');
                }
            }
        });
    }
    else
    {
        alert ("Пожалуйста, заполните все поля корректно!");
    }
};

