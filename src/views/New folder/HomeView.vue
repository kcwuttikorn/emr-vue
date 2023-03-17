<template>
  <div class="home">
    <v-container fluid ma-0 pa-0 fill-height class="blue">
      <!-- <v-row class="yellow lighten-5" > -->
      <v-layout>
        <v-col cols="6">
          <v-card fluid class="yellow lighten-5 pa-1 d-flex justify-center">
            <!-- <v-row no-gutters class="d-flex justify-center"> -->
            <v-row no-gutters>
              <v-col cols="3" class="d-flex justify-center align-center">
                <v-btn
                  x-large
                  text
                  color="red"
                  v-if="this.connected"
                  @click="disconnect"
                >
                  <span>Disconnect</span>
                  
                  <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>

                <v-btn x-large text color="green" v-else @click="connect">
                  <span>Connect</span>
                  
                  <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
              </v-col>

              <v-divider vertical color="grey"></v-divider>

              <!-- <v-col cols="9"> -->
              <v-col cols="4" class="d-flex justify-start align-center">
                <!-- <v-row no-gutters > -->
                <span x-large class="font-weight-light pa-3 purple--text"
                  >EMR-Mode : {{ emrModeName }}</span
                >
                <!-- </v-row> -->
              </v-col>

              <v-col cols="5" class="d-flex justify-end align-center">
                <!-- <v-row no-gutters > -->
                <v-btn-toggle v-model="toggle_mode" mandatory class="pr-3">
                  <v-btn
                    large
                    elevation="2"
                    color="primary"
                    @click="slamClick"
                    width="120"
                    >SLAM
                  </v-btn>
                  <v-btn
                    large
                    elevation="2"
                    color="success"
                    @click="navClick"
                    width="120"
                    >Navigation
                  </v-btn>
                </v-btn-toggle>
                <!-- </v-row> -->
              </v-col>
              <!-- </v-col> -->
            </v-row>
          </v-card>
          <v-card class="yellow lighten-5 pa-1 my-1 d-flex justify-center">
            <v-row>
              <v-col cols="4" class="d-flex justify-left">
                <div class="purple--text pa-1">
                  Position:  X:
                  <span class="purple--text grey lighten-2 pa-1">{{rbPosX}}</span>
                </div>
              </v-col>

              <!-- <v-col cols="3">
                <div class="purple--text pa-1">
                  X:
                  <span class="purple--text grey lighten-2 pa-1">{{rbPosX}}</span>                  
                </div>
              </v-col> -->

              <v-col cols="3" class="d-flex justify-left">
                <div class="purple--text pa-1">                  
                  Y:
                  <span class="purple--text grey lighten-2 pa-1">{{rbPosY}}</span>
                </div>
              </v-col>

              <v-col cols="5" class="d-flex justify-left">
                <div class="blue--text pa-1">
                  Orientation: Z:
                  <span class="blue--text grey lighten-2 pa-1">{{rbOriZ}}</span>
                </div>
              </v-col>

              <!-- <v-col cols="2">
                <div class="blue--text pa-1">
                  Z:
                  <span class="blue--text grey lighten-2 pa-1">{{rbOriZ}}</span>
                </div>
              </v-col> -->
            </v-row>
          </v-card>
          <v-card fluid class="yellow lighten-5 pa-1 d-flex justify-center">
            <!-- <v-row no-gutters class="d-flex justify-center pa-1"> -->
            <!-- <div>
              <p>window width: {{ windowWidth }}</p>
              <p>window height: {{ windowHeight }}</p>
            </div> -->

            <div id="map3d"></div>

            <!-- </v-row>           -->
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            fluid
            class="yellow lighten-5 pa-1"
            fill-height
            height="600px"
          >    
            <!-- <v-row >
              <v-col cols="6" class="d-flex justify-center align-center">
                <v-checkbox v-model="isPose" @change="updatePose"> </v-checkbox>
                <v-btn
                  elevation="2"
                  :disabled="!isPose"
                  color="red"
                  width="180px"
                  @click="setPose"
                >
                  <v-icon>mdi-plus-box</v-icon>
                  Pose estimate
                </v-btn>
              </v-col>

              <v-col cols="6" class="d-flex justify-center align-center">
                <v-checkbox v-model="isWayPoint" @change="updateWaypoint">
                </v-checkbox>
                <v-btn
                  elevation="2"
                  :disabled="!isWayPoint"
                  color="green"
                  width="180px"
                  @click="setWaypoint"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Set Waypoint
                </v-btn>
              </v-col>
            </v-row> -->

            <v-row>              
              <v-card-title>
                <span class="text-h5 font-weight-light  purple--text">Current Map :</span>
                
                <!-- <span class="text-h5 font-weight-light px-3 green--text" v-if ="this.selectedMap !== ''">{{ this.selectedMap }}</span> -->
                <span class="text-h5 font-weight-light px-3 green--text" v-if ="this.getSelectedMapName !== ''">{{ this.getSelectedMapName }}</span>
                <span class="text-h5 font-weight-light px-3 red--text" v-else>No map load</span>
              </v-card-title>
            </v-row>
            <v-divider color="orange"></v-divider>

            

            <v-row>  
              <v-col cols="9">   <!-- Map & Waypoint    -->
                <v-layout column align-start>
                  <!-- <v-card class="pa-2" outlined> cam</v-card> -->
                  <v-card >
                    <v-tabs
                      v-model="tab"
                      background-color="light-blue"
                      dark
                      centered
                      class="pa-1"
                      outlined
                    >
                      <v-tabs-slider color="yellow"></v-tabs-slider>
                      <v-tab v-for="item in items" :key="item.tab">
                        {{ item.tab }}
                      </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                     <v-tab-item>          <!-- Map Table -->
                        <v-container>
                          <v-card  height="420px" class="yellow lighten-5">                            
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col
                                    cols="9"
                                    class="d-flex justify-start"
                                  >
                                    <v-form
                                      ref="form"
                                      v-model="validMap"
                                      lazy-validation                                      
                                    >
                                      <v-text-field
                                        v-model="newMapName"
                                        label="New map name"
                                        ref="inputRef"
                                        required                                        
                                      >
                                      </v-text-field>
                                    </v-form>
                                  </v-col>

                                  <v-col
                                    cols="3"
                                    class="d-flex justify-center "
                                  >
                                    <v-card-actions>
                                      <v-btn
                                        small
                                        color="blue darken-1"
                                        outlined
                                        @click="saveMap"
                                      >
                                        <v-icon
                                          >mdi-content-save-settings</v-icon
                                        >
                                        <span>Save</span>
                                      </v-btn>
                                    </v-card-actions>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-data-table
                                    class="elevation-1"
                                    v-model="mapSelected"
                                    :headers="mapHeaders"
                                    :items="mapNames"                                    
                                    item-key="name"
                                    show-select
                                    single-select
                                    fixed-header
                                    height="250"
                                    hide-default-footer
                                  >
                                    
                                  </v-data-table>
                                </v-row>
                              </v-container>
                              <!-- <small>*indicates required field</small> -->
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                small
                                color="green darken-1"
                                outlined
                                @click="useMap"
                              >
                                <v-icon>mdi-file-download</v-icon>
                                <span>Use</span>
                              </v-btn>
                              <v-btn
                                small
                                color="red darken-1"
                                outlined
                                @click="deleteMap"
                              >
                                <v-icon>mdi-trash-can-outline</v-icon>
                                <span>Delete</span>
                              </v-btn>                              
                            </v-card-actions>
                          </v-card>
                        </v-container>
                      </v-tab-item>

                      <v-tab-item>
                        <v-container>
                          <v-card height="420px" class="yellow lighten-5">
                            
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col
                                    cols="8"
                                    class="d-flex justify-start "
                                  >
                                    <v-form
                                      ref="form"
                                      v-model="validWaypoint"
                                      lazy-validation
                                    >
                                      <v-text-field
                                        v-model="newWaypointName"
                                        label="New waypoint name"
                                        required
                                      >
                                      </v-text-field>
                                    </v-form>
                                  </v-col>

                                  <v-col
                                    cols="4"
                                    class="d-flex justify-center"
                                  >
                                    <v-card-actions>
                                      <v-checkbox v-model="isWayPoint" @change="updateWaypoint" :disabled="this.selectedMap ===''"></v-checkbox>
                                      <v-btn
                                        small
                                        color="blue darken-1"
                                        outlined 
                                        :disabled="!isWayPoint"
                                        @click="setWaypoint"
                                      >
                                        <v-icon>mdi-plus-box</v-icon>
                                        <span>add</span>
                                      </v-btn>
                                    </v-card-actions>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-data-table
                                    class="elevation-1"
                                    v-model="waypointSelected"
                                    :headers="waypointHeaders"
                                    :items="wayPoints"
                                    item-key="name"
                                    show-select
                                    fixed-header
                                    height="200"
                                    hide-default-footer
                                  >
                                  </v-data-table>
                                </v-row>

                                
                              </v-container>
                         
                            </v-card-text>

                            <v-card-actions>
                              <p>{{ waypointSelected }}</p>
                              <v-spacer></v-spacer>

                              <v-btn
                                small
                                color="green darken-1"
                                outlined
                                @click="goGoal"
                              >
                                <v-icon>mdi-file-download</v-icon>
                                <span>Go</span>
                              </v-btn>

                              <v-btn
                                small
                                color="red darken-1"
                                outlined
                                @click="deleteWaypoint"
                              >
                                <v-icon>mdi-trash-can-outline</v-icon>
                                <span>Delete</span>
                              </v-btn>
                              
                            </v-card-actions>
                          </v-card>
                        </v-container>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                </v-layout>
              </v-col>
              <!-- <v-divider color="orange" vertical></v-divider> -->
              <v-col cols="3">
                <v-row class="d-flex justify-start align-center">
                  <v-checkbox v-model="isPose" @change="updatePose"> </v-checkbox>
                  <v-btn
                    small
                    elevation="2"
                    :disabled="!isPose"
                    color="red"
                    width="120px"
                    @click="setPose"
                  >
                    <!-- <v-icon>mdi-plus-box</v-icon> -->
                    Pose estimate
                  </v-btn>
                </v-row>

                
                <v-row class="d-flex justify-start align-center pa-3">
                  <Block />
                </v-row>
                 
              
                

              </v-col>
            </v-row>

            

            



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
//import RMap from "../components/RMap.vue";
//import RWaypoint from "../components/RWaypoint.vue";
import Block from "../components/Block.vue";

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
  Grid,
} from "ros3d";

