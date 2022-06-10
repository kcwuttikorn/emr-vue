<template>
  <div class="home">
    <v-container fluid >
      <!-- <h1 class="subheading grey--text">SLAM</h1> -->
      <v-row :align="align" no-gutters>
        <v-col cols="6" >
          <v-layout column align-center>
            <v-card fluid
              height="70px"
              width="640px"
              class="yellow lighten-5 pa-2"
            >   
              

              <v-layout>       
                <v-flex xs12 md4>
                  <div class="caption yellow--text mx-7">.</div>
                  <div class="purple--text mx-1">Position:</div>
                  <!-- <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div> -->
                </v-flex>         
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">X:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Y:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Z:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>

                <v-flex xs12 md4>
                  <div class="caption yellow--text mx-7">.</div>
                  <div class="blue--text mx-1">Orientation:</div>
                  <!-- <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div> -->
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">X:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Y:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Z:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">W:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
              </v-layout>
            </v-card>

            <v-card
              height="480px"
              width="640px"
              class="yellow lighten-5 pa-2 my-3"
            >    
            </v-card>

          </v-layout>
        </v-col>

        <v-col cols="6" >
          <v-layout column align-center>
            <v-card
              height="300px"
              width="480px"
              class="grey lighten-5"
            >    
            </v-card>

            <v-card
              height="100px"
              width="480px"
              class="grey lighten-5 my-3"
            >    
            </v-card>

          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import HelloWorld from '../components/HelloWorld'

export default {
  name: "home",

  components: {
    //HelloWorld,
  },
};
</script>
