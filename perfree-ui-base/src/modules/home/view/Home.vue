<template>
  <el-row :gutter="15" style="height: 100%;">
    <el-col :span="24">
      <div class="panelBox">
        <div style="display: flex;flex-wrap: wrap;">
          <el-avatar :size="65" :src="userInfo.avatar" />
          <div class="loginBoxRight">
            <div class="title">欢迎登录, {{userInfo.userName}}</div>
            <div class="welcome">工欲善其事，必先利其器。 -- 论语</div>
          </div>
          <div style="margin-left: auto" class="weather-widget">
            <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tg&skin=pitaya" frameborder="0" width="470" height="60" allowtransparency="true"></iframe>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="20" :xl="20">
      <el-row :gutter="15">
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox"  v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.articleTotal">
              <template #title>
                <span><el-icon><UserFilled /></el-icon> 文章数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.journalTotal">
              <template #title>
                <span><el-icon><Checked /></el-icon> 动态数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.categoryTotal">
              <template #title>
                <span><el-icon><Checked /></el-icon> 分类数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.tagTotal">
              <template #title>
                <span><el-icon><Checked /></el-icon> 标签数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.commentTotal">
              <template #title>
                <span><el-icon><PictureFilled /></el-icon> 评论数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="4">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.userTotal">
              <template #title>
                <span><el-icon><List /></el-icon> 用户数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="panelBox">
                <div class="panelTitle">最新文章</div>
                <div style="text-align: center;margin-top: 10px;min-height: 500px">
                  <el-link v-for="article in latestArticleList" class="latest-article" :href="'/article/' + article.slug" target="_blank">
                    <el-icon><Calendar /></el-icon>&nbsp{{parseTime(article.createTime, '{y}-{m}-{d}')}} | {{article.title}}
                  </el-link>
                  <el-empty description="暂无文章" v-if="latestArticleList.length <= 0"/>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="panelBox">
                <div class="panelTitle">最新评论</div>
                <div style="margin-top: 10px;min-height: 500px">
                  <div class='comment-detail-box' v-for="item in latestCommentList">
                    <div class='comment-detail-avatar-box'>
                      <img :src='item.userInfo ? item.userInfo.avatar : item.avatar' width='35px' height="35px" v-if="item.avatar || (item.userInfo &&  item.userInfo.avatar)">
                      <span v-else>{{item.userInfo ? item.userInfo.userName[0] : item.userName[0]}}</span>
                    </div>
                    <div class='comment-detail-msg-box'>
                      <div class='comment-detail-info'>
                        <span class='comment-detail-name'>{{ item.userInfo ? item.userInfo.userName : item.userName }}</span>
                        <span class='comment-detail-time'>
                          <span v-if="item.articleType === 'journal'">发表于动态标识为《{{item.articleId}}》</span>
                          <span v-if="item.articleType === 'article'">发表于《{{item.articleTitle}}》</span>
                          <span v-if="item.articleType === 'page'">发表于《{{item.articleTitle}}》</span>
                          {{ displayTime(item.createTime) }}
                        </span>
                      </div>
                      <div class='comment-detail-content'>{{ item.content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="panelBox">
            <div class="panelTitle">快捷功能</div>
            <el-row>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/article/create')"><font-awesome-icon icon="fa-solid fa-pencil-alt"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">写文章</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/article')"><font-awesome-icon icon="fa-solid fa-file-alt"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">文章管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/journal')"><font-awesome-icon icon="fa-solid fa-golf-ball-tee"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">动态管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/category')"><font-awesome-icon icon="fa-solid fa-bars"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">分类管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/tag')"><font-awesome-icon icon="fa-solid fa-bookmark"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">标签管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/plugin')"><font-awesome-icon icon="fa-solid fa-plug-circle-exclamation"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">插件管理</div>
              </el-col>

            </el-row>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="panelBox" v-loading="statisticLoading">
            <div class="panelTitle">附件统计</div>
            <div  class="echartsBox" id="attachEcharts" style="height:130px;"></div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="panelBox">
            <div class="panelTitle">相关文档</div>
            <ul class="link-ul">
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn" target="_blank">PerfreeBlog 官网</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn/theme" target="_blank">PerfreeBlog 主题仓库</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn/plugin" target="_blank">PerfreeBlog 插件仓库</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn/useDoc" target="_blank">PerfreeBlog 使用文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn/themeDevDoc" target="_blank">PerfreeBlog 主题开发文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://www.perfree.org.cn/pluginDevDoc" target="_blank">PerfreeBlog 插件开发文档</el-link>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Checked, Link, List, PictureFilled, UserFilled} from "@element-plus/icons-vue";
import {getHomeStatisticApi, getLatestArticleApi, getLatestCommentApi} from "../api/adminHome.js";
import {ElMessage} from "element-plus";
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {displayTime, parseTime} from "@/core/utils/perfree.js";

