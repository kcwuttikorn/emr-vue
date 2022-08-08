<template>
  <v-container>
    <v-app-bar app class="primary lighten-1" dark>
      <!-- <div class="d-flex align-center"> -->
      <v-row no-gutters>
        <v-col cols="4" class="d-flex justify-start">
          <v-toolbar-title class="text-uppercase white--grey">
            <span class="font-weight-light">Emr-</span>
            <span>Navigation : </span>
            <!-- <span>{{ $store.state.modeName }}</span> -->
            <span>Mode</span>
          </v-toolbar-title>
        </v-col>

        <v-col cols="4" class="d-flex justify-center align-center">
          <v-toolbar-title class=" white--grey" id="nav">
            <!-- <span class="font-weight-light">Emr-</span> -->
            <!-- <span>{{ $store.state.modeName }}</span> -->
            <!-- <span>menu</span> -->
            <!-- <div id="nav"> -->
              <router-link to="/">Home</router-link> |
              <router-link to="/blockly">Blockly</router-link> | 
              <router-link to="/setting">Setting</router-link>|
              <router-link to="/about">About</router-link> 
              
              <!-- <router-link :to="{name:'About'}">About</router-link> -->
            <!-- </div> -->
          </v-toolbar-title>
        </v-col>

        <v-col cols="4" class="d-flex justify-end">
          <v-btn text color="white-grey">
            <span>Connect</span>
            <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- </div> -->
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "ToolBar",
  data() {
    return {};
  },
};
</script>

<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;

  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  color: white;
  background: crimson;
  border: none;
  border-radius: 40px;
}
</style>
