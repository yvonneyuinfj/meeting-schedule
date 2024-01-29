<template>
  <div class="container">
    <div class="portlet">
      <iframe
        id="calendarPortlet"
        name="calendarPortlet"
        width="100%"
        height="380"
        src="avic/myportal/event/calendarPortlet"
        scrolling="no"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.container{
  width: 100%;
  height:800px;
}
.portlet {
  margin: 10px;
  padding: 5px 8px;
  width:33%;
  max-width: 380px;
  height: 392px;
  background-color: #fff;
  border:#E9E9E9 1px solid;
  border-radius: 4px;
  box-shadow: 7px 7px 7px #f0f0f0;
  iframe {
    border: none;
    overflow: hidden;
  }
}
</style>
