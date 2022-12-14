<template>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-4">
                <img src="../assets/Logo.png" style="width:110%" />
            </div>
            <div class="col-1"></div>
            <div class="col-4" style="background-color: rgba(101,93,89,0.3); padding: 2%; border-radius: 20%;">
                <div class="wrapper">
                    <div class="top">
                        <img src="../assets/PakLe.png" style="width:50%" />
                        <h5>Sumber Kehidupan Lele</h5>
                    </div>
                    <div class="mid">
                        <h6>Membantu para pembudidaya lele untuk mencapai keuntungan</h6>
                    </div>
                    <div class="low">
                        <button class="ms-btn ms-large ms-action2 ms-rounded" style="background-color: rgb(101,93,89);">
                            <router-link to="/LogSign" style="color: white;">Get Started</router-link>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
let router = useRouter()
let toLanding = () => {
    router.push('/')
}
</script>

<style>
.wrapper .top,
.mid,
.low {
    display: grid;
    place-items: center;
}

.mid {
    margin: 20%;
    text-align: center;
}
</style>