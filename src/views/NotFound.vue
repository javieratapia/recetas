<template>
    <div class="mt-5 ">
        <div>
            <b-jumbotron class="jumbo" header="¡No encontramos esta página!" lead="Quizás aún no tenemos los ingredientes de esta receta">
                <p>El Recetario Maestro</p>                
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
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