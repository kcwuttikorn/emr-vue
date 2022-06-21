<template>
  <div class="home">
    <v-container fluid class="blue pa-2">
      <!-- <h1 class="subheading grey--text">SLAM</h1> -->
      <v-row no-gutters>
        <v-col cols="8">
          <v-layout column align-start>
            <v-card
              fluid
              height="70px"
              width="860px"
              class="yellow lighten-5 pa-2 ma-2"
            >
              <v-layout>
                <v-flex xs12 md4>
                  <div class="caption yellow--text mx-7">.</div>
                  <div class="purple--text mx-1">Position:</div>
                  <!-- <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div> -->
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">X:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Y:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Z:</div>
                  <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>

                <v-flex xs12 md4>
                  <div class="caption yellow--text mx-7">.</div>
                  <div class="blue--text mx-1">Orientation:</div>
                  <!-- <div class="purple--text grey lighten-2 mx-1 px-2">0.001</div> -->
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">X:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Y:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">Z:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="caption grey--text mx-7">W:</div>
                  <div class="blue--text grey lighten-2 mx-1 px-2">0.001</div>
                </v-flex>
              </v-layout>
            </v-card>

            <v-card
              height="600px"
              width="860px"
              class="yellow lighten-5 pa-2 ma-2"
              outlined
            >
            </v-card>
          </v-layout>
        </v-col>

        <v-col cols="4">
          <!-- <v-container fluid > -->
          <v-layout column align-start>
            <v-card
              height="170x"
              width="435px"
              class="grey lighten-5 ma-2 pa-2"
            >
              <v-row dense>
                <v-col cols="4" class="d-flex justify-center"></v-col>
                <v-col cols="4" class="d-flex justify-center">
                  <v-btn color="primary" large outlined>
                    <!-- <span>TR</span>      -->
                    <v-icon large>mdi-arrow-up-bold-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-center"></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="4" class="d-flex justify-end">
                  <v-btn color="primary" large outlined>
                    <v-icon large>mdi-arrow-left-bold-outline</v-icon>
                    <!-- <span>TL</span>  -->
                  </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-center">
                  <v-btn color="primary" large outlined>
                    <v-icon large>mdi-stop</v-icon>
                    <!-- <span>TL</span>  -->
                  </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-start">
                  <v-btn color="primary" large outlined>
                    <!-- <span>TR</span>      -->
                    <v-icon large>mdi-arrow-right-bold-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="4" class="d-flex justify-center"></v-col>
                <v-col cols="4" class="d-flex justify-center">
                  <v-btn color="primary" large outlined>
                    <!-- <span>TR</span>      -->
                    <v-icon large>mdi-arrow-down-bold-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-center"></v-col>
              </v-row>

              <!-- <v-btn color="primary" elevation="2" fab outlined></v-btn>
                  <v-btn color="primary" elevation="2" fab outlined></v-btn>
                  <v-btn color="primary" elevation="2" fab outlined></v-btn> -->

              <!-- <v-btn text color="white-grey">
                    <span>Connect</span>
                    <v-icon right>mdi-exit-to-app</v-icon>
                  </v-btn> -->
            </v-card>

            <v-card class="grey lighten-5 ma-2 pa-2">
              <v-flex>
              <v-data-table
                :headers="headers"
                :items="maps"
                sort-by="Maps"
                class="elevation-1"
                fixed-header
                height="365px"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Slam-Map</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New Item
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="Map name"
                                ></v-text-field>                                
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date"
                                      label="Create Map Date:"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    @input="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
              </v-flex>
            </v-card>
          </v-layout>

          <!-- <v-layout column align-start>
            <v-flex>
              <v-data-table
                :headers="headers"
                :items="maps"
                sort-by="Maps"
                class="elevation-1"
                fixed-header
                height="380px"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Slam-Map</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New Item
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="Map name"
                                ></v-text-field>                                
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date"
                                      label="Create Map Date:"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    @input="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout> -->
          <!-- </v-container> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import HelloWorld from '../components/HelloWorld'
import axios from "axios";
const baseURL = "http://localhost:3001/maps";

export default {
  name: "slam",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Maps",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    // desserts: [],
    maps: [],
    editedIndex: -1,

    editedItem: {
      id: null,
      name: "",
      date: ""
    },
    defaultItem: {
      id: null,
      name: "",
      date: ""
    },
    mapForm: {
      id: null,
      name: "",
      date: ""
    },
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // menu: false,
      // modal: false,
    menu2: false,
  }),
  async created(){
    try{
      const res = await axios.get(baseURL);
      this.maps = res.data;
      //console.log(res.data)
    } catch(e){
      console.log(e);
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // created() {
  //   this.initialize();
  // },

  methods: {
    initialize() {
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
        {
          name: "Nectec Floor 5th",

        },


      ];
    },
    async addMap(mapForm){
      try{
        const res = await axios.post(baseURL, mapForm);
        this.maps = [...this.maps, res.data];
        //console.log(this.map);
      }catch(e){
        console.log(e);
      }
    },
    
    editItem(item) {
      this.editedIndex = this.maps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.maps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      
      axios.delete(`${baseURL}/${this.editedItem.id}`);
      this.maps.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

//return this.editedIndex === -1 ? "New Item" : "Edit Item";
    
    save() {
      if (this.editedIndex > -1) {   
        Object.assign(this.maps[this.editedIndex], this.editedItem);

        try{
          axios.patch(`${baseURL}/${this.editedItem.id}`,{
          name: this.editedItem.name,
          date: this.date
          });
        }catch(e){
          console.error(e);
        }
 
        //editMap(this.editedIndex);
        //editMapName(this.mapForm)
        

      } else {

       // this.editedItem.date = this.date;
        //this.maps.push(this.editedItem);

        this.mapForm.name = this.editedItem.name;
        this.mapForm.date = this.date;
        
        this.addMap(this.mapForm);

        //console.log(this.editedItem);
        
        //this.mapForm.name = this.editedItem.name;
        //this.mapForm.date = this.editedItem.date;
        //this.addMap(this.mapForm);
      }
      this.close();
    },
  },
};
</script>
