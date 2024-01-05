<template>
  <a-button @click="translate">平移</a-button>
  <a-button @click="zoom">放大</a-button>
  <a-button @click="reduce">缩小</a-button>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6';

const data = {
  //节点数据
  nodes: [
    {
      id: 'node1',
      x: 0,
      y: 0,
      width: 80,
      height: 40,
      label: 'hello'
    },
    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'world'
    }
  ],
  //边数据
  edges: [
    {
      source: 'node1',//开始
      target: 'node2'//结束
    }
  ]
};

let graph: Graph;
onMounted(() => {
  graph = new Graph({
    container: document.getElementById('container'),
    background: {
      color: '#fffbe6'
    },//背景
    width: 2000,
    height: 600,
    grid: {
      size: 10,//大小
      visible: true//是否可见
    }//网格
  });

  graph.fromJSON(data);
});

const translate = () => {
  graph.translate(80, 40);//平移
};

const reduce = () => {
  graph.zoom(-0.5);
};

const zoom = () => {
  graph.zoom(0.5);
};
</script>

<style scoped lang="less">

</style>
