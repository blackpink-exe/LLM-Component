<template>
  <div class="sidebar">
    <div class="top">
      <div class="title">Claude</div>
      <div>
        <i class="iconfont" @click="closeSidebar">&#xe604;</i><!-- &#xe604; -->
      </div>
    </div>
    <div class="content">
      <div class="add" @click="newChat">
        <i class="iconfont">&#xe611;</i>
        <span>Start new chat</span>
      </div>
    </div>
    <div class="bottom">
      <div class="recents">
        <div class="title">Recents</div>
        <div class="list">
          <!-- Display a message when there are no recent chats -->
          <div v-if="store.chatArr.length === 0" class="no-chats">
            No chats yet. Start a new one!
          </div>
          <!-- 当 store.selectedChatIndex 等于当前 index 时，添加 active 类 -->
          <div
            v-for="(item, index) in store.chatArr"
            :key="index"
            class="item"            
            :class="{ active: store.selectedChatIndex === index }"
            @click="choose(index)"
          >
            <i class="iconfont">&#xe620;</i>
            <span>{{ item[0]?.content || "New Chat" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIsShowStore } from "@/store/index";
const store = useIsShowStore();
const emit = defineEmits(["closeSidebar"]);

const closeSidebar = () => {
  emit("closeSidebar", false);
};

const newChat = () => {
  if (store.messageArr.length === 0) return alert("这个人很懒，什么都没留下");
  store.addChatArr();
};

const choose = (index) => {
  store.chooseChat(index);
  store.selectedChatIndex = index;//补充
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  background-color: #2d2d2a;
  padding: 10px 30px;

  .top {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 22px;
      text-align: center;
    }
  }

  .content {
    margin-top: 20px;

    .add {
      display: flex;
      justify-content: center;
      //align-items: center;
      cursor: pointer;

      .iconfont {
        background-color: #23221e;
        font-size: 18px;
        margin-right: 10px;
        color: #9d5636;
      }

      span {
        color: #9d5636;
      }
    }
  }

  .bottom {
    .recents {
      margin-top: 20px;

      .title {
        font-size: 18px;
      }

      .list {
        margin-top: 10px;

        .item {
          display: flex;
          align-items: center;
          padding: 5px 0;
          /* 鼠标悬停时显示手型指针 */
          cursor: pointer;
          /* 背景颜色变化时添加0.3秒的过渡效果 */
          transition: background-color 0.3s ease;//ease 缓动函数来控制变化的速度，这种缓动函数会让变化开始和结束时速度较慢，中间速度较快，使动画更加自然。

          .iconfont {
            background-color: #23221e;
            font-size: 18px;
            margin-right: 5px;
          }

          &.active {
            background-color: #1a1915;
          }

          &:hover {
            background-color: #3e3d38;
          }
        }

        .no-chats {
          text-align: center;
          color: #9d5636;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