import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
import nipplesjs from "nipplejs";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      tab: null,
      items: [
        { tab: "Map", content: "Tab 1 Content" },
        { tab: "Waypoint", content: "Tab 2 Content" },
      ],
      emrModeSwitch: false,
      emrModeName: "",
      //toggle_exclusive: undefined,
      toggle_mode: undefined,
      toggle_map: undefined,
      toggle_waypoint: undefined,
      checkbox1: false,
      checkbox2: false,
      //ws_addr: "ws://192.168.1.75:9090", // Intel NUC at home    

      //ws_addr: "ws://10.222.41.248:9090",  // Pi4 Ros-Noetic at  work

      ws_addr: "ws://10.222.41.159:9090", // Intel NUC at work
      colWidth: 1360,
      timer: null,

      // max_linear: 5.0, // m/s
      // max_angular: 2.0, // rad/s
      // max_distance: 75.0, // pixels;
      linear_speed: 0,
      angular_speed: 0,

      rosIP: "",
      rbServer: null,
      viewer3d: null,
      connected: false,

      mapNames: [],
      selectedMap: "",
      mapFields: ["selected", "name"],
      newMapName: "",
      mapSelected: [],
      mapHeaders: [
        {
          text: "Map Name",
          align: "center",
          sortable: false,
          value: "name",
          width :"360px"
        },
      ],
      map:{
        name:'',
      },
      validMap: true,
    
      wayPose: [],
      wayPoints: [],
      selectedWayPoint: "",
      waypointFields: ["selected", "name"],
      newWaypointName: "",
      waypointSelected:[],
      waypointHeaders: [
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: "name",
        width :"90px"
      },
      {
        text: "Pose X",
        align: "center",
        sortable: false,
        value: "poseX",
        width :"90px"
      },
      {
        text: "Pose Y",
        align: "center",
        sortable: false,
        value: "poseY",
        width :"90px"
      },
      {
        text: "Orient Z",
        align: "center",
        sortable: false,
        value: "OrientZ",
        width :"90px"
      },
    ],
      seqWayPoint: 1,
      validWaypoint: true,

      isWaypointAvailable: false,
      isNav: false,
      isSlam: false,
      isPose: "",
      isWayPoint: "",
      navStatus: "",
      isServerConnected: false,
      publishImmediately: true,
      g_pose: null,
      rbPosX: 0,
      rbPosY: 0,
      rbOriZ: 0,

      //--- Ros Topic ------
      cmdVelTopic: null,
      goalCancelTopic: null,

      //--- Ros Service ------
      getMapSrv: null,
      getWayPointsSrv: null,
      getWaypointNameSrv: null,
      getPoseWaypointNameSrv: null,
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
      onNavSrvReq: null,
      offNavSrvReq: null,

      onMarkerSrvReq: null,
      offMarkerSrvReq: null,
      saveMapSrv: null,

      //--- Ros Action Client ------
      actionClient: null,
    };
  },
  watch: {
    // emrModeSwitch: (val) => {
    //   if (val == 0) this.disconnect;
    //   else if (val == 1) this.connect;
    // },
  },
  components: {
    ResizeObserver,
    Block,
    //RMap,
    //RWaypoint,
  },
  mounted() {


    //this.$store.state.modeName = 'Slam Mode';
    //this.$store.dispatch("actionModeName", "Slam Mode");

    // this.connected = this.getServerConnected;

    // this.isServerConnected = this.getServerConnected;
    // this.rbServer = this.getRbServer;
    // this.selectedMapFile = this.getSelectedMapName;
    //if( this.connected == true) this.loadMap();

    //--------------  For virtual Joy Stick Start --------------------

    var option = {
      zone: document.getElementById("zone_joystick"),
      mode: "static",
      position: { left: "85%", top: "80%" },
      //position: "absolute",
      color: "blue",
      threshold: 0.25,
      fadeTime: 400,
      size: 150,
      maxNumberOfNipples: 1,
    };

    const manager = nipplesjs.create(option);
    //var timer;
    // var linear_speed=0, angular_speed=0;

    manager.on(
      "start",
      function (event, nipple) {
        //this.startMoveInterval(0.05, 0);
        this.timer = setInterval(this.move, 200);
        //this.timer= setInterval(this.move1, 200);

        //console.log("Move start : ", linear_speed ,angular_speed);
      }.bind(this)
    );

    manager.on(
      "move",
      function (event, nipple) {
        var max_linear = 0.5; //5.0; // m/s
        var max_angular = 0.5; //2.0; // rad/s
        var max_distance = 75.0; // pixels;
        this.linear_speed =
          (Math.sin(nipple.angle.radian) * max_linear * nipple.distance) /
          max_distance;
        this.angular_speed =
          (-Math.cos(nipple.angle.radian) * max_angular * nipple.distance) /
          max_distance;

        //console.log("Moving : ", this.linear_speed ,this.angular_speed);
        //this.startMoveInterval(linear_speed, angular_speed);
      }.bind(this)
    );

    manager.on(
      "end",
      function () {
        console.log("Move end");
        this.stopMoveInterval();
        // if(this.timer)
        //   clearInterval(this.timer);
      }.bind(this)
    );

    //this.connected = this.$store.state.serverConnected;

    //--------------- For Virtual Joy Stick End -------------------
  },

  methods: {
    connect: function () {

      this.rbServer = new ROSLIB.Ros({
        url: this.ws_addr,
      });

      this.rbServer.on("connection", () => {
        this.connected = true;
        this.$store.commit("setRbServer", this.rbServer);
        this.$store.commit("setServerConnected", true);
        this.$store.commit("setRosIP", this.rosIP);

        console.log("Connected! :", this.connected );
      });

      this.rbServer.on("error", (error) => {
        //this.log = "Error connecting to websocket server";
        console.log("Error connecting to websocket server: ", error);
      });

      this.rbServer.on("close", () => {
        this.connected = false;
        //this.log = "Connection to websocket server closed";
        console.log("Connection to websocket server closed.");
      });

      window.addEventListener("resize", () => {
        this.colWidth = window.innerWidth;
        //console.log("386 : col width: ", this.colWidth);
      });

      //console.log(this.viewer3d);

      this.viewer3d = new Viewer({
        divID: "map3d",
        width: 640,
        height: 480,

        antialias: true,
        //background: '#efefef',
        near:true,
        cameraPose: { x: 0, y: 0, z: 10 },
        //displayPanAndZoomFrame: false,
        
      });

      //console.log(this.viewer3d);

      //this.Viewer.addObject(new ros3d.Grid());

      //window.innerWidth
      this.viewer3d.resize(
        //window.innerWidth*3/4, window.innerHeight*0.8
        //  document.getElementById("map3d").offsetWidth * 0.96,
        //  ((document.getElementById("map3d").offsetWidth * 3) / 4) * 0.96
        (this.colWidth / 12) * 6 * 0.9,
        (this.colWidth / 12) * 6 * 0.75 * 0.9
      );

      var tfClient = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "map",
        serverName: "tf2_web_republisher",
      });

      var tfClientM = new ROSLIB.TFClient({
        ros: this.rbServer,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: "/map",
        //fixedFrame: "base_footprint",
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

      new Pose({
        ros: this.rbServer,
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        topic: "robot_pose",
      });

      // new UrdfClient({
      //   ros: this.rbServer,
      //   tfClient: tfClient,
      //   path : 'http://resources.robotwebtools.org/',
      //   rootObject: this.viewer3d.scene,
      // });

      new OccupancyGridClient({
        ros: this.rbServer,
        continuous: true,
        rootObject: this.viewer3d.scene,
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

      new MarkerArrayClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker_array",
        rootObject: this.viewer3d.selectableObjects,
      });

      new MarkerArrayClient({
        ros: this.rbServer,
        tfClient: tfClientM,
        topic: "/visualization_marker_array_text",
        rootObject: this.viewer3d.selectableObjects,
      });

      //----- Ros Topic -----------
      this.cmdVelTopic = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
      this.cmdVelTopic.advertise();

      this.goalCancelTopic = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/move_base/cancel",
        messageType: "actionlib_msgs/GoalID",
      });
      this.goalCancelTopic.advertise();

      var pathDisplay = new Path({
        ros: this.rbServer,
        tfClient: tfClient,
        rootObject: this.viewer3d.scene,
        topic: "/move_base_flex/GlobalPlanner/plan",
      });
      this.viewer3d.addObject(pathDisplay);

      this.actionClient = new ROSLIB.ActionClient({
        ros: this.rbServer,
        actionName: "move_base_msgs/MoveBaseAction",
        serverName: "/move_base",
      });
      
      var move_base_status_listener = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "move_base/status",
        messageType: "actionlib_msgs/GoalStatusArray",
      });

      move_base_status_listener.subscribe(
        function(message){
          if(message.status_list.lenght == 1)
          {
            //console.log(message.status_list[0].status)
            //console.log(message.status_list[0].goal_id)
            this.goalID = message.status_list[0].goal_id;
            //console.log(nav_statusElement)
            if (message.status_list[0].status == 3) {
              this.navStatus = "Goal react";
            } else if (message.status_list[0].status == 1) {
              this.navStatus = "Driving";
            }
          }
        }.bind(this)
      );

      var robot_pose_listener = new ROSLIB.Topic({
        ros: this.rbServer,
        name: "/odom",
        messageType: "nav_msgs/Odometry",
      });
      robot_pose_listener.subscribe(
        function(msgs){
          //console.log(msgs.pose.pose.position)
          var px = msgs.pose.pose.position.x *100;
          var py = msgs.pose.pose.position.y *100;
          var oz = msgs.pose.pose.orientation.z *100;

          this.rbPosX = px.toFixed(3);
          this.rbPosY = py.toFixed(3);
          this.rbOriZ = oz.toFixed(3);
        }.bind(this)
      );


      //----- Ros Service ---------
      this.getMapSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_map",
        serviceType: "agv_interface/maps",
      });

      this.getWayPointsSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint",
        serviceType: "agv_interface/waypointsarray",
      });

      this.getWaypointNameSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint_name",
        serviceType: "agv_interface/waypointname",
      });

      this.getPoseWaypointNameSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_a_waypoint",
        serviceType: "agv_interface/awaypoint",
      });

      this.deleteMapSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/delete_map",
        serviceType: "agv_interface/deletemap",
      });

      this.deleteWaypointSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/delete_waypoint",
        serviceType: "agv_interface/deletewaypoint",
      });

      this.startNavSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/start_navigation",
        serviceType: "agv_interface/navigatesrv",
      });

      this.startSLAMSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/start_slam",
        serviceType: "agv_interface/slamsrv",
      });

      this.showPoseMarkerSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/poseestimate_markers_service",
        serviceType: "agv_interface/poseestimate",
      });

      this.showNavMarkerSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/waypoint_markers_service",
        serviceType: "agv_interface/navigatesrv",
      });

      this.setPoseSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/set_pose",
        serviceType: "agv_interface/poseestimate",
      });

     

      this.getPoseSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_pose",
        serviceType: "agv_interface/getpose",
      });

      this.saveMapSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/save_map",
        serviceType: "agv_interface/savemaps",
      });

      // this.calIMUSrv= new ROSLIB.Service({
      //   ros: this.rbServer,
      //   name: "/imu_cal",
      //   serviceType: "std_srvs/Empty",
      // });

      this.onSlamSrvReq = new ROSLIB.ServiceRequest({
        onezero: 1,
        map_file: "map_office",
      });
      console.log(this.onSlamSrvReq);

      this.offSlamSrvReq = new ROSLIB.ServiceRequest({
        onezero: 0,
        map_file: "map_office",
      });
      console.log(this.onSlamSrvReq);

      this.onNavSrvReq = new ROSLIB.ServiceRequest({
        onezero: 1,
        map_file: this.selectedMap,
      });
      console.log(this.onNavSrvReq);

      this.offNavSrvReq = new ROSLIB.ServiceRequest({
        onezero: 0,
        map_file: this.selectedMap,
      });
      console.log(this.offNavSrvReq);

      this.onMarkerSrvReq = new ROSLIB.ServiceRequest({
        onezero: 1,
      });

      this.offMarkerSrvReq = new ROSLIB.ServiceRequest({
        onezero: 0,
      });

      this.loadMap();
    },
    disconnect: function () {
      this.rbServer.close();
      delete this.viewer3d;
      this.$store.commit("setServerConnected", false);
      location.reload();
    },
    move: function () {
      var twist = new ROSLIB.Message({
        linear: { x: this.linear_speed, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: this.angular_speed },
      });
      console.log("speed:", twist.linear.x, twist.angular.z);
      this.cmdVelTopic.publish(twist);
    },
    move1: function () {
      var twist = new ROSLIB.Message({
        linear: { x: 0.02, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
      });
      this.cmdVelTopic.publish(twist);
    },
    startMoveInterval: function (lin, ang) {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(this.move(lin, ang), 200);
    },
    stopMoveInterval: function () {
      if (this.timer) clearInterval(this.timer);
      this.move(0, 0);
    },

    handleResize({ width, height }) {
      //console.log("resized", width, height);
      //console.log("clientWidth" , document.getElementById("map3d").clientWidth);
      this.viewer3d.resize(
        // document.getElementById("map3d").offsetWidth ,
        //(document.getElementById("map3d").offsetWidth * 3) / 4
        (width / 12) * 6 * 0.9,
        (width / 12) * 6 * 0.75 * 0.9
      );
    },
    calIMU() {
      var param = new ROSLIB.ServiceRequest({});
      this.calIMUSrv.callService(param, function (result) {
        console.log(result);
      });
    },
    // saveMap(item) {
    //   console.log(item);
    //   this.newMapName = item.name;
    //   var mapName_ = new ROSLIB.ServiceRequest({
    //     mapfile: this.newMapName,
    //   });

    //   console.log(this.newMapName);
    //   console.log(mapName_);
    //   this.saveMapSrv.callService(mapName_, function (result) {
    //     console.log(result);
    //   });
    // },
    checkMapDuplicate(val)
    {
      return val.name == this.newMapName;
    },
    
    saveMap(){ 
      if( this.newMapName !=="")
      {
        const result = this.mapNames.find(this.checkMapDuplicate);
        if(result == undefined)
        {
          //this.names.push({name:this.newMapName});      
          this.mapNames.push({name:this.newMapName});      
          console.log('Save Map');

          //this.$emit("mapSave", {name: this.newMapName});
          var mapName_ = new ROSLIB.ServiceRequest({
            mapfile: this.newMapName,
          });

          console.log(this.newMapName);
          console.log(mapName_);
          this.saveMapSrv.callService(mapName_, function (result) {
            console.log(result);
            this.loadMap();
          });
          
          this.newMapName = "";
          // this.dialog = false;
        }
        else
        {
          alert('Existing map name.')
        }

      }
      
    },
    setPose() {
      this.setPoseSrv.callService(this.onMarkerSrvReq, function (result) {
        console.log(result);
      });
    },
    setWaypoint() {
      console.log("set waypoint");
      console.log(this.selectedMap);
      console.log(this.seqWayPoint);
      var poseReq = new ROSLIB.ServiceRequest({
        name: this.newWaypointName,
        seq: this.seqWayPoint,
        mapname: this.selectedMap,
      });
      console.log(poseReq);
      this.getPoseSrv.callService(
        poseReq,
        function (result) {
          console.log("1066 :",result);
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
          this.getWaypointNameSrv.callService(
            getwaypointparam,
            function (result) {
              console.log("1073:",result);
              var dataSet = [];
              while (this.wayPoints.length > 0) {
                this.wayPoints.pop();
              }
              //g_waypoints.push(['none', 'NONE'])
              if (result.length == 0) {
                this.isWaypointAvailable = false;
              } else {
                this.isWaypointAvailable = true;
              }
              result.waypointname.forEach((fn) => {
                var item = {
                  name: fn,
                };
                dataSet.push(item);
                this.wayPoints.push(item);
                console.log(fn);
              });
              console.log("Data set 1092:",dataSet);
            }.bind(this)
          );
          var getwaypointparam2 = new ROSLIB.ServiceRequest({
            name: this.selectedMap,
          });
          this.getWayPointsSrv.callService(getwaypointparam2, function (result) {
            console.log(result);
          });
        }.bind(this)
      );
    },
    goGoal()
    {
      if(this.waypointSelected.length !==0)
      {
        console.log("Selected waypoint : ", this.waypointSelected[0].name);
        this.selectedWayPoint = this.waypointSelected[0].name;
        this.onRowWayPointSelected();
        console.log(this.selectedWayPoint);

        this.goToWaypoint();
      }     
    },
    goToWaypoint() {
      // create a goal
      console.log("send goal");
      //console.log(pose)
      console.log(this.g_pose);
      var goal = new ROSLIB.Goal({
        actionClient: this.actionClient,
        goalMessage: {
          target_pose: {
            header: {
              frame_id: "map",
            },
            pose: this.g_pose.pose,
          },
        },
      });
      goal.send();
      goal.on("feedback", function (feedback) {
        console.log("Feedback: " + feedback);
      });
      goal.on("result", function (result) {
        console.log("Final Result: " + result);
      });
    },
    updateSLAM() {
      if (this.isSLAM == true) {
        this.startSLAMSrv.callService(this.onSlamSrvReq, function (result) {
          console.log(result);
        });
        //this.$store.commit("setIsSlamRunning", true);
      } else {
        this.startSLAMSrv.callService(this.offSlamSrvReq, function (result) {
          console.log(result);
        });
        //this.$store.commit("setIsSlamRunning", false);
      }
    },
    updatePose() {
      if (this.isPose == true) {
        this.showPoseMarkerSrv.callService(
          this.onMarkerSrvReq,
          function (result) {
            console.log("updatePose(): ", result);
          }
        );
        //this.isPose = false; //wut add
      } else {
        this.showPoseMarkerSrv.callService(
          this.offMarkerSrvReq,
          function (result) {
            console.log("updatePose():", result);
          }
        );
        //this.isPose = true; //wut add
      }
      console.log(this.isPose);
    },
    updateWaypoint() {
      if (this.isWayPoint == true) {
        this.showNavMarkerSrv.callService(
          this.onMarkerSrvReq,
          function (result) {
            console.log("updateWaypoint():", result);
          }
        );
      } else {
        this.showNavMarkerSrv.callService(
          this.offMarkerSrvReq,
          function (result) {
            console.log("updateWaypoint():", result);
          }
        );
      }
      console.log("updateWaypoint():",this.isWayPoint);
    },
    updateNav() {
      var check_nav = this.isNav;
      console.log(this.isNav);
      if (check_nav == true) {
        if (this.selectedMap == "") {
          this.$alert("Choose a map first");
          this.isNav = this.FALSE;
          console.log("After dialog");
          console.log(this.isNav);
        } else {
          var onNav_ = new ROSLIB.ServiceRequest({
            onezero: 1,
            map_file: this.selectedMap,
          });
          console.log(onNav_);
          this.startNavSrv.callService(onNav_, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", true);
        }
      } else {
        if (this.selectedMap == "") {
          console.log("NO map name");
        } else {
          var offNav_ = new ROSLIB.ServiceRequest({
            onezero: 0,
            map_file: this.selectedMap,
          });
          console.log(offNav_);
          this.startNavSrv.callService(offNav_, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", false);
        }
      }
      console.log(check_nav);
    },
    loadMap() {
      this.getMapSrv.callService(
        this.onMarker,
        function (result) {
          console.log("Done");
          console.log(result);
          while (this.mapNames.length > 0) {
            this.mapNames.pop();
          }
          result.map_file.forEach((fn) => {
            var item = {
              name: fn,
            };
            this.mapNames.push(item);
            console.log(fn);
          });

          console.log(this.mapNames);
        }.bind(this)
      );
    },
    deleteAMap(item) {
      console.log("Delete map");
      console.log(item);
      this.selectedMap = item;
      console.log(this.selectedMap);
      var delMapParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMap,
      });
      this.deleteMapSrv.callService(
        delMapParam,
        function (result) {
          console.log(result);
          this.loadMap();
        }.bind(this)
      );
    },
    deleteAWaypoint(map, waypoint) {
      console.log("Delete waypoint: ", map, waypoint);
      this.selectedMap = map;
      this.selectedWayPoint = waypoint;
      console.log("Delete waypoint: ", this.selectedMap, this.selectedWayPointt);

      var delWaypointParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMap,
        waypoint: this.selectedWayPoint,
      });
      this.deleteWaypointSrv.callService(
        delWaypointParam,
        function (result) {
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
          console.log(result);
          this.getWaypointNameSrv.callService(
            getwaypointparam,
            function (result) {
              console.log(result);
              var dataSet = [];
              while (this.wayPoints.length > 0) {
                this.wayPoints.pop();
              }
              //g_waypoints.push(['none', 'NONE'])
              if (result.length == 0) {
                this.isWaypointAvailable = false;
              } else {
                this.isWaypointAvailable = true;
              }
              result.waypointname.forEach((fn) => {
                var item = {
                  name: fn,
                };
                dataSet.push(item);
                this.wayPoints.push(item);
                console.log(fn);
              });
              console.log(dataSet);
              //Update table
            }.bind(this)
          );
          var getwaypointparam2 = new ROSLIB.ServiceRequest({
            name: this.selectedMap,
          });
          this.getWayPointsSrv.callService(
            getwaypointparam2,
            function (result) {
              console.log(result);
            }
          );
        }.bind(this)
      );
    },
    onRowMapSelected(){//items) {
     // if (items.length > 0) {
        //this.selectedMap = items[0].name;
        //this.$store.commit("setSelectedMapName", this.selectedMap);
        //console.log(this.selectedMap);
        //let name,pose;
        var wn =[]; 
        var wp =[];

        var getwaypointparam = new ROSLIB.ServiceRequest({
          mapname: this.selectedMap,
        });
        this.getWaypointNameSrv.callService(
          getwaypointparam,
          function (result) {
            //console.log(result);
            //name = result;
            while (this.wayPoints.length > 0) {
              this.wayPoints.pop();
            }
            //g_waypoints.push(['none', 'NONE'])
            if (result.length == 0) {
              this.isWaypointAvailable = false;
            } else {
              this.isWaypointAvailable = true;
            }
            result.waypointname.forEach((fn) => {
              var item = {
                name: fn,
              };
              this.wayPoints.push(item);
              wn.push(item);
            });
            
            console.log("wn :", wn);
          }.bind(this)
        );
        console.log("Call getwaypoins");
        var getwaypointparam2 = new ROSLIB.ServiceRequest({
          name: this.selectedMap,
        });
        console.log(getwaypointparam2);
        this.getWayPointsSrv.callService(
          getwaypointparam2, 
          function (result) {
            console.log("Get resulte", result);
          
          //pose = result;
            
            result.pose.forEach((pn, index) => {
                var item = {
                  name : wn[index].name,
                  pose : pn
                };
                wp.push(item);
                //console.log("index :", index, pn)
            });
            //this.wayPose = [...wp]
            //console.log("waypose :", wp);

            

          });

          this.$store.commit("setSelectedWayPoint", wp);



        
      //}
    },
    onRowWayPointSelected(){
        var getwaypointparam = new ROSLIB.ServiceRequest({
          name: this.selectedWayPoint,
          mapname: this.selectedMap,
        });
        this.getPoseWaypointNameSrv.callService(
          getwaypointparam,
          function (result) {
            this.g_pose = result;
            console.log(result);
          }.bind(this)
        );
        console.log(this.selectedWayPoint);
     
    },

    slamClick() {
      if (this.emrModeName == "SLAM") {
        this.emrModeName = "";
        this.isSLAM = false;
        this.isNav = false;

        // off slam mode first
        if (this.isSlam == false) {
          this.startSLAMSrv.callService(this.offSlamSrvReq, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsSlamRunning", false);
        }
        //-----------------------
      } else {
        this.emrModeName = "SLAM";
        this.isSLAM = true;
        this.isNav = false;

        // off navigation mode first
        if (this.isNav == false) {
          this.startNavSrv.callService(this.offNavSrvReq, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", false);
        }
        //--------------------------
        if (this.isSLAM == true) {
          this.startSLAMSrv.callService(this.onSlamSrvReq, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsSlamRunning", true);
        }
      }
    },
    navClick() {
      if (this.emrModeName == "Navigation") {
        this.emrModeName = "";
        this.isSLAM = false;
        this.isNav = false;
        // off navigation mode first
        if (this.isNav == false) {
          this.startNavSrv.callService(this.offNavSrvReq, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsNavRunning", false);
        }
        //--------------------------
      } else {
        this.emrModeName = "";
        this.isSLAM = false;
        this.isNav = true;

        // off slam mode first
        if (this.isSlam == false) {
          this.startSLAMSrv.callService(this.offSlamSrvReq, function (result) {
            console.log(result);
          });
          this.$store.commit("setIsSlamRunning", false);
        }
        //-----------------------

        if (this.isNav == true) {
          console.log("navClick(1067):", this.selectedMap);
          if (this.selectedMap == "") {
            this.$alert("Choose a map first");
            this.isNav = false;
            console.log("After dialog");
            console.log(this.isNav);
            this.$store.commit("setIsNavRunning", false);
            this.isNav = false;
          } else {
            this.emrModeName = "Navigation";
            var onNav_ = new ROSLIB.ServiceRequest({
              onezero: 1,
              map_file: this.selectedMap,
            });
            this.startNavSrv.callService(onNav_, function (result) {
              console.log("navClick(1076):", result);
            });
            this.$store.commit("setIsNavRunning", true);
          }
        }
      }
    },
    
    useMap() {
      if(this.mapSelected.length !== 0)
      {
        console.log("Use map : ", this.mapSelected[0].name);
        this.selectedMap = this.mapSelected[0].name;
        this.onRowMapSelected();
        console.log(this.selectedMap);
        this.$store.commit("setSelectedMapName", this.selectedMap);
      }
      
    },
    deleteMap(){
      if(this.mapSelected.length !== 0){
        console.log(this.mapSelected[0].name);
        //this.$emit("mapDelete", this.selected[0])
        this.deleteAMap(this.mapSelected[0].name);
        var index = this.mapNames.indexOf(this.mapSelected[0]);
        //console.log(index)
        this.mapNames.splice(index,1);
        this.mapSelected.pop();
        
        //this.dialog = false;
      }
    },
    checkWaypointDuplicate(val) {
      return val.name == this.newWaypointName;
    },
    addWaypoint() {
      if (this.newWaypointName !== "") {
        const result = this.waypoints.find(this.checkWaypointDuplicate);
        console.log(result);
        if (result == undefined) {
          this.waypoints.push({ name: this.newWaypointName });
          console.log("Save Waypoint");

          this.newWaypointName = "";
          // this.dialog = false;
        } else {
          alert("Existing waypoint name.");
        }
      }
    },    
    deleteWaypoint() {
      if (this.waypointSelected.length !== 0) {
        console.log(this.waypointSelected[0].name);
        
        //  add deleteWaypoint function here
        this.deleteAWaypoint(this.mapSelected[0].name, this.waypointSelected[0].name);

        var index = this.wayPoints.indexOf(this.waypointSelected[0]);
        //console.log(index)
        this.wayPoints.splice(index, 1);
        this.waypointSelected.pop();
        // this.dialog = false;
      }
    },
    
  },

  computed:{
    ...mapGetters(["getRbServer", "getServerConnected", "getIsSlamRunning", "getIsNavRunning", "getSelectedMapName", "getSelectedWayPoint"]),
    // rosConnected: function(){
    //   if(this.$store.state.serverConnected ===true){
    //     return "Disconnect";
    //   }else{
    //     return "Connect";
    //   }
    // },
  }
};
</script>
