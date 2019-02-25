//функция валидации e-mail
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //alert(pattern.test(emailAddress));
    return pattern.test(emailAddress);
}

function check_nameinput(){
    var nameinput = $('.name_input').val();

    if($.trim(nameinput).length == 0)
    {
        $('.name_input').css('border-color','red');
        $('.error_name').remove();
        $('.name_div').append('<span class="error_name">Укажите ваше имя</span>');
        //alert("Уважите Ваше имя");
        return true;
    }
    else{
        $('.name_input').css('border-color','#dddede');
        $('.error_name').remove();
        return false;
    }
    return false;
}

function check_textinput(){
    var textinput = $('.text_input').val();

    if($.trim(textinput).length == 0)
    {
        $('.text_input').css('border-color','red');
        $('.error_text').remove();
        $('.text_div').append('<span class="error_text">Введите сообщение</span>');
        return true;
        //alert("Введите сообщение");
    }
    else{
        $('.text_input').css('border-color','#dddede');
        $('.error_text').remove();
        return false;
    }
    return false;

}

function check_phonenumber(){
    var phonenumber = $('.phoneinput').val();

    if($(".phoneinput").val().length==18 && phonenumber != "+7 (___) ___ __ __")
    {
        phonenumber = phonenumber.substring(5, 8);
        if (phonenumber == "000" || phonenumber == "111" || phonenumber == "222" || phonenumber == "333" || phonenumber == "444"
            || phonenumber == "555" || phonenumber == "666" || phonenumber == "777" || phonenumber == "888" || phonenumber == "999")
        {
            $('.phoneinput').css('border-color','red');
            $('.error_phone').remove();
            $('.phone_div').append('<span class="error_phone">Неверно указан номер телефона</span>');
            return true;
            //alert("Неверно указан номер телефона");
        }
        else
        {
            $('.phoneinput').css('border-color','#dddede');
            $('.error_phone').remove();
            return false;
        }
    }
    else
    {
        $('.phoneinput').css('border-color','red');
        $('.error_phone').remove();
        $('.phone_div').append('<span class="error_phone">Пожалуйста, укажите Ваш номер телефона</span>');
        return true;
        //alert("Пожалуйста, укажите Выш номер телефона");

    }
    return false;
}

function check_mailinput(){

    var mailinput = $('.mail_input').val();

    if($.trim(mailinput).length == 0){
        $('.error_mail').remove();
        $('.mail_div').append('<span class="error_mail">Укажите e-mail</span>');
        $('.mail_input').css('border-color','red');
        return true;
        //alert("Укажите e-mail");
    }
    else
    {
        //alert(isValidEmailAddress(mailinput));
        if(!isValidEmailAddress(mailinput))
        {
            $('.mail_input').css('border-color','red');
            $('.error_mail').remove();
            $('.mail_div').append('<span class="error_mail">Неверно указан e-mail</span>');
            //alert("Неверно указан e-mail");
            return true;
        }
        else{
            $('.mail_input').css('border-color','#dddede');
            $('.error_mail').remove();
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

function active_tab(number_active, thistab, number_noactive){
    $(".tabstyle").removeClass("activetab");
    thistab.addClass("activetab");
    $(".tab"+number_active).css({'display':'block'});
    $(".tab"+number_noactive[0]).css({'display':'none'});
    $(".tab"+number_noactive[1]).css({'display':'none'});
}

function change_active_tab(curr_elem){
    var id_curr_active_tab = curr_elem.parent().parent().attr('id');
    var text_curr_active_tab = curr_elem.parent().parent().find('.text_active_tab').text();
    var id_curr_elem = curr_elem.attr('id');
    var text_curr_elem = curr_elem.text();

    // set active tab new value
    curr_elem.parent().parent().attr('id', id_curr_elem);
    curr_elem.parent().parent().find('.text_active_tab').text(text_curr_elem);

    //set hidden tab new value eq value current active tab
    curr_elem.attr('id', id_curr_active_tab);
    curr_elem.text(text_curr_active_tab);

    // show need tab
    $("."+id_curr_elem).css('display','block');
    $("."+id_curr_active_tab).css('display', 'none');
}

