// var $=document.querySelector.bind(document);
// var $$=document.querySelectorAll.bind(document);

// $('.confirmDeletion').onclick = (e)=> { //chỉ tác dụng với phần tử đầu tiên có class confirmDeletion
//     if(!confirm('Confirm deletion'))
//     {
//         return false;
//     }
// }



$('.confirmDeletion').on('click', function () {
    if (!confirm('Confirm deletion'))
        return false;
});
   





























