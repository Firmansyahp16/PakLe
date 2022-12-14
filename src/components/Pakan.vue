<template>
    <div class="container">
        <br>
        <div class="row" style="justify-content: center;">
            <div class="col-5">
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-2">
                        <img src="../assets/Logo.png" width="80%">
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
                    <button class="ms-btn ms-small" @click="toUser"><img
                            src="https://icongr.am/material/account.svg?size=18" alt=""></button>
                </div>
            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col">
                        <h5>Halaman Pakan</h5>
                    </div>
                </div>
            </div>
        </div><br>
        <div class="ms-alert ms-fullwidth" style="background-color: rgba(180,180,180,0.7);">
            <div class="col" style="text-align: center;">
                <h1>Input Komposisi Pakan Lele</h1>
            </div>
        </div>
        <br>
        <div class="content_code">
            <form>
                <div class="row">
                    <div class="col-sm">
                        <div class="ms-form-group">
                            <label style="font-weight: bolder;">Protein</label>
                            <input class="ms-rounded" v-model="protein" type="number" placeholder="dalam (%)">
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="ms-form-group">
                            <label style="font-weight: bolder;">Lemak</label>
                            <input class="ms-rounded" v-model="lemak" type="number" placeholder="dalam (%)">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <div class="ms-form-group">
                            <label style="font-weight: bolder;">Karbohidrat</label>
                            <input class="ms-rounded" v-model="karbohidrat" type="number" placeholder="dalam (%)">
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="ms-form-group">
                            <label style="font-weight: bolder;">Vitamin</label>
                            <input class="ms-rounded" v-model="vitamin" type="number" placeholder="dalam (%)">
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="ms-form-group">
                            <label style="font-weight: bolder;">Mineral</label>
                            <input class="ms-rounded" v-model="mineral" type="number" placeholder="dalam (%)">
                        </div>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col" style="display: flex; justify-content: center; align-items: center;">
                    <button @click="inputpakan" class="ms-btn ms-large ms-secondary">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref as reff } from 'vue';
import { getDatabase, update, ref, get, child } from '@firebase/database';
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

const protein = reff('')
const lemak = reff('')
const karbohidrat = reff('')
const vitamin = reff('')
const mineral = reff('')

let db = getDatabase()
let uid = sessionStorage.getItem('uid')
let router = useRouter()
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
let inputpakan = () => {
    update(ref(db, uid + '/pakan/'), {
        protein: protein.value,
        lemak: lemak.value,
        karbohidrat: karbohidrat.value,
        vitamin: vitamin.value,
        mineral: mineral.value
    }).then(() => {
        alert("Data pakan berhasil dimasukkan")
        router.push('/Control')

    }).catch((err) => {
        alert(err.message)
    })
}
let toHome = () => {
    router.push('/Home')
}
let toUser = () => {
    router.push('/User')
}
</script>