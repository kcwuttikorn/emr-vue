<template>
  <v-card>
    <v-app-bar app class="primary lighten-2" dark dense>
      <v-app-bar-nav-icon
        variant="text"
        icon="mdi-menu"
        class="white-grey"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!-- <v-row no-gutters> -->
        <v-col cols="4">
          <v-toolbar-title class="text-uppercase white--grey">
            <span class="font-weight-light">Emr-</span>
            <span>Navigation</span>
          </v-toolbar-title>
        </v-col>

        <v-col cols="4">
          <v-toolbar-title class="text-uppercase white--grey">
            <!-- <span class="font-weight-light">Emr-</span> -->
            <!-- <span>{{ $store.state.modeName }}</span> -->
            <nav>
              <router-link to="/" class="font-weight-light black--text">Home</router-link> | 
              <router-link to="/program" class="font-weight-light black--text">Blockly</router-link>
            </nav>
          </v-toolbar-title>
        </v-col>

        <v-col cols="4" class="d-flex justify-end">
          <!-- <v-btn text color="white-grey" >
            <span>Connect</span>
            <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn> -->
        </v-col>
      <!-- </v-row> -->

      <!-- <v-toolbar-title class="text-uppercase white--grey">
        <span class="font-weight-light">Emr-</span>
        <span>Navigation</span>
      </v-toolbar-title> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-btn text color="white-grey">
        <span>Connect</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn> -->
    </v-app-bar>

    <!-- <v-navigation-drawer
      v-model="drawer"
      app
      class="primary lighten-2"
      temporary
      width="200"
      tile
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="150" rounded>
            <v-img
              height="100%"
              width="100%"
              src="../../public/emr-picture.jpg"
            ></v-img>
          </v-avatar>
        </v-flex>

        <v-list-item>
          <v-list-item-content class="_v-list-item-content">
            <v-list-item-title>EMR</v-list-item-title>
            <v-list-item-subtitle>Navigation Robot</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-layout>
      <v-divider></v-divider>     
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          link
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon large>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title large class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </v-card>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {  
      drawer: false,    
      links: [
        { icon: "mdi-home", text: "Home", route: "/" },
        //{ icon: "mdi-new-box", text: "Navigation", route: "/navigation" },
        { icon: "mdi-application-cog", text: "Program", route: "/program" },
        { icon: "mdi-application-cog", text: "Setting", route: "/setting" },
      ],
    };
  },  
};
</script>

<style>
._v-list-item-content {
  justify-content: center;
  text-align: center;
  display: grid;
}
</style>
