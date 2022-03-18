<template>
  <b-navbar toggleable="lg" variant="info">
    <b-navbar-brand href="/">Faryne 的實驗室</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="二次元">
          <b-dropdown-item href="https://nekomaid.web.app">難以名狀的抓圖器</b-dropdown-item>
          <b-dropdown-item href="http://ha2.tw/moe_imouto">二次元常用英文 TAG</b-dropdown-item>
          <b-dropdown-item href="/hololive">Hololive Schedules</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="方便工具">
          <b-nav-item href="/rates">匯率</b-nav-item>
          <b-nav-item href="/tw-stats">台灣指標</b-nav-item>
          <b-nav-item href="/telegraph">過往新聞</b-nav-item>
        </b-nav-item-dropdown>
        <b-nav-item href="https://blog.faryne.dev/">Faryne 的程式設計館</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
<!--  <nav class="navbar navbar-default">-->
<!--    <div class="container-fluid">-->
<!--      <div class="navbar-header">-->
<!--        <a href="/" class="navbar-brand"></a>-->
<!--      </div>-->
<!--      <div class="collapse navbar-collapse" id="menu-1">-->
<!--        <ul class="nav navbar-nav">-->
<!--          <li>-->
<!--            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">二次元 <span class="caret"></span></a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li><a href="https://nekomaid.web.app/">難以名狀的抓圖機</a></li>-->
<!--              <li><a href="http://ha2.tw/moe_imouto">二次元常用英文 TAG</a></li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">方便工具 <span class="caret"></span></a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li>-->
<!--                <a href="#">&#45;&#45;</a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">政府資料 <span class="caret"></span></a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li><a href="https://ha2.tw/energy">台電用電量、各能源發電量及敦親睦鄰等資料</a></li>-->
<!--              <li><a href="https://ha2.tw/ntpcfd">新北市政府消防局報案出勤紀錄</a></li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">無法歸類的玩具 <span class="caret"></span></a>-->
<!--            <ul class="dropdown-menu">-->
<!--              <li>-->
<!--                <a href="https://ha2.tw/ngc">NGC（？）</a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--          <li><a href="http://program.faryne.tw/">Faryne 的程式設計館</a></li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>