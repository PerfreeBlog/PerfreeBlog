<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-card">
        <div class="welcome-left">
          <div class="avatar-wrapper">
            <el-avatar :size="50" :src="userInfo.avatar" class="user-avatar" />
            <div class="avatar-ring"></div>
          </div>
          <div class="welcome-info">
            <div class="greeting">
              <span class="greeting-text">{{ getGreeting() }},</span>
              <span class="username">{{ userInfo.userName }}</span>
            </div>
            <div class="quote">
              <span class="quote-icon">"</span>
              工欲善其事，必先利其器
              <span class="quote-icon">"</span>
              <span class="quote-source">—— 论语</span>
            </div>
          </div>
        </div>
        <div class="welcome-right">
          <div class="weather-widget">
            <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tg&skin=pitaya" frameborder="0" width="470" height="60" allowtransparency="true"></iframe>
          </div>
          <div class="datetime-display">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <div class="stat-card" v-for="(stat, index) in statsConfig" :key="index">
        <div class="stat-icon" :style="{ background: stat.gradient }">
          <font-awesome-icon :icon="stat.icon" />
        </div>
        <div class="stat-info">
          <div class="stat-value">
            <CountUp :end="homeStatistic[stat.key] || 0" :duration="2" />
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-decoration" :style="{ background: stat.gradient }"></div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <div class="content-left">
        <!-- 最新文章 -->
        <div class="content-card articles-card">
          <div class="card-header">
            <div class="card-title">
              <font-awesome-icon icon="fa-solid fa-fire" class="title-icon" />
              最新文章
            </div>
            <el-button text @click="shortcutClick('/admin/article')">查看全部</el-button>
          </div>
          <div class="card-body">
            <div class="article-list" v-if="latestArticleList.length > 0">
              <a v-for="(article, index) in latestArticleList"
                 :key="index"
                 class="article-item"
                 :href="'/article/' + article.slug"
                 target="_blank">
                <span class="article-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="article-title">{{ article.title }}</span>
                <span class="article-date">{{ parseTime(article.createTime, '{m}-{d}') }}</span>
              </a>
            </div>
            <el-empty description="暂无文章" v-else />
          </div>
        </div>

        <!-- 最新评论 -->
        <div class="content-card comments-card">
          <div class="card-header">
            <div class="card-title">
              <font-awesome-icon icon="fa-solid fa-comments" class="title-icon" />
              最新评论
            </div>
          </div>
          <div class="card-body">
            <div class="comment-list" v-if="latestCommentList.length > 0">
              <div class="comment-item" v-for="(item, index) in latestCommentList" :key="index">
                <div class="comment-avatar">
                  <img :src="item.userInfo ? item.userInfo.avatar : item.avatar"
                       v-if="item.avatar || (item.userInfo && item.userInfo.avatar)" />
                  <span v-else class="avatar-text">{{ (item.userInfo ? item.userInfo.userName : item.userName)[0] }}</span>
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author">{{ item.userInfo ? item.userInfo.userName : item.userName }}</span>
                    <span class="comment-meta">
                      <template v-if="item.articleType === 'journal'">动态 #{{ item.articleId }}</template>
                      <template v-else>{{ item.articleTitle }}</template>
                    </span>
                  </div>
                  <div class="comment-text" v-html="item.content"></div>
                  <div class="comment-time">{{ displayTime(item.createTime) }}</div>
                </div>
              </div>
            </div>
            <el-empty description="暂无评论" v-else />
          </div>
        </div>
      </div>

      <div class="content-right">
        <!-- 快捷功能 -->
        <div class="content-card shortcuts-card">
          <div class="card-header">
            <div class="card-title">
              <font-awesome-icon icon="fa-solid fa-rocket" class="title-icon" />
              快捷功能
            </div>
          </div>
          <div class="card-body">
            <div class="shortcuts-grid">
              <div class="shortcut-item" v-for="(item, index) in shortcutsConfig" :key="index" @click="shortcutClick(item.path)">
                <div class="shortcut-icon" :style="{ background: item.gradient }">
                  <font-awesome-icon :icon="item.icon" />
                </div>
                <span class="shortcut-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 附件统计 -->
        <div class="content-card chart-card" v-loading="statisticLoading">
          <div class="card-header">
            <div class="card-title">
              <font-awesome-icon icon="fa-solid fa-chart-pie" class="title-icon" />
              附件统计
            </div>
          </div>
          <div class="card-body">
            <div id="attachEcharts" class="chart-container"></div>
          </div>
        </div>

        <!-- 相关文档 -->
        <div class="content-card links-card">
          <div class="card-header">
            <div class="card-title">
              <font-awesome-icon icon="fa-solid fa-book" class="title-icon" />
              相关文档
            </div>
          </div>
          <div class="card-body">
            <div class="links-list">
              <a v-for="(link, index) in linksConfig" :key="index" :href="link.url" target="_blank" class="link-item">
                <font-awesome-icon :icon="link.icon" class="link-icon" />
                <span>{{ link.name }}</span>
                <font-awesome-icon icon="fa-solid fa-arrow-right" class="link-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getHomeStatisticApi, getLatestArticleApi, getLatestCommentApi } from "../api/adminHome.js";
