<template>
  <div class="container">
    <div
      class="left-content animate__animated animate__fadeInLeft"
      v-if="isSidebarOpen"
    >
      <Sidebar @closeSidebar="closeSidebar"></Sidebar>
    </div>
    <div class="open-sidebar animate__animated animate__fadeInRight" v-else>
      <i class="iconfont" @click="openSidebar"> &#xe6a4;</i>
    </div>
    <div class="right-content">
      <div class="top">
        <div class="title" >
          <i class="iconfont" @click="openDiglog">&#xe626;</i> Introducing Claude,AI Assistant<i
            @click="openDiglog"
            class="iconfont"
            >&#xe64c;
          </i>
        </div>
      </div>
      <div class="content" ref="contain">
        <!-- 用户 -->
        <div v-for="(item, index) in messageArr" :key="index">
          <div class="left" v-if="item.role === 'user'">
            <div class="user">
              <div class="avatar">
                <img src="@/assets/user.png" alt="User Avatar" />
              </div>
              <div class="text">{{ item.content }}</div>
            </div>
          </div>
          <!-- AI -->
          <div class="right" v-else>
            <div class="Ai">
              <div class="text" v-html="renderMarkdown(item.content)"></div>
              <div class="avatar">
                <img src="@/assets/chatgpt.jpg" alt="AI Avatar" />
              </div>
            </div>
            
            <div class="tools">
              <div class="copy" @click="copyMessage(item.content)">
                <i class="iconfont">&#xe706;</i>
                <span>Copy</span>
              </div>
              <div class="retry">
                <i class="iconfont">&#xe774;</i>
                <span>Retry</span>
              </div>
              <div class="like">
                <i class="iconfont">&#xec7f;</i>
              </div>
              <div class="dislike">
                <i class="iconfont">&#xe62d;</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <RichTextEditor />
      </div>
      <!-- 内联对话 -->
      <div class="diglog" v-show="isDiglogOpen">
        <InlineDiglog
          class="animate__animated animate__zoomIn"
          @close="closeDiglog"
        ></InlineDiglog>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import RichTextEditor from "./components/RichTextEditor.vue";
import Sidebar from "./components/Sidebar.vue";
import InlineDiglog from "./components/InlineDialog.vue";
import { useIsShowStore } from "@/store/index";
import { marked } from "marked"; // 引入 marked 库
const store = useIsShowStore();
const messageArr = computed(() => store.messageArr);

const contain = ref(null);
const isSidebarOpen = ref(true);
const isDiglogOpen = ref(false);

// 复制消息内容
const copyMessage = (message) => {
  const tempDiv = document.createElement("div");//使用 document.createElement("div") 创建一个临时的 div 元素。
  tempDiv.innerHTML = message; // 如果 message 包含 HTML，则解析 HTML
  const plainText = tempDiv.innerText || tempDiv.textContent; // 获取纯文本内容

  navigator.clipboard
    .writeText(plainText) // 使用 Clipboard API 复制内容
    .then(() => {
      alert("复制成功!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("复制失败，请重试");
    });
};
// 将 Markdown 转换为 HTML
const renderMarkdown = (content) => {
  return marked.parse(content); // 使用 marked 库将 Markdown 转换为 HTML
};

// 关闭侧边栏
const closeSidebar = (value) => {
  console.log("关闭侧边栏", value);
  // 在这里实现关闭侧边栏的逻辑
  isSidebarOpen.value = value;
};
// 打开侧边栏
const openSidebar = () => {
  console.log("打开侧边栏");
  // 在这里实现打开侧边栏的逻辑
  isSidebarOpen.value = true;
};
// 关闭内联对话框
const closeDiglog = (v) => {
  console.log("关闭内联对话框", v);
  // 在这里实现关闭内联对话框的逻辑
  isDiglogOpen.value = v;
};
// 打开内联对话框
const openDiglog = () => {
  console.log("打开内联对话框");
  // 在这里实现打开内联对话框的逻辑
  isDiglogOpen.value = true;
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100%;
  background-color: #2d2d2a;
  .left-content {
    width: 280px;
    background-color: #23221e;
  }
  .open-sidebar {
    font-size: 22px;
    padding: 5px 0;
  }
  .right-content {
    flex: 1;
    position: relative;
    padding: 10px 150px;
    .diglog {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .top {
    .title {
      font-size: 22px;
      text-align: center;
    }
  }
  .content {
    margin-top: 30px;
    width: 100%;
    height: 520px;
    overflow: auto;
    .left,
    .right {
      border-radius: 10px; /* 添加边框圆角 */
      padding: 10px;
      margin-bottom: 25px;
    }
    // 用户
    .left {
      background-color: #22211e; //white;
      .user {
        display: flex;
        align-items: center;
        background-color: #22211e;//pink;
        .avatar {
          background-color: #22211e;
          padding: 10px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #22211e !important;
          }
        }
        .text {
          background-color: #22211e;
          padding: 10px;
          line-height: 25px;
        }
      }
    }
    // AI
    .right {
      background-color: #30302d;
      position: relative;
      .Ai {
        display: flex;
        align-items: center;
        background-color: #30302d;
        justify-content: space-between;
        .avatar {
          padding: 10px;
          background-color: #30302d;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .text {
          background-color: #30302d;
          padding: 10px;
          line-height: 25px;
        }
      }
      .tools {
        position: absolute;
        right: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 15px;
        background-color: #30302d;
        height: 30px;
        border-radius: 10px;
        width: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        div {
          background-color: #30302d;
          cursor: pointer;
          span {
            background-color: #30302d;
          }
        }
      }
    }
  }
}
</style>
