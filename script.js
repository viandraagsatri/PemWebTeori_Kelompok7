document.addEventListener("DOMContentLoaded", function() {

    const formRegis = document.getElementById('form-regis');
    
    if (formRegis) {
        formRegis.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirm_password = document.getElementById('confirm_password').value;

            if (password !== confirm_password) {
                alert('Pendaftaran Gagal: Kata sandi dan konfirmasi kata sandi tidak cocok!');
                return;
            }

            let users = JSON.parse(localStorage.getItem('si_aksi_users')) || [];

            const userExists = users.find(u => u.email === email);
            if (userExists) {
                alert('Pendaftaran Gagal: Email ini sudah terdaftar!');
                return;
            }

            const newUser = {
                fullname: fullname,
                email: email,
                password: password,
                isVerified: false 
            };
            
            users.push(newUser);
            localStorage.setItem('si_aksi_users', JSON.stringify(users));

            alert('Pendaftaran Berhasil!\n\nAkun Anda telah masuk ke sistem, namun masih menunggu verifikasi dari Administrator agar dapat digunakan.');
            window.location.href = 'index.html'; 
        });
    }

    const formLogin = document.getElementById('form-login');
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('si_aksi_users')) || [];
            const validUser = users.find(u => u.email === email && u.password === password);

            if (validUser) {
                if (validUser.isVerified === true) {
                    localStorage.setItem('si_aksi_loggedIn', JSON.stringify(validUser));
                    alert('Login Berhasil! Selamat datang, ' + validUser.fullname);
                    window.location.href = 'dashboard-user.html'; 
                } else {
                    alert('AKSES DITOLAK: Akun Anda belum diverifikasi oleh Administrator. Silakan tunggu atau hubungi admin.');
                }
            } else {
                alert('LOGIN GAGAL: Email atau Kata Sandi salah!');
            }
        });
    }

});