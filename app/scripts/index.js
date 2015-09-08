$(window).ready(function(){
    $('.sec-left .secBtn').click(function(){
        $('.sec-left .secBtn').removeClass('active');
        $(this).addClass('active');
        checkGrpBtn();
    });
    var grpAct = false;
    $('.sec-left .secGrpBtn > .Gbtn ').click(function(){
        if(!grpAct){
            $(this).find('.bl-arrow').addClass('bl-arrowDown');
            grpAct = true;
        }else{
            $(this).find('.bl-arrow').removeClass('bl-arrowDown');
            grpAct = false;
        }
        $(this).parent().find('.btnSec').slideToggle();
        checkGrpBtn();
    });

    function checkGrpBtn(){
        var x = $('.sec-left .secGrpBtn > .btnSec > a').hasClass('active');
        if(x){
            console.log(x);
        }
    }
});
$(document).on('click','.b-btnGrp > span',function(){
    $(this).parent().find('span').removeClass('active');
    $(this).addClass('active');
});
$(document).on('click','.selectGrp > .foot > span',function(){
    var that = $(this);
    var id = that.attr('value');
    var name = that.html();
    that.parent().parent().find('.text-slot').html(name);
    that.parent().parent().find('input').val(id);
    //that.parent().hide();
});
$(document).on('click','.postform > .heading > span',function(){
    var that = $(this);
    var passid = that.attr('value');
    $(this).parent().parent().find('.cont').removeClass('active');
    $(this).parent().parent().find('.tab' + passid).addClass('active');
});