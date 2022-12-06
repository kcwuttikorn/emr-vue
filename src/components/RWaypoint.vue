<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="warning" outlined dark v-bind="attrs" v-on="on">
          Way point
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Waypoint Name:</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="names"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
                fixed-header
                height="200"
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

            <v-row class="d-flex justify-start pa-2 ma-3">
              <p>{{ selected }}</p>
            </v-row>
            

            <!-- <v-row no-gutters class="d-flex justify-start pa-2 ma-3">
              <div class="purple--text pa-1">Position:</div>
              <div class="purple--text pa-1">
                X:
                <span class="purple--text grey lighten-2 pa-1">0.001</span>
              </div>

              <div class="purple--text pa-1">
                Y:
                <span class="purple--text grey lighten-2 pa-1">0.002</span>
              </div>

              <div class="blue--text pa-1">Orientation:</div>
              <div class="blue--text pa-1">
                Z:
                <span class="blue--text grey lighten-2 pa-1">0.001</span>
              </div>
            </v-row> -->

            <v-row>
              <v-col cols="9">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="newWaypoint"
                    label="New waypoint"
                    required
                  >
                  </v-text-field>
                </v-form>
              </v-col>

              <v-col cols="3">           
                <v-card-actions>
                  <v-btn color="blue darken-1" outlined @click="addWaypoint">
                    <v-icon>mdi-plus-box</v-icon>
                    <span>Add</span>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" outlined @click="dialog = false">
            <v-icon>mdi-file-download</v-icon>
            <span>Use</span>
          </v-btn>

          <v-btn color="red darken-1" outlined @click="deleteWaypoint">
            <v-icon>mdi-trash-can-outline</v-icon>
            <span>Delete</span>
          </v-btn>
          <v-btn color="black darken-1" outlined @click="dialog = false">
            <v-icon right>mdi-exit-to-app</v-icon>
            <span>Close</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "RWaypoint",
  data: () => ({
    dialog: false, // v-modal for dialog
    valid: true,
    newWaypoint: "",
    singleSelect: true,
    selected: [],
    headers: [
      {
        text: "Way Point Name",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "Pose X",
        align: "center",
        sortable: false,
        value: "poseX",
      },
      {
        text: "Pose Y",
        align: "center",
        sortable: false,
        value: "poseY",
      },
      {
        text: "Orientation Z",
        align: "center",
        sortable: false,
        value: "OrientZ",
      },
    ],
    names: [
      {
        name: "w1",
      },
      {
        name: "w2",
      },
      {
        name: "w3",
      },
      {
        name: "w4",
      },
    ],
  }),
  computed:{
   
  },

  methods: {
    getMapName(item){
      return item.name;
    },
    addWaypoint() {
      if (this.newWaypoint !== "") {
        const result = this.names.find(this.checkDuplicate);
        console.log(result);
        if (result == undefined) {
          this.names.push({ name: this.newWaypoint });
          console.log("Save Waypoint");

          this.newWaypoint = "";
          this.dialog = false;
        } else {
          alert("Existing waypoint name.");
        }
      }
    },
    checkDuplicate(val) {
      return val.name == this.newWaypoint;
    },
    deleteWaypoint() {
      if (this.selected.length !== 0) {
        console.log(this.selected[0].name);
        var index = this.names.indexOf(this.selected[0]);
        //console.log(index)
        this.names.splice(index, 1);
        this.selected.pop();
        this.dialog = false;
      }
    },
   
  },
  
};
</script>
