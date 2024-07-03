<template>
  <div>
    <h1>{{ data.name }}</h1>
    <!-- <h1 class="intelligence"></h1> -->
    <h1 
      v-if="showIntelligence" 
      class="intelligence"
    >Интеллект: {{ data.intelligence }}</h1>
    <Image 
      alt="Изображение котика" 
      preview 
      v-if="showImage" 
      :src="imageSrc" 
      width="250"
      >
    </Image>
    <Button 
      label="Primary" 
      rounded 
      type="button" 
      @click="userData()"
    >Кликни сюда</Button>
  </div>
</template>

<script >
export default {
  data() {
    return {
      data: {name: 'Hello!', intelligence: null, id: 0},
      showIntelligence: false,
      showImage: false,
      imageSrc:""
    }
  },
  methods: {
    async userData() {
      const result = await fetch('https://api.thecatapi.com/v1/breeds', 
        {method: 'get', 
         headers:{'Content-Type':'application/json',
                  'x-api-key': 'live_wayzGc5nRdok2P1hwtepqCgOHLkuSHJHoQq6JMZYpeIyPQLUJTI4xCcXBDcKQCwm'}
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка запроса')
          }
          return response.json()
        })
        .then((info) => {
          return info.map((item) => ({name: item.name, intelligence: item.intelligence, id: item.reference_image_id}))
        }
        )
        .catch((error) => {
          console.log(error)
        })
        const selectedCat = result[Math.floor(Math.random() * result.length)]
        this.data = selectedCat
        this.showIntelligence = true
        this.showImage = true

        const imageID = selectedCat.id
        this.imageSrc = `https://cdn2.thecatapi.com/images/${imageID}.jpg`
        // console.log(imageID)  
  }
}
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
}

div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  color: pink
}

button {
  background-color: rgb(176, 113, 235);
  border: none;
  font-size: 26px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button:hover {
  background-color:rgb(88, 88, 240)
}

.image {
  width: 25px;
  margin-bottom: 20px;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 250px;
}

.p-image-preview-mask {
  width: 250px;
}
</style>
