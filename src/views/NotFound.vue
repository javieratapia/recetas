<template>
    <div class="mt-5 ">
        <div>
            <b-jumbotron class="jumbo" header="¡No encontramos esta página!" lead="Quizás aún no tenemos los ingredientes de esta receta">
                <p>El Recetario Maestro</p>                
            </b-jumbotron>
        </div>
        <PieFixed />
    </div>
</template>

<script>
import PieFixed from '../components/PieFixed'
    export default {
        name: 'NotFound',
        components:{
            PieFixed
        }
    }
</script>

<style lang="scss" scoped>
.jumbo {
  background-image: url("../assets/img/jumbito.jpg");
  background-position: center top;
  background-size: cover;
  color:white;
}

</style>