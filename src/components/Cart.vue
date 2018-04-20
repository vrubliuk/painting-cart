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
              || (key === 'fingerprints' && chosenFingerprints.indexOf(imageIndex) > -1),
              'Image-narrow': key === 'fingerprints'
              }" 
              v-for="(image, imageIndex) in tab.images" 
              :src="image" :key="image" @click="selectImage(key, imageIndex)">
            </div>
            <div class="Inputs" v-if="key === 'title'">
              <input class="Input" v-model="imageTitle" type="text" placeholder="Наша Свадьба" maxlength="25" ><span>Заголовок картины</span>
              <br>
              <input class="Input" v-model="imageSignature" type="text" placeholder="Анастасия и Константин" maxlength="25"><span>Подпись</span>
               <br>
              <input class="Input" v-model="imageDate" type="text" placeholder="29 июля 2015" maxlength="25"><span>Дата события</span>
              <h5>Шрифт</h5>
              <button class="FontButton" :class="{'FontButton-active': font === currentFont }" v-for="font in fonts" :key="font" @click="selectFont(font)">{{font}}</button>
            </div>

          </div>

          </div>
        </flickity>
      </td>
      <td class="Result">
        <div class="Result-details">
          <p>Изображение: <span>{{chosenPicture !== undefined ? `Картинка №${chosenPicture}` : 'Не выбрано'}}</span></p>
          <p>Рама: <span>{{chosenFrame !== undefined ? `Багетная №${chosenFrame}` : 'Не выбрано'}}</span></p>
          <p>Отпечатки: 
            <span v-if="!chosenFingerprints.length" >Не выбрано</span> 
            <span v-else><div class="Color-container" :style="{background: color}" v-for="color in chosenFingerprints" :key="color"></div></span>
          </p>
        </div>
        <div class="Result-image">
          <img class="Result-picture" :src="(tabs.picture.images[chosenPicture - 1])" alt="">
          <img class="Result-frame" :src="(tabs.frame.images[chosenFrame - 1])" alt="">
          <div class="Result-title" :style="{'font-family': currentFont}">{{currentTitle}}</div>
          <div class="Result-signature" :style="{'font-family': currentFont}">{{currentSignature}}</div>
          <div class="Result-date" :style="{'font-family': currentFont}">{{currentDate}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <td class="Price" @click="sendPaintingProps()"><span>Стоимость:</span><span> {{currentPrice}} </span><span>грн</span></td>
      <td class="Button-container"><button @click="next()">{{currentTab !== 'fingerprints' ? 'Далее' : 'В корзину'}}</button></td>
    </tr>
  </table>
</template>

<script>
import { pictures } from "./pictures";
import { frames } from "./frames";
import { fingerprints } from "./fingerprints";
import { pricelist } from "./pricelist";
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

      fonts: ["Ariston", "DaVinci", "Brody"],
      activeFont: "Ariston",
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
      "currentPrice",
      "currentTitle",
      "currentSignature",
      "currentDate",
      "currentFont"
    ]),
    imageTitle: {
      get() {
        return this.currentTitle;
      },
      set(value) {
        this.setTitle(value);
      }
    },
    imageSignature: {
      get() {
        return this.currentSignature;
      },
      set(value) {
        this.setSignature(value);
      }
    },
    imageDate: {
      get() {
        return this.currentDate;
      },
      set(value) {
        this.setDate(value);
      }
    }
  },
  watch: {
    chosenPicture() {
      this.reprice();
    },
    chosenFrame() {
      this.reprice();
    },
    chosenFingerprints() {
      this.reprice();
    },
    currentTitle() {
      this.reprice();
    },
    currentSignature() {
      this.reprice();
    },
    currentDate() {
      this.reprice();
    }
  },
  methods: {
    ...mapMutations([
      "setPicture",
      "setFrame",
      "setFingerprints",
      "setTitle",
      "setSignature",
      "setDate",
      "setFont",
      "setPrice"
    ]),
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
    },
    selectFont(font) {
      this.setFont(font);
    },
    reprice() {
      let price = 0;
      this.chosenPicture !== undefined && (price += pricelist.picture);
      this.chosenFrame !== undefined && (price += pricelist.frame);
      this.currentTitle !== "" && (price += pricelist.title);
      this.currentSignature !== "" && (price += pricelist.signature);
      this.currentDate !== "" && (price += pricelist.date);
      this.chosenFingerprints.length > 2 &&
        (price +=
          pricelist.fingerprints * (this.chosenFingerprints.length - 2));
      this.setPrice(price);
    },
    sendPaintingProps() {
      let paintingProps = {
        picture: this.chosenPicture,
        frame: this.chosenFrame,
        fingerprints: this.chosenFingerprints,
        title: this.currentTitle,
        signature: this.currentSignature,
        date: this.currentDate,
        font: this.currentFont
      }

      console.log(paintingProps)
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://redentu.com/", true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(paintingProps));
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
      h4 {
        margin: 15px 20px 5px;
      }
      p {
        margin: 5px 20px;
        &:nth-child(3) {
          font-weight: bold;
        }
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
        .Image-narrow {
          width: 130px;
        }
      }
      .Inputs {
        padding: 0px 20px;
        span {
          font-weight: bold;
        }
        .Input {
          border: 1px solid rgba(126, 113, 101, 0.2);
          font-weight: bold;
          font-size: 14px;
          color: rgb(126, 113, 101);
          height: 40px;
          width: 200px;
          border-radius: 15px;
          padding: 0 15px;
          margin: 0px 15px 15px 0;
        }
        ::placeholder {
          color: rgba(126, 113, 101, 0.5);
        }
        h5 {
          font-size: 14px;
          margin: 5px 0;
        }
        .FontButton {
          height: 40px;
          width: 80px;
          background: white;
          color: #8dbc55;
          border: 1px solid #8dbc55;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
          margin: 5px 10px 0 0;
        }
        .FontButton-active {
          background: #8dbc55;
          color: white;
          border: 1px solid #8dbc55;
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
  max-width: 296px;
  vertical-align: top;
  background: #e6e3e1;
  .Result-details {
    padding: 10px 20px;

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
    box-shadow: 0 0 0 1px rgba(126, 113, 101, 0.2);
    .Result-picture,
    .Result-frame {
      position: absolute;
      height: 300px;
      width: 240px;
    }
    .Result-title,
    .Result-signature,
    .Result-date {
      position: absolute;
      font-size: 16px;
      text-align: center;
      left: 0;
      right: 0;
    }

    .Result-title {
      top: 40px;
    }
    .Result-signature {
      bottom: 50px;
    }
    .Result-date {
      bottom: 30px;
    }
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