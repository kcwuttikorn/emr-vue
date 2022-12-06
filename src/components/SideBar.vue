<template>
  <div class="sidebar">
    <v-container fluid>
      <v-row class="blue-grey lighten-5">
        <!--Maps & Waypoint -->
        <v-col cols="12">
          <v-tabs v-model="tab" fixed-tabs background-color="warning" dark>
            <v-tabs-slider color="green"></v-tabs-slider>
            <v-tab> Map </v-tab>
            <v-tab> Way point </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <!-- Maps-->
              <!-- <p>{{selectedItem}}</p> -->
              <v-card flat outlined class="pa-1">
                <!-- <v-card-text class="text-subtitle-1 font-weight-bold">
                  {{"Active Map:"}}
                  &nbsp; &nbsp; &nbsp;
                  <span>Floor 1st</span>
                </v-card-text> -->

                <v-data-table                  
                  :headers="headers1"
                  :items="maps"
                  sort-by="Maps"
                  class="elevation-1"

                  fixed-header
                  height="400px"
                  dense

                  hide-default-footer
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Maps:</v-toolbar-title>
                      <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialogMap" max-width="400px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark                            
                            v-bind="attrs"
                            v-on="on"
                            small
                          >
                            Save map
                          </v-btn>
                          
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">{{ mapformTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="8" md="6">
                                  <v-text-field
                                    v-model="editedMap.name"
                                    label="Map name"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeMap">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="saveMap">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="dialogMapDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h5"
                            >Are you sure you want to delete this
                            item?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeMapDelete"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="deleteMapConfirm"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editMap(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteMap(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initializeMap"> Reset </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Way points-->
              <v-card flat outlined class="pa-1">
                <!-- <v-card-text class="text-subtitle-1 font-weight-bold">
                  {{"Project Details:"}}
                </v-card-text> -->
                <v-data-table                  
                  :headers="headers2"
                  :items="waypoints"
                  sort-by="Way Point Name"
                  class="elevation-1"

                  fixed-header
                  height="400px"
                  dense
                  hide-default-footer
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Way Points:</v-toolbar-title>
                      <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialogWaypoint" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            
                            v-bind="attrs"
                            v-on="on"
                            small
                          >
                            New waypoint
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">New Waypoint</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.name"
                                    label="Name:"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.posx"
                                    label="Pose:X"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.posy"
                                    label="Pose:Y"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.posz"
                                    label="Pose:Z"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.orix"
                                    label="Orientation:X"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedWaypoint.oriy"
                                    label="Orientation:Y"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field 
                                    v-model="editedWaypoint.oriz"
                                    label="Orientation:Z"                                    
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field disabled
                                    v-model="editedWaypoint.oriw"
                                    label="Orientation:W"
                                  ></v-text-field>
                                </v-col>
                                
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeWayPoint">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="saveWayPoint">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="dialogWaypointDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h5"
                            >Are you sure you want to delete this
                            item?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeWayPointDelete"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="deleteWayPointConfirm"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editWaypoint(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteWaypoint(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initializeWaypoint"> Reset </v-btn>
                  </template>
              </v-data-table>
              </v-card>
              
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>

      <v-row>
        <!--Virtual Joystick  -->
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {
      //selectedItem: null,
      tab: null,
      dialogMap: false,
      dialogWaypoint: false,
      dialogMapDelete: false,
      dialogWaypointDelete: false,
      headers1: [
        {
          text: "Map Name",
          align: "start",
          sortable: false,
          value: "name",
        },        
        { text: "Actions", value: "actions", sortable: false },
      ],
       headers2: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },    
        { text: "Pos:X", value: "posx", sortable: false },
        { text: "Pos:Y", value: "posy", sortable: false },        
        { text: "Ori:Z", value: "oriz", sortable: false },        
        { text: "Actions", value: "actions", sortable: false },
        
      ],
      //desserts: [],
      maps: [],
      waypoints: [],
      editedMapIndex: -1,
      editedWaypointIndex: -1,
      editedMap: {
        id: null,
        name: "",
      },
      editedWaypoint: {
        id: null,
        name: "",
        posx: null,
        posy: null,        
        oriz: null,

      },
      defaultMap: {
        id: null,
        name: "",
      },
      defaultWaypoint: {
        id: null,
        name: "",
      },
    };
  },
  computed: {
    mapformTitle() {
      return 
        this.editedMapIndex === -1 ? "New Map" : "Edit Map";
    },
    waypointformTitle() {
      return 
        this.editedMapIndex === -1 ? "New Waypoint" : "Edit Waypoint";
    },
  },

  watch: {
    dialogMap(val) {
      val || this.closeMap();
    },
    dialogMapDelete(val) {
      val || this.closeMapDelete();
    },
    dialogWaypoint(val) {
      val || this.closeWayPoint();
    },
    dialogWaypointDelete(val) {
      val || this.closeWayPointDelete();
    },
  },

  created() {
    this.initializeMap();
    this.initializeWaypoint();
  },

  methods: {
    initializeMap() {
      this.maps = [
        {
          name: "Nectec Floor 1st",          
        },
        {
          name: "Nectec Floor 2nd",          
        },
        {
          name: "Nectec Floor 3rd",          
        },
        {
          name: "Nectec Floor 4th",          
        },
        
        
      ];
    },
    initializeWaypoint() {
      this.waypoints = [
        {
          name: "Waypoint 1",          
        },
        {
          name: "Waypoint 2",          
        },
        {
          name: "Waypoint 3",          
        },
        {
          name: "Waypoint 4",          
        }, 
      ];
    },

    editMap(item) {
      console.log(item)
      this.editedMapIndex = this.maps.indexOf(item);
      console.log(this.editedMapIndex)
      this.editedMap = Object.assign({}, item);
      console.log(this.editedMap)
      this.dialogMap = true;
    },
    editWaypoint(item) {
      this.editedWaypointIndex = this.waypoints.indexOf(item);
      this.editedWaypoint = Object.assign({}, item);
      this.dialogWaypoint = true;
    },

    deleteMap(item) {
      this.editedMapIndex = this.maps.indexOf(item);
      this.editedMap = Object.assign({}, item);
      this.dialogMapDelete = true;
    },
    deleteWaypoint(item) {
      this.editedWaypointIndex = this.waypoints.indexOf(item);
      this.editedWaypoint = Object.assign({}, item);
      this.dialogWaypointDelete = true;
    },

    deleteMapConfirm() {
      this.maps.splice(this.editedMapIndex, 1);
      this.closeMapDelete();
    },
    deleteWayPointConfirm() {
      this.waypoints.splice(this.editedWaypointIndex, 1);
      this.closeWayPointDelete();
    },

    closeMap() {
      this.dialogMap = false;
      this.$nextTick(() => {
        this.editedMap = Object.assign({}, this.defaultMap);
        this.editedMapIndex = -1;
      });
    },
    closeWayPoint() {
      this.dialogWaypoint = false;
      this.$nextTick(() => {
        this.editedWaypoint = Object.assign({}, this.defaultWaypoint);
        this.editedWaypointIndex = -1;
      });
    },

    closeMapDelete() {
      this.dialogMapDelete = false;
      this.$nextTick(() => {
        this.editedMap = Object.assign({}, this.defaultMap);
        this.editedMapIndex = -1;
      });
    },
    closeWayPointDelete() {
      this.dialogWaypointDelete = false;
      this.$nextTick(() => {
        this.editedWaypoint = Object.assign({}, this.defaultWaypoint);
        this.editedWaypointIndex = -1;
      });
    },

    saveMap() {
      if (this.editedMapIndex > -1) {
        Object.assign(this.maps[this.editedMapIndex], this.editedMap);
      } else {
        this.maps.push(this.editedMap);
      }
      this.closeMap();
    },
    saveWayPoint() {
      if (this.editedWaypointIndex > -1) {
        Object.assign(this.waypoints[this.editedWaypointIndex], this.editedMap);
      } else {
        this.waypoints.push(this.editedWaypoint);
      }
      this.closeWayPoint();
    },
  },
};
</script>
