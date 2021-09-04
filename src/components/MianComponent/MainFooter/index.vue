<template>
  <div class="main-footer">
    <div class="copyright">
      <div class="container flex-column">
        <div class="mian-footer-content">
          <span>Copyright © 2021-2022</span>
          <a href="https://www.bugdr.cn" target="_blank">个人网站</a>
          <a href="https://github.com/dpy0912/neteasecloudmusic" target="_blank"
            >项目地址</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.main-footer {
  width: 100%;
  min-width: 100%;
  border-top: 1px solid @footer-border-top;
  background-color: @footer-background-color;
  .copyright {
    padding: 1.2rem 0;
    .container {
      padding: 0;
      color: chocolate;
      font-size: 1rem;
      .mian-footer-content {
        display: flex;
        align-items: center;
        a {
          color: #555657;
          margin-left: 5px;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          &:hover {
            color: @color-blank;
          }
        }
      }
    }
  }
}
</style>
