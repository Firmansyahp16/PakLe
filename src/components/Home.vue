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
                <div class="row" style="margin-top: 10%;margin-bottom: 10%;">
                    <h4>Selamat Datang</h4>
                    <h6>Mau ngapain hari ini?</h6>
                    <div class="row">
                        <div class="col-sm">
                            <button class="ms-btn ms-primary ms-rounded ms-medium">Logout</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- <div class="col-1"></div> -->
                    <div class="col-4">
                        <button @click="toControl" class="ms-btn ms-primary ms-large"
                            style="background-color: rgba(101,93,89,0.6);">
                            <img src="../assets/image-1.png"><br>Control</button>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-4">
                        <button @click="inputpenyebaran" class="ms-btn ms-action ms-large"
                            style="background-color: rgba(101,93,89,0.6);">
                            <img src='../assets/schedul.png'><br>Schedule</button>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
                <div class="row" style="margin-top: 6%;">
                    <div class="col">
                        <div class="content_code"
                            style="background-color: rgba(101,93,89,0.6); padding: 2%; border-radius: 10px; color: white; font-weight: bold;">
                            <h5 style="text-align: center;">Lele kamu seperti ini nih</h5>
                            <br>
                            <form style="text-align: center;">
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="ms-form-group">
                                            <label>Umur lele</label>
                                            <div class="ms-alert ms-small">
                                                <p style="color: black;" id="umur_p"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="ms-form-group">
                                            <label>Populasi lele</label>
                                            <div class="ms-alert ms-small">
                                                <p style="color: black;" id="populasi"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="ms-form-group">
                                            <label>Suhu kolam</label>
                                            <div class="ms-alert ms-small">
                                                <p style="color: black;" id="suhu"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="ms-form-group">
                                            <label>Frekuensi pemberian pakan</label>
                                            <div class="ms-alert ms-small">
                                                <p style="color: black;" id="penyebaran"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                            <div class="row" style="text-align: center;">
                                <h6>Data Pakan</h6>
                            </div>
                            <div class="row" style="display: flex;justify-content: center; align-items: center;">
                                <div class="col">
                                    <div class="ms-alert ms-small ms-fullwidth">
                                        <p id="data" style="color: black;"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="row" style="text-align: center;">
            <div class="col">
                <h3>Tahukah Kamu?</h3>
            </div>
        </div>
        <div class="row">

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { getDatabase, ref, get, child, update } from '@firebase/database';

const router = useRouter()
const db = getDatabase()

onBeforeMount(() => {
    if (sessionStorage.getItem('user') == null) {
        alert('Silahkan login terlebih dahulu')
        router.push('/LogSign')
    }
    const db = getDatabase()
    const dbref = ref(db)
    get(child(dbref, sessionStorage.getItem('uid'))).then(snap => {
        if (snap.exists()) {
            // alert(snap.val().umur)
            document.getElementById('umur').innerHTML = snap.val().umur + " Hari"
            document.getElementById('umur_p').innerHTML = "Umur lele kamu sekarang " + snap.val().umur + " Hari"
            document.getElementById('populasi').innerHTML = "Populasi lele kamu sekarang " + snap.val().populasi + "  Ekor"
            document.getElementById('suhu').innerHTML = "Suhu kolam kamu sekarang " + snap.val().suhu + " \xB0C"
            document.getElementById('penyebaran').innerHTML = "Lele diberi pakan " + snap.val().penyebaran + " kali / Hari"
            datapakan()
        }
    })
})
let inputpenyebaran = () => {
    let times = prompt("Berapa kali menyebar pakan sehari?")
    update(ref(getDatabase(), sessionStorage.getItem('uid') + "/"), {
        penyebaran: parseInt(times)
    }).then(() => {
        alert("Berhasil memasukkan intensitas pemberian pakan sehari")
    }).catch(err => {
        alert(err.message)
    })
}
let datapakan = () => {
    const dbref = ref(db)
    let uid = sessionStorage.getItem('uid')
    get(child(dbref, uid + "/pakan/")).then(snap => {
        if (snap.exists()) {
            let protein_data = snap.val().protein + " %"
            let karbohidrat_data = snap.val().karbohidrat + " %"
            let mineral_data = snap.val().mineral + " %"
            let lemak_data = snap.val().lemak + " %"
            let vitamin_data = snap.val().vitamin + " %"
            document.getElementById('data').innerHTML = "Protein: " + karbohidrat_data + "\n" + "Lemak: " + lemak_data + "\n" + "Mineral: " + mineral_data + "\n" + "Protein: " + protein_data + "\n" + "Vitamin: " + vitamin_data
        }
    })
}
let toControl = () => {
    router.push('/Control')
}
let toHome = () => {
    router.push('/Home')
}
let toUser = () => {
    router.push('/User')
}
</script>