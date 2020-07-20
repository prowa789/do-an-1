$(document).ready(function () {
    var dropdown=$('.dropdown1');
    var sub_sidebar =$('.sub-sidebar');
    sub_sidebar.hide();
    dropdown.click(function (e) { 
        e.preventDefault();
        $(this).next().slideToggle();
    });
    var table = $('#table1')
    table.DataTable();
   
    
});
function convertMoney(money){
    var string="";
    var chuoi_ban_dau = money.toString();
    var len = money.toString().length;
    var k=len%3;
    if(k==0){len=len/3}else{len=len/3-1};
    var temp = chuoi_ban_dau.slice(0,k);
    string+=temp;
    for(var i=0;i<len;i++){
        if(k!=0){string+=".";}
        temp =chuoi_ban_dau.slice(k,k+3);
        string+=temp;
        k+=3;
    }
    return string;
}
