<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" outlined dark v-bind="attrs" v-on="on"> Map </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Map Name:</span>
        </v-card-title>
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
                height="200"
                
                hide-default-footer
                
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
              <v-col cols="9">
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

              <v-col cols="3">
                <!-- <v-btn
                    :disabled="false"
                    color="success"
                    class="mr-4"
                    @click="saveMap"
                  >
                    Save
                  </v-btn> -->
                <v-card-actions>
                  <v-btn color="blue darken-1" outlined @click="saveMap">
                    <v-icon>mdi-content-save-settings</v-icon>
                    <span>Save</span>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>          
          <v-btn color="green darken-1" outlined @click="useMap">
            <v-icon>mdi-file-download</v-icon>
            <span>Use</span>
          </v-btn>
          <v-btn color="red darken-1" outlined @click="deleteMap">
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
  name: "RMap",
  data: () => ({
    dialog: false, // v-modal for dialog
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
        width :"400px"
      },
    ],
    names: [
      {
        name: "Frozen Yogurt",
      },
      {
        name: "Ice cream sandwich",
      },   

    ],
    map:{
      name:'',
    },
  }),
  props:[
    "mapNames"
  ],

  methods:{
    saveMap(){ 
      if( this.newMapName !=="")
      {
        const result = this.mapNames.find(this.checkDuplicate);
        if(result == undefined)
        {
          //this.names.push({name:this.newMapName});      
          this.mapNames.push({name:this.newMapName});      
          console.log('Save Map');
          //console.log(this.newMapName);
          this.$emit("mapSave", {name: this.newMapName});
          this.newMapName = "";
          this.dialog = false;
        }
        else
        {
          alert('Existing map name.')
        }

      }
      
    },
    checkDuplicate(val)
    {
      return val.name == this.newMapName;
    },
    deleteMap()
    {
      if(this.selected.length !== 0)
      {
        console.log(this.selected[0].name)
        this.$emit("mapDelete", this.selected[0])
        var index = this.names.indexOf(this.selected[0])
        //console.log(index)
        this.names.splice(index,1)
        this.selected.pop()
        
        this.dialog = false;
      }
    },
    useMap()
    {
      if(this.selected.length !== 0)
      {
        console.log(this.selected[0].name)
        this.$emit("mapUse", this.selected[0])
        //var index = this.names.indexOf(this.selected[0])
        //console.log(index)
        //this.names.splice(index,1)
        //this.selected.pop()
        
        this.dialog = false;
      }

    }

    
  }
};
</script>
