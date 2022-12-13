<template>
  <div class="home">
    <v-container fluid ma-0 pa-0 fill-height class="blue">
      <!-- <v-row class="yellow lighten-5" > -->
      <v-layout>
        <v-col cols="7">
          <v-card fluid class="yellow lighten-5 pa-1 d-flex justify-center">
            <!-- <v-row no-gutters class="d-flex justify-center pa-1"> -->
            <!-- <div>
              <p>window width: {{ windowWidth }}</p>
              <p>window height: {{ windowHeight }}</p>
            </div> -->

            <div id="map3d"></div>

            <!-- </v-row>           -->
          </v-card>

          <v-card class="yellow lighten-5 pa-1 my-1 d-flex justify-center">
            <v-row>
              <v-col cols="2" class="d-flex justify-center">
                <div class="purple--text pa-1">Position:</div>
              </v-col>

              <v-col cols="4">
                <div class="purple--text pa-1">
                  X:
                  <span class="purple--text grey lighten-2 pa-1">0.001</span>
                  Y:
                  <span class="purple--text grey lighten-2 pa-1">0.002</span>
                </div>
              </v-col>

              <v-col cols="2" class="d-flex justify-center">
                <div class="blue--text pa-1">Orientation:</div>
              </v-col>

              <v-col cols="4">
                <div class="blue--text pa-1">
                  Z:
                  <span class="blue--text grey lighten-2 pa-1">0.001</span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card
            fluid
            fill-height
            height="680px"
            class="yellow lighten-5 pa-1"
          >
            <!-- <v-divider color="orange"></v-divider> -->

            <v-row no-gutters class="d-flex justify-start">
              <span class="font-weight-light pa-1 purple--text">
                Use Map : {{ this.selectedMap }}</span
              >
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="light-blue"
              center-active
              dark
              outlined
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab>Map</v-tab>
              <v-tab>Way Point</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <!-- <v-card-text class="text-subtitle-1 font-weight-bold"
                  >Map:</v-card-text
                > -->
                <v-card>
                  <!-- <v-card-title>
                    <span class="text-h6">Map Name:</span>
                  </v-card-title> -->
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-data-table
                          v-model="selected"
                          :headers="headers"
                          :items="mapNames"
                          :single-select="singleSelect"
                          item-key="name"
                          show-select
                          class="elevation-1"
                          fixed-header
                          height="150"
                        >
                          <template v-slot:top>
                            <v-switch
                              
                              v-model="singleSelect"
                              label="Single select"
                              class="pa-3"
                            ></v-switch>
                          </template>
                        </v-data-table>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                              v-model="newMapName"
                              label="New map name"
                              ref="inputRef"
                              required
                            >
                            </v-text-field>
                          </v-form>
                        </v-col>

                        <!-- <v-col cols="4">                          
                          <v-card-actions>
                            <v-btn
                              color="blue darken-1"
                              outlined
                              @click="saveMap"
                              small
                            >
                              <v-icon>mdi-content-save-settings</v-icon>
                              <span>Save</span>
                            </v-btn>
                          </v-card-actions>
                        </v-col> -->
                      </v-row>
                    </v-container>
                    <!-- <small>*indicates required field</small> -->
                  </v-card-text>

                  <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" outlined @click="saveMap" small>
                      <v-icon>mdi-content-save-settings</v-icon>
                      <span>Save</span>
                    </v-btn>
                    <v-btn color="green darken-1" outlined @click="useMap" small>
                      <v-icon>mdi-file-download</v-icon>
                      <span>Use</span>
                    </v-btn>
                    <v-btn color="red darken-1" outlined @click="deleteMap" small>
                      <v-icon>mdi-trash-can-outline</v-icon>
                      <span>Delete</span>
                    </v-btn>
                    <!-- <v-btn
                      color="black darken-1"
                      outlined
                      @click="dialog = false"
                      small
                    >
                      <v-icon right>mdi-exit-to-app</v-icon>
                      <span>Close</span>
                    </v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card-text class="text-subtitle-1 font-weight-bold"
                  >Waypoint:</v-card-text
                >
              </v-tab-item>
            </v-tabs-items>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="d-flex justify-center">
              <v-col cols="4" class="pa-3 ma-3">
                <RMap
                  @mapSave="saveMap"
                  @mapDelete="deleteAMap"
                  @mapUse="useMap"
                  :mapNames="mapNames"
                />
              </v-col>
              <v-col cols="4" class="pa-3 ma-3"> <RWaypoint /> </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="2">
          <v-card
            fluid
            class="yellow lighten-5 pa-1"
            fill-height
            height="680px"
          >
            <v-row no-gutters class="d-flex justify-center">
              <v-btn
                x-large
                text
                color="red"
                v-if="connected"
                @click="disconnect"
              >
                <span>Disconnect</span>
                <v-icon right>mdi-exit-to-app</v-icon>
              </v-btn>

              <v-btn x-large text color="green" v-else @click="connect">
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

            <v-row
              no-gutters
              align="center"
              justify="center"
              class="d-flex justify-center"
            >
              <v-btn-toggle v-model="toggle_mode" mandatory class="pa-2">
                <v-btn large elevation="2" color="primary" @click="slamClick"
                  >SLAM
                </v-btn>
                <v-btn large elevation="2" color="success" @click="navClick"
                  >Navigation
                </v-btn>
              </v-btn-toggle>
              <p>{{ toggle_mode }}</p>
            </v-row>

            <v-divider color="orange"></v-divider>

            <v-row no-gutters class="pa-2">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn block elevation="2" color="red" width="100px">
                  <v-icon>mdi-plus-box</v-icon>
                  Pose estimate
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="pa-2">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn block elevation="2" color="green" width="100px">
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Navigate
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="pa-2">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn block elevation="2" color="blue" width="100px">
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Manual Control
                </v-btn>
              </v-col>
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
import RMap from "../components/RMap.vue";
import RWaypoint from "../components/RWaypoint.vue";
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

