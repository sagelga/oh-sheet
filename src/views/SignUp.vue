<template>
    <div class="signup">
        <el-row :gutter="10">

            <el-col :xs="1" :sm="1" :md="4" :lg="6" :xl="1">
                <div class="grid-content bg-purple"></div>
            </el-col>

            <el-col :xs="22" :sm="22" :md="16" :lg="12" :xl="11">
                <div class="grid-content bg-purple-light">
                    <div id="big-box">
                        <div id="reg-box">
                            <h1>ลงทะเบียน</h1>
                            <p align="left"><b>อีเมล</b></p>
                            <el-input id="email" placeholder="E-mail" v-model="input"></el-input>
                            <p align="left"><b>รหัสผ่าน</b></p>
                            <el-input id="password" placeholder="Password" v-model="input" type="password"></el-input>
                            <p align="left"><b>ชื่อที่ใช้แสดง</b></p>
                            <el-input id="displayname" placeholder="Display Name" v-model="input"></el-input>
                            <el-button id="register" type="info">สมัครสมาชิก</el-button>
                        </div>
                        <el-button class="long-button" type="info">Google</el-button>
                        <el-button class="long-button" type="info">Facebook</el-button>
                    </div>
                </div>
            </el-col>

            <el-col :xs="1" :sm="1" :md="4" :lg="6" :xl="1">
                <div class="grid-content bg-purple"></div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
export default {
  name: 'SignUp',
};
</script>

<style scoped>
    #big-box{
        padding-top: 30px;
        height: 500px;
        width: 500px;
    }
    #reg-box{
        width: 300px;
        padding: 20px;
        background-color: lightgrey;
        border-radius: 10%;
        position: relative;
        left: 80px;
    }
    #register{
        margin-top: 10px;
        position: relative;
        left: 90px;
    }
    .long-button{
        margin-top: 10px;
        width: 150px;
        background-color: lightgrey;
        border-color: lightgrey;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
