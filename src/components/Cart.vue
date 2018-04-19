<template>
  <table class="Cart">
    <tr>
      <td class="Navigation">
        <div :class="{'active-tab': key ===  currentTab}" v-for="(tab, key, index) in tabs" @click="selectTab(key, index)" :key="index">{{index+1}} {{tab.name}}</div>
      </td>
      <td class="Title">Ваша картина</td>
    </tr>
    <tr>
      <td>
        <flickity class="Carousel" ref="flickity" :options="flickityOptions">
          <div class="carousel-cell" v-for="(tab, key) in tabs" :key="key" >
            <div class="carousel-cell-inner">
            <h4>{{tab.textTitle}}</h4>
            <p>{{tab.text}}</p>
            <p v-if="tab.additionalText">{{tab.additionalText}}</p>
            <div class="Images">
              <img class="Image" 
              :class="{'Image-active': (key === 'picture' && chosenPicture === (imageIndex + 1)) 
              || (key === 'frame' && chosenFrame === (imageIndex + 1)) 
              || (key === 'fingerprints' && chosenFingerprints.indexOf(imageIndex) > -1) 
              }" v-for="(image, imageIndex) in tab.images" 
              :src="image" :key="image" @click="selectImage(key, imageIndex)">
            </div>
          </div>

          </div>
        </flickity>
      </td>
      <td class="Result">
        <div class="Result-details">
          <p>Изображение: <span>{{chosenPicture !== undefined ? `Картинка №${chosenPicture}` : 'не выбрано'}}</span></p>
          <p>Рама: <span>{{chosenFrame !== undefined ? `Багетная №${chosenFrame}` : 'не выбрано'}}</span></p>
          <p>Отпечатки: 
            <span v-if="!chosenFingerprints.length" >не выбрано</span> 
            <span v-else><div class="Color-container" :style="{background: color}" v-for="color in chosenFingerprints" :key="color"></div></span>
          </p>
        </div>

        <div class="Result-image"></div>
      
      </td>
    </tr>
    <tr>
      <td class="Price"><span>Стоимость:</span><span> {{currentPrice}} </span> <span>грн</span> </td>
      <td class="Button-container"><button @click="next()">Далее</button></td>
    </tr>
  </table>
</template>

<script>
import { pictures } from "./pictures";
import { frames } from "./frames";
import { fingerprints } from "./fingerprints";

import Flickity from "vue-flickity";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      currentTab: "picture",
      tabs: {
        picture: {
          name: "Изображение",
          textTitle: "Выберите изображение",
          text:
            "Для начала выберите основу, саму картину, на которую вы и гости вашего праздника будете наносить отпечатки пальцев с пожеланиями",
          images: pictures
        },
        frame: {
          name: "Рама",
          textTitle: "Рама",
          text:
            'Подберите раму, которая подойдет случаю и впишется в интерьер, ведь вы же не просто оставляете "пальчики", а создаете предмет декора для дома и офиса:',
          images: frames
        },
        title: {
          name: "Заголовок",
          textTitle: "Заголовок",
          text:
            'персонализируйте ваше "Дерево пожеланий"; вверху и внизу картины есть специальные поля, которые можно заполнить по вашему усмотрению: вписать имена виновников торжества, или особые пожелания, добавить дату, или логотип компании, если речь идет о корпоративном подарке.',
          images: null
        },
        fingerprints: {
          name: "Цвет отпечатков",
          textTitle: "Цвет отпечатков",
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
      "chosenPicture",
      "chosenFrame",
      "chosenFingerprints",
      "currentPrice"
    ])
  },
  methods: {
    ...mapMutations(["setPicture", "setFrame", "setFingerprints"]),
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
    selectTab(key, index) {
      this.currentTab = key;
      this.$refs.flickity.select(index);
    },
    selectImage(tab, imageIndex) {
      if (tab === "picture") {
        this.setPicture(imageIndex + 1);
      } else if (tab === "frame") {
        this.setFrame(imageIndex + 1);
      } else if (tab === "fingerprints") {
        this.setFingerprints(imageIndex);
      }
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
    width: 100%;
    height: 100%;
    overflow: hidden;
    .carousel-cell-inner {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding-right: 17px;
      box-sizing: content-box;
    }
    h4,
    p {
      margin: 10px 20px;
    }
    .Images {
      overflow: auto;
      padding: 0 10px 10px 10px;
      .Image {
        padding: 15px;
        display: block;
        float: left;
        margin: 10px;
        width: 180px;
        border-radius: 8px;
        // border: 1px solid rgba(126, 113, 101, 0.2);
        box-shadow: 0 0 0 1px rgba(126, 113, 101, 0.2);
        &:hover {
          cursor: pointer;
          box-shadow: 0 0 8px 1px rgba(126, 113, 101, 0.2);
        }
      }
      .Image-active {
        border: none;
        box-shadow: 0 0 0 4px #8dbc55;
        &:hover {
          cursor: pointer;
          box-shadow: 0 0 0 4px #8dbc55;
        }
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
  // padding: 10px 20px;
  vertical-align: top;
  background: #e6e3e1;
  .Result-details {
    padding: 10px 20px;
    // padding: 20px;
    p {
      margin: 0;
      padding: 5px 0;
      span {
        font-weight: bold;
        .Color-container {
          display: inline-block;
          height: 20px;
          width: 20px;
          border-radius: 5px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
  }

  .Result-image {
    margin: auto;
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


