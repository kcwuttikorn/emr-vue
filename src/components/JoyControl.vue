<template>
  <div class="sidebar">
    <v-container fluid>
      <v-row class="blue-grey lighten-5">
        <v-col cols="6">
          
            <v-select
            v-model="selectedMode"
            :items="modes"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            dense
          ></v-select>
          
          <v-row>
            <v-col >
              <v-btn color="primary" elevation="2" block outlined class="py-2"
                >Pose estimate</v-btn
              >
            </v-col>

            <v-col >
              <v-btn color="primary" elevation="2" block outlined class="py-2"
                >Navigate</v-btn
              >
            </v-col>

         
          </v-row>
        </v-col>

        <v-col cols="6" sm="6">
          <div id="zone_joystick"></div>
        </v-col>
      </v-row>
      <!-- <v-row>
        <div id="zone_joystick" ></div>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import nipplesjs from "nipplejs";

export default {
  name: "JoyControl",
  data() {
    return {
      selectedMode: "SLAM Mode",
      modes: ["SLAM Mode", "Navigation Mode"],
    };
  },
  mounted() {
    const manager = nipplesjs.create({
      zone: document.getElementById("zone_joystick"),
      mode: "static",
      position: { left: "87.5%", top: "89%" },
      //position: "absolute",
      color: "blue",
      threshold: 0.25,
      fadeTime: 400,
      size: 120,
      maxNumberOfNipples: 1,
      // shape:"square",
    });

    manager.on("start", function (event, nipple) {
      console.log("Movement start");
    });

    manager.on("move", function (event, nipple) {
      console.log("Moving");
    });

    manager.on("end", function () {
      console.log("Movement end");
    });
  },
};
</script>
