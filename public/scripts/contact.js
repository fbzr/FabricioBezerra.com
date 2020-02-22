document.getElementById('contactForm').addEventListener('submit', submitForm);
    
    async function submitForm(e) {
        e.preventDefault();

        try {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdTx7cUAAAAAPQGHWIczsIUJhuz6dJkOP_iduPw', {action: 'home'})
                    .then(async function(token) {
                        
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const message = document.getElementById('message').value;

                        const body = JSON.stringify({ 
                            name,
                            email,
                            message,
                            token
                        });

                        const config = {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        } 
                        let msg = '';
                        try {
                            const res = await axios.post('/contact', body, config);
                            document.getElementById('modalTitle').innerHTML = "Awesome";
                            document.getElementById('modalIcon').innerHTML = "&#xE876;"
                            document.querySelector('.icon-box').classList.remove('error');
                            msg = res.data.msg;

                            // Redirect to "/" when modal popup is closed
                            $("#modalMessageConfirmation").on('hidden.bs.modal', function(){
                                window.location.replace("/");
                            });
                        } catch (err) { 
                            document.getElementById('modalTitle').innerHTML = "Error";
                            document.getElementById('modalIcon').innerHTML = "&#xe645;"
                            document.querySelector('.icon-box').classList.add('error');
                            msg = err.response.data.errors[0].msg;

                            if (err.recaptcha) {
                                console.log(err.recaptcha);
                            }
                        }
                        document.getElementById('modalMessage').innerHTML = msg;
                        $('#modalMessageConfirmation').modal('toggle');
                }); 
            });
        } catch (err) {
            console.error(err.message);
        }
    }