<template>
  <div class="home">
    <v-container fluid >
      <!-- <v-row class="yellow lighten-5" > -->
      <v-row>
        <v-col cols="6">
          <DisplayPose />          
        </v-col>
        <v-col cols="6">
          <SideBar />
          <JoyControl />
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import ToolBar from '../components/ToolBar'
// import ToolBar from '@/components/ToolBar.vue'
import DisplayPose from "@/components/DisplayPose.vue";
import SideBar from "@/components/SideBar.vue";
import JoyControl from "@/components/JoyControl.vue";
// import DisplayPose from '@/components/DisplayPose.vue'

export default {
  name: "Home",
  components: {
    DisplayPose,
    SideBar,
    JoyControl
},
};
</script>
