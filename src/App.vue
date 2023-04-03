<template>
  <div id="cityCanvas"></div>
</template>

<script setup>
import viewer from '@/cesiumModule/viewer'
import createCity from '@/cesiumModule/createCity'
import motifyMap from '@/cesiumModule/motifyMap'
import { onMounted } from 'vue'
import createCone from './cesiumModule/createCone'
import CreateWall from './cesiumModule/CreateWall'
import CreateAperture from './cesiumModule/CreateAperture'
import CreateRadar from './cesiumModule/CreateRadar'
import CreateConmet from './cesiumModule/CreateConmet'
import CreateTrak from './cesiumModule/CreateTrak'
import Nprogress from 'nprogress'
import {onBeforeMount} from 'vue'

onBeforeMount(() => {
  Nprogress.start()
})

onMounted(() => {
  const viewers = viewer()
  // 创建城市并修改颜色
  createCity(viewers)
  // 修改地图颜色
  motifyMap(viewers)
  // 创建光锥
  createCone(viewers)
  // 创建光墙
  new CreateWall(viewers)
  // 创建光圈
  new CreateAperture(viewers)
  // 创建雷达
  new CreateRadar(viewers)
  // 创建彗星
  new CreateConmet(viewers)
  // 创建轨迹路径
  new CreateTrak(viewers)
})
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#cityCanvas{
  width: 100vw;
  height: 100vh;
}
#nprogress{
  z-index: 666;
}
#nprogress .bar {
background: rgb(240, 244, 242) !important;
height: 0.5rem;
}
#nprogress .peg {
  box-shadow: 0 0 10px rgb(203, 11, 113), 0 0 5px rgb(203, 11, 113) !important;
}
</style>