import { ElMessage } from "element-plus";
import { onMounted, ref, watch, onUnmounted, h, defineComponent, nextTick } from "vue";
import * as echarts from 'echarts';
import { displayTime, parseTime } from "@/core/utils/perfree.js";

// CountUp 组件
const CountUp = defineComponent({
  props: {
    end: { type: Number, default: 0 },
    duration: { type: Number, default: 2 }
  },
  setup(props) {
    const displayValue = ref(0);
    let animationFrame = null;

    const animate = (target) => {
      const startTime = performance.now();
      const startValue = displayValue.value;
      const change = target - startValue;

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (props.duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        displayValue.value = Math.round(startValue + change * easeOutQuart);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);
    };

    watch(() => props.end, (newVal) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animate(newVal);
    }, { immediate: true });

    onUnmounted(() => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    });

    return () => h('span', displayValue.value.toLocaleString());
  }
});

const statisticLoading = ref(true);
const homeStatistic = ref({});
const latestArticleList = ref([]);
const latestCommentList = ref([]);
const currentTime = ref('');
const currentDate = ref('');
let timeInterval = null;

const userInfo = ref(window.pinia.state._value?.userStore?.userInfo);
watch(() => window.pinia.state._value?.userStore?.userInfo, (val) => {
  userInfo.value = val;
});

