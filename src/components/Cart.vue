<template>
  <table class="Cart">
    <tr>
      <td class="Navigation">
        <div v-for="(tab, key, index) in tabs" @click="select(key, index)" :key="index">{{index+1}} {{key}}</div>
      </td>
      <td>Ваша картина</td>
    </tr>
    <tr>
      <td>
        <flickity class="Carousel" ref="flickity" :options="flickityOptions">
          <div class="carousel-cell" v-for="(tab, key) in tabs" :key="key" >
            <h3>{{tab.title}}</h3>
            <p>{{tab.text}}</p>
            <p v-if="tab.additionalText">{{tab.additionalText}}</p>
            <div>
              Картинки
            </div>
          </div>
        </flickity>
      </td>
      <td></td>
    </tr>
    <tr>
      <td >Price: 0 грн</td>
      <td><button @click="next()">Custom Next Button</button></td>
    </tr>
  </table>
</template>


<script>
import Flickity from "vue-flickity";

export default {
  data() {
    return {
      currentTab: 'Изображение',
      tabs: {
        'Изображение': {
          title: 'Выберите изображение',
          text: 'Для начала выберите основу, саму картину, на которую вы и гости вашего праздника будете наносить отпечатки пальцев с пожеланиями'
        },
        'Рама': {
          title: 'Рама',
          text: 'Подберите раму, которая подойдет случаю и впишется в интерьер, ведь вы же не просто оставляете "пальчики", а создаете предмет декора для дома и офиса:'
        },
        'Заголовок': {
          title: 'Заголовок',
          text: 'персонализируйте ваше "Дерево пожеланий"; вверху и внизу картины есть специальные поля, которые можно заполнить по вашему усмотрению: вписать имена виновников торжества, или особые пожелания, добавить дату, или логотип компании, если речь идет о корпоративном подарке.'
        },
        'Цвет отпечатков': {
          title: 'Цвет отпечатков',
          text: 'наконец, подберите самые подходящие цвета красок, с помощью которых вы и оставите на картине свой след на память!',
          additionalText: 'Обратите внимание: более 2-х цветов увеличат стоимость'
        }
      },
       flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        draggable: false
      }

    }
     
    
  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    select(key, index) {
      this.currentTab = key
      this.$refs.flickity.select(index)
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
}

.Navigation {
  height: 60px;
  position: relative;
  font-size: 0;
  border-bottom: 1px solid rgb(126, 113, 101);
  div {
    padding-left: 20px;
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
    cursor: pointer;
    width: 25%;
    &:not(:first-child){
      border-left: 1px solid rgb(126, 113, 101);
    }
  }
}

.Carousel {
  width: 640px;
  height: 450px;
  position: relative;
}
.carousel-cell {
  padding: 10px;
  width: 100%;
  height: 100%; 

}
</style>


