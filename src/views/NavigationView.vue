<template>
  <div class="navigation">
    <v-container fluid class="blue pa-2">
      <v-row no-gutters>
        <v-col cols="8">
          <v-layout column align-start>
            <v-card
              fluid
              height="70px"
              width="860px"
              class="yellow lighten-5 pa-2 ma-2"
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
              height="600px"
              width="860px"
              class="yellow lighten-5 pa-2 ma-2"
              outlined
            ></v-card>
          </v-layout>
        </v-col>

        <v-col cols="4">
          <v-layout column align-start>
            <v-card
              height="170x"
              width="435px"
              class="yellow lighten-5 pa-2 ma-2"
              outlined
            >
              <v-row no-gutters>
                <v-col cols="4">
                  <v-btn color="primary" elevation="2" block outlined>Initial Pose</v-btn>
                </v-col>
                  
                <v-col cols="4"> 
                  <v-btn color="primary" elevation="2" block outlined>Navigate</v-btn>
                </v-col>

                <v-col cols="4">
                  <v-btn color="primary" elevation="2" block outlined>Go Home</v-btn>
                </v-col>
              </v-row>

            </v-card>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style>
</style>