import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
import nipplesjs from "nipplejs";

export default {
  name: "Home",
  data() {
    return {
      tab: null,
      emrModeSwitch: false,
      emrModeName: "SLAM",
      //toggle_exclusive: undefined,
      toggle_mode: undefined,
      toggle_map: undefined,
      toggle_waypoint: undefined,
      //ws_addr: "ws://192.168.1.54:9090",     // Pi4 at home

      //ws_addr: "ws://10.222.41.248:9090",  // Pi4 Ros-Noetic at  work

      ws_addr: "ws://10.222.41.159:9090", // Intel NUC
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
      g_pose: null,

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


      //-----  For map table --------
      valid: true,
      newMapName: "",
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: "Map Name",
          align: "center",
          sortable: false,
          value: "name",
        },
      ],
      // names: [
      //   {
      //     name: "Frozen Yogurt",
      //   },
      //   {
      //     name: "Ice cream sandwich",
      //   },   

      // ],
      map:{
        name:'',
      },

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
    RMap,
    RWaypoint,
  },
  mounted() {
    //this.$store.state.modeName = 'Slam Mode';
    //this.$store.dispatch("actionModeName", "Slam Mode");

    //--------------  For virtual Joy Stick Start --------------------

    var option = {
      zone: document.getElementById("zone_joystick"),
      mode: "static",
      position: { left: "50%", top: "86%" },
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
        var max_linear = 1.0; //5.0; // m/s
        var max_angular = 1.0; //2.0; // rad/s
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

    //--------------- For Virtual Joy Stick End -------------------
  },

  methods: {
    connect: function () {
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
        //this.log = "Connection to websocket server closed";
        console.log("Connection to websocket server closed.");
      });

      window.addEventListener("resize", () => {
        this.colWidth = window.innerWidth;
        console.log("386 : col width: ", this.colWidth);
      });

      this.viewer3d = new Viewer({
        divID: "map3d",
        //width: 640,
        //height: 480,

        antialias: true,
      });
      //window.innerWidth
      this.viewer3d.resize(
        //window.innerWidth*3/4, window.innerHeight*0.8
        //  document.getElementById("map3d").offsetWidth * 0.96,
        //  ((document.getElementById("map3d").offsetWidth * 3) / 4) * 0.96
        (this.colWidth / 12) * 7 * 0.9,
        (this.colWidth / 12) * 7 * 0.75 * 0.9
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
      /*
      var move_base_status_listener = new ROSLIB.Topic({
        ros: this.rbServer,
        name: move_base_status,
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
*/

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
        serviceType: "agv_interface/poseesstimate",
      });

      this.setPoseSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/set_pose",
        serviceType: "agv_interface/poseesstimate",
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
        //  document.getElementById("map3d").offsetWidth * 0.96,
        // (document.getElementById("map3d").offsetWidth * 0.96 * 3) / 4
        (width / 12) * 7 * 0.9,
        (width / 12) * 7 * 0.75 * 0.9
      );
    },
    calIMU() {
      var param = new ROSLIB.ServiceRequest({});
      this.calIMUSrv.callService(param, function (result) {
        console.log(result);
      });
    },
    saveMap() {
      console.log(item);
      if( this.newMapName !=="")
      {
        const result = this.mapNames.find(this.checkDuplicate);
        if(result == undefined)
        {
          //this.names.push({name:this.newMapName});      
          this.mapNames.push({name:this.newMapName});      
          console.log('Save Map');
          //console.log(this.newMapName);
          //this.$emit("mapSave", {name: this.newMapName});
          this.newMapName = item.name;
          var mapName_ = new ROSLIB.ServiceRequest({
            mapfile: this.newMapName,
          });

          console.log(this.newMapName);
          console.log(mapName_);
          this.saveMapSrv.callService(mapName_, function (result) {
            console.log(result);
          });

          this.newMapName = "";
          // this.dialog = false;
        }
        else
        {
          alert('Existing map name.')
        }

      }



      // this.newMapName = item.name;
      // var mapName_ = new ROSLIB.ServiceRequest({
      //   mapfile: this.newMapName,
      // });

      // console.log(this.newMapName);
      // console.log(mapName_);
      // this.saveMapSrv.callService(mapName_, function (result) {
      //   console.log(result);
      // });
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
          console.log(result);
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
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
                this.isWaypointAvaliable = false;
              } else {
                this.isWaypointAvaliable = true;
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
            }.bind(this)
          );
          var getwaypointparam2 = new ROSLIB.ServiceRequest({
            name: this.selectedMap,
          });
          this.getWayPoints.callService(getwaypointparam2, function (result) {
            console.log(result);
          });
        }.bind(this)
      );
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
        this.showPoseMarkerSrv.callService(this.onMarker, function (result) {
          console.log(result);
        });
      } else {
        this.showPoseMarkerSrv.callService(this.offMarker, function (result) {
          console.log(result);
        });
      }
      console.log(this.isPose);
    },
    updateWaypoint() {
      if (this.isWaypoint == true) {
        this.showNavMarkerSrv.callService(this.onMarker, function (result) {
          console.log(result);
        });
      } else {
        this.showNavMarkerSrv.callService(this.offMarker, function (result) {
          console.log(result);
        });
      }
      console.log(this.isWaypoint);
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
      this.selectedMap = item.name;

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
    deleteAWaypoint() {
      console.log("Delete waypoint");
      var delWaypointParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMap,
        waypoint: this.selectedWayPoint,
      });
      this.deleteWaypoint.callService(
        delWaypointParam,
        function (result) {
          var getwaypointparam = new ROSLIB.ServiceRequest({
            mapname: this.selectedMap,
          });
          console.log(result);
          this.getWaypointName.callService(
            getwaypointparam,
            function (result) {
              console.log(result);
              var dataSet = [];
              while (this.wayPoints.length > 0) {
                this.wayPoints.pop();
              }
              //g_waypoints.push(['none', 'NONE'])
              if (result.length == 0) {
                this.isWaypointAvaliable = false;
              } else {
                this.isWaypointAvaliable = true;
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
    onRowMapSelected(items) {
      if (items.length > 0) {
        this.selectedMap = items[0].name;
        this.$store.commit("setSelectedMapName", this.selectedMap);
        console.log(this.selectedMap);
        var getwaypointparam = new ROSLIB.ServiceRequest({
          mapname: this.selectedMap,
        });
        this.getWaypointName.callService(
          getwaypointparam,
          function (result) {
            //console.log(result);
            while (this.wayPoints.length > 0) {
              this.wayPoints.pop();
            }
            //g_waypoints.push(['none', 'NONE'])
            if (result.length == 0) {
              this.isWaypointAvaliable = false;
            } else {
              this.isWaypointAvaliable = true;
            }
            result.waypointname.forEach((fn) => {
              var item = {
                name: fn,
              };
              this.wayPoints.push(item);
            });
          }.bind(this)
        );
        console.log("Call getwaypoins");
        var getwaypointparam2 = new ROSLIB.ServiceRequest({
          name: this.selectedMap,
        });
        console.log(getwaypointparam2);
        this.getWayPointsSrv.callService(getwaypointparam2, function (result) {
          console.log("Get resulte");
          console.log(result);
        });
      }
    },
    onRowWayPointSelected(items) {
      if (items.length > 0) {
        this.selectedWayPoint = items[0].name;
        this.$store.commit("setSelectedWayPoint", this.selectedWayPoint);
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
      }
    },

    slamClick() {
      if (this.emrModeName == "SLAM") {
        this.emrModeName = "";
        this.isSLAM = false;
        this.isNav = false;
        this.toggle_mode = undefined;

        if (this.isSlam == false) {
          this.startSLAMSrv.callService(this.offSlamSrvReq, function (result) {
            console.log(result);
          });
        }
      } else {
        this.emrModeName = "SLAM";
        this.isSLAM = true;
        this.isNav = false;

        // off navigation mode first
        if (this.isNav == false) {
          this.startNavSrv.callService(this.offNavSrvReq, function (result) {
            console.log(result);
          });
        }
        //--------------------------
        if (this.isSLAM == true) {
          this.startSLAMSrv.callService(this.onSlamSrvReq, function (result) {
            console.log(result);
          });
          //this.$store.commit("setIsSlamRunning", true);
        }
      }
    },
    navClick() {
      if (this.emrModeName == "Navigation") {
        this.emrModeName = "";
        this.toggle_mode = undefined;
        this.isSLAM = false;
        this.isNav = false;

        // off navigation mode first
        if (this.isNav == false) {
          this.startNavSrv.callService(this.offNavSrvReq, function (result) {
            console.log(result);
          });
        }
      } else {
        this.emrModeName = "Navigation";
        this.isSLAM = false;
        this.isNav = true;

        // off slam mode first
        if (this.isSlam == false) {
          this.startSLAMSrv.callService(this.offSlamSrvReq, function (result) {
            console.log(result);
          });
        }
        //-----------------------

        if (this.isNav == true) {
          if (this.selectedMap == "") {
            this.$alert("Choose a map first");
            this.isNav = false;
            console.log("After dialog");
            console.log(this.isNav);
          } else {
            this.startNavSrv.callService(this.onNavSrvReq, function (result) {
              console.log(result);
            });
            //this.$store.commit("setIsNavRunning", true);
          }
        }
      }
    },
    useMap(item) {
      console.log("Use map");
      console.log(item);
      this.selectedMap = item.name;

      console.log(this.selectedMap);
    },
    checkDuplicate(val)
    {
      return val.name == this.newMapName;
    },
    // mapSaveClick() {
    //   console.log("Save map");
    // },
    // mapLoadClick() {
    //   console.log("Load map");
    // },
    // mapDeleteClick() {
    //   console.log("Delete map");
    // },
    // waypointAddClick() {
    //   console.log("Add waypoint");
    // },
    // waypointDeleteClick() {
    //   console.log("Delete waypoint");
    // },
  },
};
</script>
