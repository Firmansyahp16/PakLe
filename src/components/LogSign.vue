<template>
    <div class="container" style="text-align: center;">
        <div class="row">
            <div class="col">
                <img src="../assets/Logo.png" style="width: 20%;">
            </div>
        </div>
        <br>
        <div class="row" style="background-color: rgba(101,93,89,0.3); padding: 1%; border-radius: 60px;">
            <div class="col">
                <div class="container">
                    <div class="title">
                        <h1>Login</h1>
                    </div>
                    <div class="container">
                        <form>
                            <div class="ms-form-group">
                                <label>Email</label>
                                <input type="email" v-model="email_log" placeholder="example@gmail.com">
                            </div>
                            <div class="ms-form-group">
                                <label>Password</label>
                                <input type="password" v-model="password_log" placeholder="minimum 6 chars">
                            </div>
                        </form>
                        <button @click="login" class="ms-btn ms-action ms-medium ms-rounded">Login</button>
                    </div>
                </div>
            </div>
            <div class="col-1" style="border-right: 6px solid white; border-left: 6px solid white"></div>
            <div class="col">
                <div class="container">
                    <div class="title">
                        <h1>Sign Up</h1>
                    </div>
                    <div class="container">
                        <form>
                            <div class="ms-form-group">
                                <label>Email</label>
                                <input type="email" v-model="email_sign" placeholder="example@gmail.com">
                            </div>
                            <div class="ms-form-group">
                                <label>Password</label>
                                <input type="password" v-model="password_sign" placeholder="minimum 6 chars">
                            </div>
                        </form>
                        <button @click="signup" class="ms-btn ms-secondary ms-medium ms-rounded">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email_log = ref('')
const password_log = ref('')
const email_sign = ref('')
const password_sign = ref('')
const router = useRouter()

const login = () => {
    signInWithEmailAndPassword(getAuth(), email_log.value, password_log.value)
        .then((data) => {
            let user = data.user
            if (sessionStorage.getItem('uid') == user.uid) {
                alert('Anda sudah login, silahkan ke halaman utama')
                router.push('/Home')
            }
            else {
                alert("Anda berhasil login, selamat datang di PakLe")
                sessionStorage.setItem('user', user)
                sessionStorage.setItem('uid', user.uid)
                router.push("/Home")
            }
        })
        .catch((err) => {
            alert(err.message)
        })
}

const signup = () => {
    createUserWithEmailAndPassword(getAuth(), email_sign.value, password_sign.value)
        .then((data) => {
            alert("Anda berhasil mendaftar, silahkan login")
            email_sign.value = ''
            password_sign.value = ''
        })
        .catch((err) => {
            alert(err.message)
        })
}
</script>