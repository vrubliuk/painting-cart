<template>
  <div id="app">
    <Cart></Cart>
  </div>
</template>

<script>
import Cart from "./components/Cart";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Cart
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Firasans";
  src: url("./assets/fonts/FirasansRegular.ttf");
}

@font-face {
  font-family: "Ariston";
  src: url("./assets/fonts/Ariston.ttf");
}
@font-face {
  font-family: "DaVinci";
  src: url("./assets/fonts/DaVinci.ttf");
}
@font-face {
  font-family: "Brody";
  src: url("./assets/fonts/Brody.ttf");
}

* {
  box-sizing: border-box;
  outline: none;
  font-family: Firasans;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  padding: 100px;
}
</style>
