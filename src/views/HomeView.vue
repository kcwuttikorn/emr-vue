<template>
  <div class="home">
    <v-container fluid ma-0 pa-0 fill-height  class="blue">
      <!-- <v-row class="yellow lighten-5" > -->
      <v-layout>
        <v-col cols="9">
          <!-- <v-row no-gutters class="d-flex justify-start pa-1"> -->
          <v-card  class="yellow lighten-5 pa-1 ma-1">
            <!-- <v-layout > -->
            <v-row>
              <v-col cols="4" class="d-flex justify-center">
                <v-btn block elevation="2" color="red">
                  <v-icon>mdi-plus-box</v-icon>
                  Pose estimate
                </v-btn>
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <v-btn block elevation="2" color="green">
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Navigate
                </v-btn>
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <v-btn block elevation="2" color="blue">
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Manual Control
                </v-btn>
              </v-col>
            </v-row>
            <!-- </v-layout> -->
          </v-card>
          <!-- </v-row> -->

          
          <v-card fluid class="yellow lighten-5 pa-1 ma-1 d-flex justify-center">
            <!-- <v-row no-gutters class="d-flex justify-center pa-1"> -->
            <!-- <div>
              <p>window width: {{ windowWidth }}</p>
              <p>window height: {{ windowHeight }}</p>
            </div> -->
            <div id="map3d"></div>
            <!-- </v-row>           -->
          </v-card>
          
        </v-col>

        <v-col cols="3">
          <v-card fluid class="yellow lighten-5 pa-1 "  fill-height height="600px">
            
            <v-row no-gutters class="d-flex justify-center">
              <v-btn text color="red" v-if="connected" @click="disconnect">
                <span>Disconnect</span>
                <v-icon right>mdi-exit-to-app</v-icon>
              </v-btn>

              <v-btn text color="green" v-else @click="connect">
                <span>Connect</span>
                <v-icon right>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-row>
            

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-center">
              <span class="font-weight-light pa-1 purple--text"
                >EMR-Mode : {{ emrModeName }}</span
              >
            </v-row>

            <v-row no-gutters class="d-flex justify-center">
              <v-btn-toggle v-model="toggle_mode" mandatory class="pa-2">
                <v-btn
                  width="120"
                  large
                  elevation="2"
                  color="primary"
                  @click="slamClick"
                  >SLAM
                </v-btn>
                <v-btn
                  width="120"
                  large
                  elevation="2"
                  color="success"
                  @click="navClick"
                  >Navigation
                </v-btn>
              </v-btn-toggle>
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-center">
              <span class="font-weight-light pa-1 purple--text">Map</span>
            </v-row>

            <v-row no-gutters class="d-flex justify-center">
              <v-btn-toggle v-model="toggle_map" mandatory class="pa-2">
                <v-btn elevation="2" color="yellow" @click="mapSaveClick">
                  <v-icon>mdi-content-save-settings</v-icon>
                </v-btn>
                <v-btn elevation="2" color="green" @click="mapLoadClick">
                  <v-icon>mdi-file-download</v-icon>
                </v-btn>
                <v-btn elevation="2" color="red" @click="mapDeleteClick">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-center">
              <span class="font-weight-light pa-1 purple--text">Way point</span>
            </v-row>

            <v-row no-gutters class="d-flex justify-center">
              <v-btn-toggle v-model="toggle_waypoint" mandatory class="pa-2">
                <v-btn elevation="2" color="green" @click="waypointAddClick">
                  <v-icon>mdi-plus-box</v-icon>
                </v-btn>
                <v-btn elevation="2" color="red" @click="waypointDeleteClick">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-start pa-2">
              <div class="purple--text pa-1">Position:</div>
              <div class="purple--text pa-1">
                X:
                <span class="purple--text grey lighten-2 pa-1">0.001</span>
              </div>

              <div class="purple--text pa-1">
                Y:
                <span class="purple--text grey lighten-2 pa-1">0.002</span>
              </div>
            </v-row>

            <v-row no-gutters class="d-flex justify-start pa-2">
              <div class="blue--text pa-1">Orientation:</div>
              <div class="blue--text pa-1">
                Z:
                <span class="blue--text grey lighten-2 pa-1">0.001</span>
              </div>
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-start pa-2">
              <div id="zone_joystick"></div>
            </v-row>
            
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
//import { useWindowSize } from 'vue-window-size';
import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
import nipplesjs from "nipplejs";
import ROSLIB from "roslib";
import {
  Viewer,
  LaserScan,
  Pose,
  UrdfClient,
  OccupancyGridClient,
  InteractiveMarkerClient,
  MarkerClient,
  MarkerArrayClient,
  Path,
} from "ros3d";

