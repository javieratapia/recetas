<template>
  <div>

<!--HEADER JUMBOTRON BIENVENIDA A LA PAG-->
    <div>
      <b-jumbotron header="El Recetario Maestro" lead="¿Te gusta cocinar? Prepara algo diferente cada día">
        <p>Ingresa para guardar tus platos favoritos</p>
        <router-link to="/login"><b-button variant="danger">Login</b-button></router-link>
      </b-jumbotron>
    </div>

<!--BODY-->
    <b-container class="bv-example-row" fluid>
        <b-row>  

  <!--PANEL DE BUSQUEDAS Y FILTROS-->
          <b-col lg="2" cols="12"  class="text-left"  >
            <b-nav-form class="mx-auto">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">...</b-button>
            </b-nav-form>
          </b-col>

  <!--DESPLIEGUE RECETAS CON CARD EN COLUMNAS-->  
        <b-col lg="10" cols="12" >
          <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="3"> 
            <b-col>
              <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>
                <b-button href="#" variant="danger" v-b-modal.modal-1>Go somewhere</b-button>
              </b-card>          
            </b-col>

  <!--MODAL CONTENEDOR RECETA-->
            <b-modal id="modal-1" title="BootstrapVue">
              <p class="my-4">Hello from modal!</p>
            </b-modal>


            <b-col>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>          
            </b-col>

            <b-col>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>          
            </b-col>
      </b-row>
      </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>


export default {
  name: 'Home',

}
</script>
