function modifyForm() {
    console.log("signupForm");

    let form = document.modify_form;
    if(form.m_mail.value === '') {
        alert('input ur mail');
        form.m_mail.focus();
    } else if (form.m_phone.value === '') {
        alert('input ur phone');
        form.m_phone.focus();
    } else {
        form.submit();
    }
}