let statisticLoading = ref(true);
let articleLoading = ref(true);
let commentLoading = ref(true);
let homeStatistic = ref({});
let latestArticleList = ref([]);
let latestCommentList = ref([]);
const userInfo = ref(window.pinia.state._value?.userStore?.userInfo)
watch(() => window.pinia.state._value?.userStore?.userInfo, (val) => {
  userInfo.value = val;
})

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary').trim();

const colors = [
  { color: primaryColor, percentage: 70 },
  { color: '#e6a23c', percentage: 90 },
  { color: '#f56c6c', percentage: 100 },
]

function getHomeStatistic() {
  statisticLoading.value = true;
  getHomeStatisticApi().then(res => {
    if (res.code === 200) {
      homeStatistic.value = res.data;
      let myChart = echarts.init(document.getElementById('attachEcharts'));
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '附件统计',
            type: 'pie',
            radius: '50%',
            data: [
              { value: homeStatistic.value.attachImageTotal, name: '图片' },
              { value: homeStatistic.value.attachVideoTotal, name: '视频' },
              { value: homeStatistic.value.attachAudioTotal, name: '音频' },
              { value: homeStatistic.value.attachOtherTotal, name: '其他' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    } else {
      ElMessage.error(res.msg);
    }
    statisticLoading.value = false;
  })
}

function shortcutClick(path) {
  router.replace(path);
}

onMounted(() => {
  getHomeStatistic();
})

function getLatestArticle() {
  articleLoading.value = true;
  getLatestArticleApi(15).then(res => {
    latestArticleList.value = res.data;
    articleLoading.value = false;
  });
}

function getLatestComment() {
  commentLoading.value = true;
  getLatestCommentApi(6).then(res => {
    latestCommentList.value = res.data;
    commentLoading.value = false;
  })
}
getLatestArticle();
getLatestComment();
</script>
<style scoped>
.panelBox{
  background: var(--el-bg-color);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: calc(100% - 30px);
}
.shortcuts-item{
  text-align: center;
  margin-top: 15px;
}
.shortcuts-item-name{
  font-size: 14px;
  margin-top: 5px;
}
.loginBoxRight{
  padding-left: 10px;
  .title{
    padding-top: 5px;
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  .welcome{
    padding-top: 5px;
  }
}
:deep(.my-label){
  background: var(--el-bg-color) !important;
}
.panelTitle{
  font-size: 14px;
  border-bottom: 1px solid var(--el-border-color-light);
  padding-bottom: 10px;
}
.link-ul{
  list-style: none;
  padding: 0;
  margin: 0;
  li{
    line-height: 30px;
    .el-link{
      width: 100%;
      justify-content: left;
    }
  }
}
:deep(.el-link__inner){
  padding-left: 5px;
}
.latest-article{
  display: block;
  text-align: left;
  width: 100%;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.comment-detail-box{
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  width: 100%;
}
.comment-detail-avatar-box img{
  border-radius: 50%;
}
.comment-detail-avatar-box span{
  display: inline-block;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: var(--el-bg-color-page);
  text-align: center;
  font-weight: 600;
  color: var(--el-text-color-regular);
}
.comment-detail-msg-box{
  width: calc(100% - 45px);
  padding-left: 10px;
}
.comment-detail-content{
  margin-top: 5px;
  width: calc(100% - 24px);
  padding: 8px 12px;
  border-radius: 5px;
  margin-bottom: 5px;
  word-break: break-all;
  line-height: 24px;
  background: var(--el-bg-color-page);
  font-size: 14px;
  opacity: .85;
}
.comment-detail-name{
  font-weight: 500;
  font-size: 14px;
}
.comment-detail-info{
  position: relative;
}
.comment-detail-time{
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-left: 10px;
}
@media screen and (max-width:700px) {
  .weather-widget{
    display: none;
  }
}

</style>
