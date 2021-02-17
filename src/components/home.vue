<template>
  <el-container>
    <el-aside>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
	  
        <el-submenu index="1" show-timeout="0">
			<template #title>
      <i class="el-icon-location"></i>
      <span>用户管理</span>
    </template>
          <el-menu-item-group>
            <template #title></template>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            <el-menu-item index="1-2">用户权限</el-menu-item>
          </el-menu-item-group>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="HanderCls">
        <div :class="[{ switchClsClose: isClose }, { switchClsOpen: isOpen }]">
          <i class="el-icon-menu" @click="clikSwtichIcon"></i>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :src="userLinkPath.userAvatar"></el-avatar
          ></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                uid:{{ userLinkPath.userId }}&ensp; useName:{{
                  userLinkPath.userName
                }}
                &ensp; userRole:{{ userLinkPath.userRole }}
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-guide" divided @click="userOut"
                >&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;用户注销</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="mainCls"
        ><h1>{{ isOpen }}</h1>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { ElMessage } from "element-plus";
import { HttpService } from "../api/http";
interface userInfo {
  userId: number;
  path: string;
  userName: string;
  userRole: string;
  userAvatar: string;
}
export default class Home extends Vue {
  $refs!: {
    [key: string]: HTMLFormControlsCollection;
  };
  $httpService = new HttpService();
  userLinkPath: userInfo = {
    userId: 0,
    path: "",
    userRole: "test",
    userName: "test",
    userAvatar: "../src/assets/images/avatar.jpeg",
  };
  isCollapse: boolean = false;
  isOpen: boolean = true;
  isClose: boolean = false;
  /**
   * userOut
   */
  public userOut() {
    alert("用户退出");
  }
  /**
   * GetUserInfo
   */
  public GetUserInfo() {
    const userName: string | null = sessionStorage.getItem("userName");
    this.$httpService.getData({}, "/user/info/" + userName).then(
      (res: any) => {
        if (res.code === 200) {
          this.userLinkPath = res.data;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public handleOpen(key: any, keyPath: any): void {
    console.log(key, keyPath);
  }
  /**
   * handleClose
   */
  public handleClose(key: any, keyPath: any): void {
    console.log(key, keyPath);
  }
  public clikSwtichIcon() {
    this.isCollapse = !this.isCollapse;
    this.isOpen = !this.isOpen;
    this.isClose = !this.isClose;
  }
  created() {
    const token = sessionStorage.getItem("token");
    if (token != null) {
      ElMessage({
        showClose: true,
        message: "登录成功",
        type: "success",
        offset: 300,
        center: true,
        iconClass: "el-icon-success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: "用户没有登录,请先登录",
        type: "error",
        offset: 300,
        center: true,
        iconClass: "el-icon-success",
      });

      this.$router.push({ name: "login" });
    }

    this.GetUserInfo();
  }

  //   updated() {
  //     if (this.isCollapse) {
  //       this.autoNum = "0px";
  //     } else {
  //       this.autoNum = "300px";
  //     }
  //   }
}
</script>
<style lang="scss">
.HanderCls {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: -300px;
  .el-dropdown {
    width: 150px;
    position: absolute;
    top: 10px;
    left: 84%;
    color: #dcdfe6;
    font-size: 30px;
  }
  .switchClsOpen {
    height: 60px;
    i {
      line-height: 60px;
      margin-left: -820px;
    }
  }
  .switchClsClose {
    height: 60px;
    i {
      line-height: 60px;
      margin-left: -1290px;
    }
  }
  .switchClsOpen:hover {
    color: skyblue;
  }
  .switchClsClose:hover {
    color: skyblue;
  }
}
</style>
