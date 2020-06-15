<template>
    <div class="mt-5 ">

    <b-container class="bv-example-row" fluid>
        <b-row align-h="center">  

<!--           <b-col cols="2" class="text-left">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">...</b-button>
            </b-nav-form>
          </b-col>

        <b-col> -->
          <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="3" align-h="center"> 
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
      <!-- </b-col> -->
      </b-row>
    </b-container>
    </div>
</template>

<script>
    export default {
        name: 'Favoritos'
    }
</script>

<style lang="scss" scoped>
.mt-5{
  margin-top: 6rem!important;
}
</style>