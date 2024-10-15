function signupForm() {
    console.log("signupForm");

    let form = document.signup_form;
    if(form.m_id.value === '') {
        alert('input ur id');
        form.m_id.focus();
    } else if(form.m_pw.value === '') {
        alert('input ur pw');
        form.m_pw.focus();
    } else if(form.m_mail.value === '') {
        alert('input ur mail');
        form.m_mail.focus();
    } else if (form.m_phone.value === '') {
        alert('input ur phone');
        form.m_phone.focus();
    } else {
        form.submit();
    }
}