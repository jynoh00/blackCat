let delete_click = () => {
    if (confirm('삭제할까요?')){
        document.querySelector('#delete_form').action = "/delete_process";
    }else{
        document.querySelector('#delete_form').action = "/";
    }
};