<template>
  <div class="displaypose">
    <v-container fluid>
      <v-row >
        <v-col cols="6" class="green lighten-5">
          <v-row class="d-flex justify-center">
            <div class="purple--text pa-1">Position:</div>
          </v-row>
          <v-row class="d-flex justify-center">
            <div class="purple--text pa-1">
              X:
              <span class="purple--text grey lighten-2 pa-1">0.001</span>
            </div>

            <div class="purple--text pa-1">
              Y:
              <span class="purple--text grey lighten-2 pa-1">0.002</span>
            </div>            
          </v-row>
        </v-col>

        <v-col cols="6" class="red lighten-5">
          <v-row class="d-flex justify-center">
            <div class="blue--text pa-1">Orientation:</div>
          </v-row>
          <v-row class="d-flex justify-center"> 
            <div class="blue--text pa-1">
              Z:
              <span class="blue--text grey lighten-2 pa-1">0.001</span>
            </div>
          </v-row>
        </v-col> 
      </v-row>

      <v-row>
        <v-col cols="12" class="yellow lighten-5">
          <v-card
              height="170x"
              
              class="yellow lighten-5"
              outlined
            >
              <v-row no-gutters>
                
              </v-row>

            </v-card>
        </v-col> 
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DisplayPose",
};
</script>
