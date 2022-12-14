<script setup>
import { getDatabase, ref, update, get, child } from 'firebase/database'
import { useRouter } from 'vue-router';
import {onBeforeMount} from '@vue/runtime-core'
let uid = sessionStorage.getItem('uid')
let router = useRouter()
let db = getDatabase();
onBeforeMount(() => {
    if (sessionStorage.getItem('user') == null) {
        alert('Silahkan login terlebih dahulu')
        router.push('/LogSign')
    }
    // const db = getDatabase()
    const dbref = ref(db)
    get(child(dbref, sessionStorage.getItem('uid'))).then(snap => {
        if (snap.exists()) {
            // alert(snap.val().umur)
            document.getElementById('umur').innerHTML = snap.val().umur + " Hari"
        }
    })
})
let inputumur = () => {
    let umur = prompt('Berapa umur benih?')
    update(ref(db, uid + "/"), {
        umur: parseInt(umur, 10)
    }).then(() => {
        alert("Berhasil input umur")
    }).catch((err) => {
        alert(err.message)
    })
}
let inputpopulasi = () => {
    let pop = prompt('Berapa populasi benih?')
    update(ref(db, uid + '/'), {
        populasi: parseInt(pop, 10)
    }).then(() => {
        alert('Berhasil input populasi')
    }).catch((err) => {
        alert(err.message)
    })
}
let toPakan = () => {
    router.push('/Pakan')
}
let toHome = () => {
    router.push('/Home')
}
</script>

<template>
    <div class="container">
        <br>
        <div class="row" style="justify-content: center;">
            <div class="col-5">
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-2">
                        <img src="../assets/Logo.png" width="100%">
                    </div>
                    <div class="col">
                        <h5>Lele kamu sudah berusia</h5>
                        <h5 id="umur"></h5>
                    </div>
                </div>
            </div>
            <div class="col-1">
                <div class="ms-btn-group">
                    <button class="ms-btn ms-small" @click="toHome"><img
                            src="https://icongr.am/material/home.svg?size=18" alt=""></button>
                </div>
            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col">
                        <h5>Halaman Control</h5>
                    </div>
                </div>
            </div>
        </div><br>
        <div class="ms-alert ms-fullwidth" style="background-color: rgba(180,180,180,0.7);">
            <div class="col" style="text-align: center;">
                <h1>Masukkan data berikut ini</h1>
                <h6>Data akan digunakan untuk menakar pakan lelemu</h6>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col">
                <div class="ms-alert ms-action ms-light" style="display:grid; text-align:center; align-items: center;">
                    <strong>
                        <p>Umur lele </p>
                        <p>Penentuan banyak sedikitnya pakan</p>
                        <p>Semakin tua umur, semakin banyak pakan</p>
                    </strong>
                </div>
            </div>
            <div class="col">
                <div class="ms-alert ms-action ms-light" style="display:grid; text-align:center; align-items: center;">
                    <strong>
                        <p>Pakan lele </p>
                        <p>Komposisi pakan yang akan digunakan</p>
                    </strong>
                </div>
            </div>
            <div class="col">
                <div class="ms-alert ms-action ms-light" style="display:grid; text-align:center; align-items: center;">
                    <strong>
                        <p>Populasi lele </p>
                        <p>Penentuan banyak sedikitnya pakan</p>
                        <p>Semakin banyak populasi, semakin banyak pakan</p>
                    </strong>
                </div>
            </div>
        </div>
        <div class="row">
            <br>
        </div>
        <div class="row">
            <div class="col">
                <div class="wrap" style="text-align: center;">
                    <button class="ms-btn ms-large ms-secondary" style="background-color: rgba(101,93,89,0.6);" @click="inputumur"><img src="../assets/image-5.png" alt=""><br>Umur
                        Lele</button>
                </div>
            </div>
            <div class="col">
                <div class="wrap" style="text-align: center;">
                    <button class="ms-btn ms-large ms-secondary" style="background-color: rgba(101,93,89,0.6);" @click="toPakan"><img src="../assets/image-4.png" alt=""><br>Data
                        Pakan</button>
                </div>
            </div>
            <div class="col">
                <div class="wrap" style="text-align: center;">
                    <button class="ms-btn ms-large ms-secondary" style="background-color: rgba(101,93,89,0.6);" @click="inputpopulasi"><img src="../assets/image-6.png" alt=""><br>Populasi
                        Lele</button>
                </div>
            </div>
        </div>
    </div>
</template>