export default {
  name: "Home",
  // setup() {
  //   const { width, height } = VueWindowSize();//useWindowSize();
  //   return {
  //     windowWidth: width,
  //     windowHeight: height,
  //   };
  // },
  data() {
    return {
      emrModeSwitch: false,
      emrModeName: "SLAM",
      //toggle_exclusive: undefined,
      toggle_mode: undefined,
      toggle_map: undefined,
      toggle_waypoint: undefined,
      //ws_addr: "ws://192.168.1.41:9090",     // Pi4 at home
      //ws_addr: "ws://10.222.45.231:9090",
      //ws_addr: "ws://10.222.41.248:9090",  // Pi4 Ros-Noetic at  work
      ws_addr: "ws://10.222.41.159:9090",  // Intel NUC & Laptop at work
      //ws_addr: "ws://192.168.1.52:9090", // Intel NUC & Laptop at home
      //ws_addr: "ws://192.168.1.49:9090", // Intel NUC & Laptop at home
      //ws_addr: "ws://10.222.47.101:9090", // Jetson nano
      colWidth: 0,
      timer: null,

      max_linear: 5.0, // m/s
      max_angular: 2.0, // rad/s
      max_distance: 75.0, // pixels;

      rosIP: "",
      rbServer: null,
      viewer3d: null,
      connected: false,

      mapNames: [],
      selectedMap: "",
      mapFields: ["selected", "name"],
      newMapName: "",

      wayPoints: [],
      selectedWayPoint: "",
      wayPointFields: ["selected", "name"],
      newWayPointName: "",
      seqWayPoint: 1,

      isWaypointAvailable: false,
      isNav: false,
      isSlam: false,
      isPose: "",
      isWayPoint: "",
      navStatus: "",
      isServerConnected: false,
      publishImmediately: true,

      //--- Ros Topic ------
      cmdVelTopic: null,
      goalCancelTopic: null,

      //--- Ros Service ------
      getMapSrv: null,
      getWayPointsSrv: null,
      getWaypointNameSrv: null,
      deleteMapSrv: null,
      deleteWaypointSrv: null,
      startNavSrv: null,
      startSLAMSrv: null,
      showPoseMarkerSrv: null,
      showNavMarkerSrv: null,
      setPoseSrv: null,
      getPoseSrv: null,
      calIMUSrv: null,
      onSlamSrvReq: null,
      offSlamSrvReq: null,
      onMarkerSrvReq: null,
      offMarkerSrvReq: null,

      //--- Ros Action Client ------
      actionClient: null,
    };
  },
  watch: {
    emrModeSwitch: (val) => {
      if (val == 0) this.disconnect;
      else if (val == 1) this.connect;
    },
  },
  components: {
    ResizeObserver,
  },
  mounted() {
    //this.$store.state.modeName = 'Slam Mode';
    //this.$store.dispatch("actionModeName", "Slam Mode");

    //--------------  For virtual Joy Stick Start --------------------
    const manager = nipplesjs.create({
      zone: document.getElementById("zone_joystick"),
      mode: "static",
      position: { left: "50%", top: "86%" },
      //position: "absolute",
      color: "blue",
      threshold: 0.25,
      fadeTime: 400,
      size: 150,
      maxNumberOfNipples: 1,
      //shape:"square",
    });

    manager.on("start", function (event, nipple) {
      console.log("Movement start");
      // this.timer = setInterval(function(){
      //   this.moveAction(linear_speed, angular_speed);
      // }, 50);
    });

    manager.on("move", function (event, nipple) {
        
        // max_linear = 5.0; // m/s
        // max_angular = 2.0; // rad/s
        // max_distance = 75.0; // pixels;
        // linear_speed = Math.sin(nipple.angle.radian) * this.max_linear * nipple.distance/this.max_distance;
        // angular_speed = -Math.cos(nipple.angle.radian) * this.max_angular * nipple.distance/this.max_distance;
        
        
        // nipplejs returns direction is screen coordiantes
        // we need to rotate it, that dragging towards screen top will move robot forward
        var direction = nipple.angle.degree - 90;
        if (direction > 180) {
          direction = -(450 - nipple.angle.degree);
        }
        // convert angles to radians and scale linear and angular speed
        // adjust if you want robot to drvie faster or slower
        var lin = Math.cos(direction / 57.29) * nipple.distance * 0.001;
        var ang = Math.sin(direction / 57.29) * nipple.distance * 0.01;
        // nipplejs is triggering events when joystic moves each pixel
        // we need delay between consecutive messege publications to
        // prevent system from being flooded by messages
        // events triggered earlier than 50ms after last publication will be dropped
        //console.log(lin);
        console.log("Moving : ", lin ,ang);
        console.log(nipple.angle.degree);
        if (this.publishImmediately == true) {
          this.publishImmediately = false;
          this.moveAction(lin, ang);
          setTimeout(
            function () {
              this.publishImmediately = true;
            }.bind(this),
            50
          );
        }
      }.bind(this)
    );

    manager.on("end",function () {
      console.log("Movement end");
      // if(this.timer){
      //   clearInterval(this.timer);
      // }      
      this.moveAction(0, 0);
    }.bind(this));

    window.addEventListener("resize", () => {
        this.colWidth = window.innerWidth;
        console.log("col width: ", this.colWidth)
      });
    //--------------- For Virtual Joy Stick End -------------------

    //--------------- For
  },

  methods: {
    connect: function () {
      //this.log = "connect to rosbridge server!!";
      this.rbServer = new ROSLIB.Ros({
        url: this.ws_addr,
      });
      this.rbServer.on("connection", () => {
        this.connected = true;
        //this.log = "Connected!";
        console.log("Connected!");
      });
      this.rbServer.on("error", (error) => {
        //this.log = "Error connecting to websocket server";
        console.log("Error connecting to websocket server: ", error);
      });
      this.rbServer.on("close", () => {
        this.connected = false;
        //this.log = "Connection to websocker server closed";
        console.log("Connection to websocket server closed.");
      });

      

      this.viewer3d = new Viewer({
        divID: "map3d",
        width: 640,
        height: 480,
        //width: (this.colWidth / 12) * 8,
        //height:(480),

        
        antialias: true,
      });      
      window.innerWidth
      this.viewer3d.resize( window.innerWidth*3/4, window.innerHeight*0.8
        // document.getElementById("map3d").offsetWidth * 0.96,
        // ((document.getElementById("map3d").offsetWidth * 3) / 4) * 0.96
      );

      var tfClient = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "map",
        serverName: "tf2_web_republisher",
      });

      new LaserScan({
        ros: this.rbServer,
        topic: "scan",
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        material: {
          color: 0x880000,
          size: 0.1,
        },
      });

      // new Pose({
      //   ros: this.rbServer,
      //   tfClient: tfClient,
      //   rootObject: this.viewer3d.scene,
      //   topic: "robot_pose",
      // });

      // new UrdfClient({
      //   ros: this.rbServer,
      //   tfClient: tfClient,
      //   rootObject: this.viewer3d.scene,
      // });

      // new OccupancyGridClient({
      //   ros: this.ros,
      //   continuous: true,
      //   rootObject: this.viewer.selectableObjects,
      // });

      var tfClientM = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "map",
        //fixedFrame: "base_footprint",
      });

      new InteractiveMarkerClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/simple_marker",
        camera: this.viewer3d.camera,
        rootObject: this.viewer3d.selectableObjects,
      });
      
      new MarkerClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker",
        camera: this.viewer3d.camera,
        rootObject: this.viewer3d.selectableObjects,
        lifetime: 10,
      });

      // new MarkerArrayClient({
      //   ros: this.rbServer,
      //   tfClient: tfClientM,
      //   topic: "/visualization_marker_array",
      //   rootObject: this.viewer.selectableObjects,
      // });
      // new MarkerArrayClient({
      //   ros: this.rbServer,
      //   tfClient: tfClientM,
      //   topic: "/visualization_marker_array_text",
      //   rootObject: this.viewer.selectableObjects,
      // });

      //----- Ros Topic -----------
      this.cmdVelTopic = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });

      //this.cmdVelTopic.advertise();

      //----- Ros Service ---------
    },
    disconnect: function () {
      this.rbServer.close();
      delete this.viewer3d;
      location.reload();
    },
    moveAction: function(linear, angular) {
      console.log("Move action");
      var twist = new ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
      });

      if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
      } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
      }
      this.cmdVelTopic.publish(twist);
    },
    handleResize({ width, height }) {
      console.log("resized", width, height);
      console.log(document.getElementById("map3d").offsetWidth);
      this.viewer3d.resize(
        (window.innerWidth*3/4)*0.9, window.innerHeight*0.8
        // document.getElementById("map3d").offsetWidth * 0.96,
        // (document.getElementById("map3d").offsetWidth * 0.96 * 3) / 4
      );
      // this.viewer3d.resize(
      //   document.getElementById("map3d").offsetWidth * 0.96,
      //   (document.getElementById("map3d").offsetWidth * 0.96 * 3) / 4
      // );
    },

    // setTopic: function () {
    //   this.topic = new ROSLIB.Topic({
    //     ros: this.ros,
    //     name: "/cmd_vel",
    //     messageType: "geometry_msgs/Twist",
    //   });
    // },
    // forward: function () {
    //   this.message = new ROSLIB.Message({
    //     linear: { x: 0.2, y: 0, z: 0 },
    //     angular: { x: 0, y: 0, z: 0 },
    //   });
    //   this.setTopic();
    //   this.topic.publish(this.message);
    // },
    // stop: function () {
    //   this.message = new ROSLIB.Message({
    //     linear: { x: 0, y: 0, z: 0 },
    //     angular: { x: 0, y: 0, z: 0 },
    //   });
    //   this.setTopic();
    //   this.topic.publish(this.message);
    // },
    // backward: function () {
    //   this.message = new ROSLIB.Message({
    //     linear: { x: -0.2, y: 0, z: 0 },
    //     angular: { x: 0, y: 0, z: 0 },
    //   });
    //   this.setTopic();
    //   this.topic.publish(this.message);
    // },
    // turnLeft: function () {
    //   this.message = new ROSLIB.Message({
    //     linear: { x: 0.2, y: 0, z: 0 },
    //     angular: { x: 0, y: 0, z: 0.2 },
    //   });
    //   this.setTopic();
    //   this.topic.publish(this.message);
    // },
    // turnRight: function () {
    //   this.message = new ROSLIB.Message({
    //     linear: { x: 0.2, y: 0, z: 0 },
    //     angular: { x: 0, y: 0, z: -0.2 },
    //   });
    //   this.setTopic();
    //   this.topic.publish(this.message);
    // },

    slamClick() {
      this.emrModeName = "SLAM";
    },
    navClick() {
      this.emrModeName = "Navigation";
    },
    mapSaveClick() {
      console.log("Save map");
    },
    mapLoadClick() {
      console.log("Load map");
    },
    mapDeleteClick() {
      console.log("Delete map");
    },
    waypointAddClick() {
      console.log("Add waypoint");
    },
    waypointDeleteClick() {
      console.log("Delete waypoint");
    },
  },
};
</script>
