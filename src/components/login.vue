<template>
  <div class="bgCls">
    <img :src="bgStr" alt="bg" />
  </div>
  <div class="logoCls">
    <img :src="formLogoStr" alt="fromlogo" />
    <h3>zhangyue resources Administration system</h3>
  </div>
  <div class="avatarCls">
    <img :src="avatarImgStr" alt="" srcset="" />
  </div>
  <div class="showLogin">
    <div class="loginBox">
      <el-form
        :model="user"
        :rules="rules"
        ref="userRef"
        label-width="100px"
        label-color=""
        class="formCls"
        hide-required-asterisk="true"
      >
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="user.userName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密 码:" prop="userPwd">
          <el-input
            v-model="user.userPwd"
            prefix-icon="el-icon-key"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain @click="loginFromSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";
import { HttpService } from "../api/http";
Options({});
export default class Login extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement;
  };
  $httpService = new HttpService();
  bgStr: string = "../src/assets/images/bg.jpg";
  formLogoStr: string = "../src/assets/images/loginlog.png";
  avatarImgStr: string = "../src/assets/images/avatar.jpeg";
  protected user = {
    userName: "",
    userPwd: "",
  };
  protected rules = {
    userName: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
    ],
    userPwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 5, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
    ],
  };

  /**
   * loginFromSubmit
   */
  loginFromSubmit() {
    this.$refs["userRef"].validate(async (valid: boolean) => {
      if (valid) {
        const pwd = Base64.encode(this.user.userPwd);
        this.user.userPwd = pwd;
        this.$httpService.postData(this.user, "/login").then(
          (result: any) => {
            console.log(result);
            if (result.code == 200) {
              sessionStorage.setItem("userName", this.user.userName);
              this.$router.push({ name: "home" });
            }
          },
          (error: any) => {
            console.log("err", error);
            ElMessage({
              showClose: true,
              message: "登录失败,账号密码不匹配",
              type: "error",
              center: true,
              iconClass: "el-icon-error",
            });
          }
        );
      } else {
        console.log("err");
        this.$refs["userRef"].resetFields();
      }
    });
  }
}
</script>
<style lang="scss">
@import "../src/assets/css/loginstyle.scss";
</style>