// 统计卡片配置
const statsConfig = [
  { key: 'articleTotal', label: '文章数量', icon: 'fa-solid fa-file-alt', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { key: 'journalTotal', label: '动态数量', icon: 'fa-solid fa-golf-ball-tee', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { key: 'categoryTotal', label: '分类数量', icon: 'fa-solid fa-bars', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { key: 'tagTotal', label: '标签数量', icon: 'fa-solid fa-bookmark', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { key: 'commentTotal', label: '评论数量', icon: 'fa-solid fa-comment-alt', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { key: 'userTotal', label: '用户数量', icon: 'fa-solid fa-user', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
];

// 快捷功能配置
const shortcutsConfig = [
  { name: '写文章', icon: 'fa-solid fa-pencil-alt', path: '/admin/article/create', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '文章管理', icon: 'fa-solid fa-file-alt', path: '/admin/article', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: '动态管理', icon: 'fa-solid fa-golf-ball-tee', path: '/admin/journal', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: '分类管理', icon: 'fa-solid fa-bars', path: '/admin/category', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: '标签管理', icon: 'fa-solid fa-bookmark', path: '/admin/tag', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: '插件管理', icon: 'fa-solid fa-plug-circle-exclamation', path: '/admin/plugin', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
];

// 链接配置
const linksConfig = [
  { name: 'PerfreeBlog 官网', url: 'https://www.perfree.org.cn', icon: 'fa-solid fa-home' },
  { name: '主题仓库', url: 'https://www.perfree.org.cn/theme', icon: 'fa-solid fa-palette' },
  { name: '插件仓库', url: 'https://www.perfree.org.cn/plugin', icon: 'fa-solid fa-puzzle-piece' },
  { name: '使用文档', url: 'https://docs.perfree.org.cn/useDocs/', icon: 'fa-solid fa-book-open' },
  { name: '主题开发', url: 'https://docs.perfree.org.cn/themeDevDocs/', icon: 'fa-solid fa-code' },
  { name: '插件开发', url: 'https://docs.perfree.org.cn/pluginDevDocs/', icon: 'fa-solid fa-plug' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return '夜深了';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  if (hour < 22) return '晚上好';
  return '夜深了';
}

function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  currentDate.value = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
}

function getHomeStatistic() {
  statisticLoading.value = true;
  getHomeStatisticApi().then(res => {
    if (res.code === 200) {
      homeStatistic.value = res.data;
      nextTick(() => {
        initChart();
      });
    } else {
      ElMessage.error(res.msg);
    }
    statisticLoading.value = false;
  }).catch(() => {
    statisticLoading.value = false;
  });
}

function initChart() {
  const chartDom = document.getElementById('attachEcharts');
  if (!chartDom) return;

  const myChart = echarts.init(chartDom);
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: { color: '#333' }
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: 'var(--el-text-color-regular)' }
    },
    series: [{
      name: '附件统计',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '40%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: 'var(--el-bg-color)',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' },
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      },
      labelLine: { show: false },
      data: [
        { value: homeStatistic.value.attachImageTotal, name: '图片', itemStyle: { color: '#667eea' } },
        { value: homeStatistic.value.attachVideoTotal, name: '视频', itemStyle: { color: '#f5576c' } },
        { value: homeStatistic.value.attachAudioTotal, name: '音频', itemStyle: { color: '#43e97b' } },
        { value: homeStatistic.value.attachOtherTotal, name: '其他', itemStyle: { color: '#fa709a' } },
      ],
    }]
  });

  window.addEventListener('resize', () => myChart.resize());
}

function shortcutClick(path) {
  router.replace(path);
}

function getLatestArticle() {
  getLatestArticleApi(15).then(res => {
    latestArticleList.value = res.data;
  });
}

function getLatestComment() {
  getLatestCommentApi(6).then(res => {
    latestCommentList.value = res.data;
  });
}

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
  getHomeStatistic();
  getLatestArticle();
  getLatestComment();
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style scoped>
.home-container {
  min-height: 100%;
  background: var(--el-bg-color-page);
  box-sizing: border-box;
}

/* 欢迎区域 */
.welcome-section {
  margin-bottom: 13px;
}

.welcome-card {
  background: linear-gradient(135deg, var(--el-color-primary) 0%, var(--el-color-success) 100%);
  border-radius: 12px;
  padding: 30px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 60%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: rotate(30deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
}

.welcome-left {
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1;
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  border: 3px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.avatar-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.welcome-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.greeting {
  font-size: 18px;
  font-weight: 600;
}

.username {
  background: rgba(255,255,255,0.2);
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 6px;
}

.quote {
  font-size: 13px;
  opacity: 0.9;
}

.quote-icon {
  font-size: 16px;
  font-family: serif;
  vertical-align: text-top;
}

.quote-source {
  margin-left: 8px;
  font-size: 11px;
  opacity: 0.7;
}

.welcome-right {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.weather-widget {
  border-radius: 8px;
  overflow: hidden;
}

.weather-widget iframe {
  display: block;
}

.datetime-display {
  text-align: right;
}

.time {
  font-size: 24px;
  font-weight: 300;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 2px;
}

.date {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
}

/* 统计卡片 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 13px;
}

.stat-card {
  background: var(--el-bg-color);
  border-radius: 10px;
  padding: 30px 16px;
  display: flex;
  align-items: center;
  gap: 13px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
}

.stat-info {
  z-index: 1;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 2px;
}

.stat-decoration {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.1;
}

/* 主内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 13px;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.content-right {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

/* 通用卡片样式 */
.content-card {
  background: var(--el-bg-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: var(--el-color-primary);
}

.card-body {
  padding: 20px;
}

/* 文章卡片固定高度 */
.articles-card .card-body {
  height: 400px;
  overflow-y: auto;
}

/* 评论卡片固定高度 */
.comments-card .card-body {
  height: 400px;
  overflow-y: auto;
}

/* 文章列表 */
.article-list {
  display: flex;
  flex-direction: column;
}

.article-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px dashed var(--el-border-color-lighter);
  text-decoration: none;
  color: var(--el-text-color-primary);
  transition: all 0.2s ease;
}

.article-item:last-child {
  border-bottom: none;
}

.article-item:hover {
  color: var(--el-color-primary);
}

.article-item:hover .article-index {
  background: var(--el-color-primary);
  color: #fff;
}

.article-index {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--el-fill-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.article-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

.article-date {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-left: 15px;
  flex-shrink: 0;
}

/* 评论列表 */
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.comment-author {
  font-weight: 600;
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.comment-meta {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comment-text {
  font-size: 14px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  padding: 10px 14px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  word-break: break-all;
}

.comment-time {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  margin-top: 6px;
}

/* 快捷功能 */
.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.shortcut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shortcut-item:hover {
  background: var(--el-fill-color-lighter);
}

.shortcut-item:hover .shortcut-icon {
  transform: scale(1.1);
}

.shortcut-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.shortcut-name {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

/* 图表 */
.chart-container {
  height: 200px;
}

/* 链接列表 */
.links-list {
  display: flex;
  flex-direction: column;
}

.link-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  color: var(--el-text-color-regular);
  border-bottom: 1px solid var(--el-border-color-lighter);
  transition: all 0.2s ease;
}

.link-item:last-child {
  border-bottom: none;
}

.link-item:hover {
  color: var(--el-color-primary);
}

.link-item:hover .link-arrow {
  transform: translateX(3px);
  opacity: 1;
}

.link-icon {
  width: 20px;
  margin-right: 10px;
  color: var(--el-color-primary);
}

.link-item span {
  flex: 1;
  font-size: 14px;
}

.link-arrow {
  opacity: 0;
  transition: all 0.2s ease;
  font-size: 12px;
}

/* 响应式 */
@media screen and (max-width: 1400px) {
  .stats-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .content-right {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .links-card {
    grid-column: span 2;
  }

  .weather-widget {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .home-container {
    padding: 15px;
  }

  .welcome-card {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .welcome-right {
    width: 100%;
    align-items: center;
  }

  .weather-widget {
    display: none;
  }

  .datetime-display {
    text-align: center;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-right {
    grid-template-columns: 1fr;
  }

  .links-card {
    grid-column: span 1;
  }

  .greeting {
    font-size: 16px;
  }

  .time {
    font-size: 20px;
  }

  .articles-card .card-body,
  .comments-card .card-body {
    height: auto;
    max-height: 400px;
  }
}

@media screen and (max-width: 480px) {
  .stats-section {
    grid-template-columns: 1fr;
  }

  .shortcuts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
