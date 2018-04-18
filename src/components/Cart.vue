<template>
  <table class="Cart">
    <tr>
      <td class="Navigation">
        <div :class="{'active-tab': key ===  currentTab}" v-for="(tab, key, index) in tabs" @click="select(key, index)" :key="index">{{index+1}} {{tab.name}}</div>
      </td>
      <td class="Title">Ваша картина</td>
    </tr>
    <tr>
      <td>
        <flickity class="Carousel" ref="flickity" :options="flickityOptions">
          <div class="carousel-cell" v-for="(tab, key) in tabs" :key="key" >
            <h4>{{tab.title}}</h4>
            <p>{{tab.text}}</p>
            <p v-if="tab.additionalText">{{tab.additionalText}}</p>
            <div class="Pictures-container">
              <img v-for="picture in tab.images" :src="(picture)" :key="picture" @click="selectImage()">
            </div>
          </div>
        </flickity>
      </td>
      <td class="Result">
        <p>Изображение: {{chosenImage}}</p>
        <p>Рама: {{chosenFrame}}</p>
        <p>Отпечатки: {{chosenFingerprints}}</p>
        <div class="Result__Image__Container">
          <div class="Result__Image"></div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="Price"><span>Стоимость:</span><span> {{currentPrice}} </span> <span>грн</span> </td>
      <td class="Button-container"><button @click="next()">Далее</button></td>
    </tr>
  </table>
</template>

<script>
import { pictures } from "./pictures"
import { frames } from "./frames"
import { fingerprints } from "./fingerprints"

import Flickity from "vue-flickity"
import { mapGetters } from "vuex"
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      currentTab: "picture",
      tabs: {
        picture: {
          name: "Изображение",
          title: "Выберите изображение",
          text:
            "Для начала выберите основу, саму картину, на которую вы и гости вашего праздника будете наносить отпечатки пальцев с пожеланиями",
          images: pictures
        },
        frame: {
          name: "Рама",
          title: "Рама",
          text:
            'Подберите раму, которая подойдет случаю и впишется в интерьер, ведь вы же не просто оставляете "пальчики", а создаете предмет декора для дома и офиса:',
          images: frames
        },
        title: {
          name: "Заголовок",
          title: "Заголовок",
          text:
            'персонализируйте ваше "Дерево пожеланий"; вверху и внизу картины есть специальные поля, которые можно заполнить по вашему усмотрению: вписать имена виновников торжества, или особые пожелания, добавить дату, или логотип компании, если речь идет о корпоративном подарке.',
          images: null
        },
        fingerprints: {
          name: "Цвет отпечатков",
          title: "Цвет отпечатков",
          text:
            "наконец, подберите самые подходящие цвета красок, с помощью которых вы и оставите на картине свой след на память!",
          additionalText:
            "Обратите внимание: более 2-х цветов увеличат стоимость",
          images: fingerprints
        }
      },
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        draggable: false
      }
    };
  },
  computed: {
    ...mapGetters([
      "chosenImage",
      "chosenFrame",
      "chosenFingerprints",
      "currentPrice"
    ])
  },
  methods: {
    ...mapMutations(["setImage", "setFrame", "setFingerprints"]),
    next() {
      let tabs = [];
      for (const key in this.tabs) {
        tabs.push(key);
      }
      if (tabs.indexOf(this.currentTab) < tabs.length - 1) {
        this.currentTab = tabs[tabs.indexOf(this.currentTab) + 1];
        this.$refs.flickity.next();
      }
    },
    select(key, index) {
      this.currentTab = key;
      this.$refs.flickity.select(index);
    }
  },

  components: {
    Flickity
  }
};
</script>

<style lang="scss" scoped>
::selection {
  color: #fff;
  background: #8dbc55;
}

.Cart {
  border: 1px solid rgba(126, 113, 101, 0.2);
  border-radius: 10px;
  border-collapse: separate;
  color: rgb(126, 113, 101);
  border-spacing: 0;

  // tr:first-child {
  //   border-top-left-radius: 10px;
  // }
}

.Navigation {
  border-bottom: 1px solid rgba(126, 113, 101, 0.2);
  border-top-left-radius: 8px;
  height: 60px;
  position: relative;
  font-size: 0;
  div {
    padding-left: 20px;
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
    cursor: pointer;
    width: 25%;
    &:not(:first-child) {
      border-left: 1px solid rgb(126, 113, 101);
    }
  }
  .active-tab {
    font-weight: bolder;
  }
}

.Carousel {
  width: 640px;
  height: 450px;
  position: relative;
  .carousel-cell {
    padding: 0 20px;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }
  .Pictures-container {
    img {
      display: block;
      float: left;
      margin: 10px;
      width: 180px;
      border-radius: 5px;
      border: 1px solid rgba(126, 113, 101, 0.2);
      &:hover {
        box-shadow: 0 0 4px rgba(126,113,101,0.2);
        cursor: pointer;
        outline: 4px solid #8dbc55;
      
      }

      .image-active {
        box-shadow: 0 0 4px #8dbc55;
      }
    }
  }
}

.Price {
  padding-right: 20px;
  font-size: 18px;
  height: 90px;
  border-top: 1px solid rgba(126, 113, 101, 0.2);
  border-bottom-left-radius: 8px;
  text-align: right;
  vertical-align: bottom;
  font-weight: bolder;
  span:nth-child(2) {
    color: #8dbc55;
    font-size: 48px;
    font-weight: bold;
  }
  span:last-child {
    font-weight: bold;
    color: #8dbc55;
  }
}

.Title {
  border-bottom: 1px solid rgba(126, 113, 101, 0.2);
  min-width: 296px;
  border-top-right-radius: 8px;
  background: #e6e3e1;
  padding: 20px;
  font-size: 18px;
  font-weight: bolder;
}

.Result {
  background: #e6e3e1;
  .Result__Image__Container {
    text-align: center;
    border: 1px solid red;
  }
  .Result__Image {
    position: relative;
    height: 300px;
    width: 240px;
    background-color: white;
    border: 1px solid rgba(126, 113, 101, 0.2);
  }
}

.Button-container {
  border-bottom-right-radius: 8px;
  text-align: center;
  background: #e6e3e1;
  button {
    background: #8dbc55;
    height: 50px;
    width: 250px;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>


