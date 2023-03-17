<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>

      <v-row no-gutters>
        <v-col cols="12">
          <v-card fluid class="yellow lighten-5 pa-1">  
              <v-btn 
                icon 
                
                class="ma-2"
                @click="dialog = false"                
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            
              <v-btn
                color="primary"
                elevation="2"
                id="run_blockly"
                class="ma-2"
                @click="runBlock('run_file_name.tx')"
              >
                Run
              </v-btn>

              <v-btn
                color="success"
                elevation="2"
                data-toggle="modal"
                data-target="#saveBlockyModal"
                id="save_blockly"
                class="ma-2"
                @click="saveBlock('save_file_name.txt')"
              >
                Save
              </v-btn>

              <v-btn
                color="warning"
                elevation="2"
                data-toggle="modal"
                data-target="#loadBlockyModal"
                id="load_blockly"
                class="ma-2"
                @click="loadBlock('load_file_name.txt')"
              >
                Load
              </v-btn>
            
                       

            <!-- <v-spacer></v-spacer> -->
          </v-card>

          <v-card
            fluid
            class="cyan lighten-5 pa-2 ma-2"
            id="blocklyArea"
            height="75vh"
          >
            <div 
              id="blocklyDiv2" 
              ref="blocklyDiv2" 
              style="width: 100%; height: 100%; background-color: blue;"
            ></div>
            <xml id="toolbox" ref="toolbox" style="display: none" >
                
                <category name="Logic" colour="%{BKY_LOGIC_HUE}">
                  <block type="controls_if"></block>
                  <block type="logic_compare"></block>
                  <block type="logic_operation"></block>
                  <block type="logic_negate"></block>
                  <block type="logic_boolean"></block>
                  <block type="logic_null"></block>
                  <block type="logic_ternary"></block>
                </category>
                
                <category name="Loop" colour="%{BKY_LOOPS_HUE}">
                  <block type="controls_repeat_ext">
                    <value name="TIMES">
                      <shadow type="math_number">
                        <field name="NUM">10</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="controls_whileUntil"></block>
                  <block type="controls_for">
                    <value name="FROM">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="TO">
                      <shadow type="math_number">
                        <field name="NUM">10</field>
                      </shadow>
                    </value>
                    <value name="BY">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="controls_forEach"></block>
                  <block type="controls_flow_statements"></block>
                </category>
                
                <category name="Math" colour="%{BKY_MATH_HUE}">
                  <block type="math_number">
                    <field name="NUM">123</field>
                  </block>
                  <block type="math_arithmetic">
                    <value name="A">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="B">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_single">
                    <value name="NUM">
                      <shadow type="math_number">
                        <field name="NUM">9</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_trig">
                    <value name="NUM">
                      <shadow type="math_number">
                        <field name="NUM">45</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_constant"></block>
                  <block type="math_number_property">
                    <value name="NUMBER_TO_CHECK">
                      <shadow type="math_number">
                        <field name="NUM">0</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_round">
                    <value name="NUM">
                      <shadow type="math_number">
                        <field name="NUM">3.1</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_on_list"></block>
                  <block type="math_modulo">
                    <value name="DIVIDEND">
                      <shadow type="math_number">
                        <field name="NUM">64</field>
                      </shadow>
                    </value>
                    <value name="DIVISOR">
                      <shadow type="math_number">
                        <field name="NUM">10</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_constrain">
                    <value name="VALUE">
                      <shadow type="math_number">
                        <field name="NUM">50</field>
                      </shadow>
                    </value>
                    <value name="LOW">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="HIGH">
                      <shadow type="math_number">
                        <field name="NUM">100</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_random_int">
                    <value name="FROM">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="TO">
                      <shadow type="math_number">
                        <field name="NUM">100</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="math_random_float"></block>
                  <block type="math_atan2">
                    <value name="X">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                    <value name="Y">
                      <shadow type="math_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                  </block>
                </category>
                
                <category name="Text" colour="%{BKY_TEXTS_HUE}">
                  <block type="text"></block>
                  <block type="text_join"></block>
                  <block type="text_append">
                    <value name="TEXT">
                      <shadow type="text"></shadow>
                    </value>
                  </block>
                  <block type="text_length">
                    <value name="VALUE">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_isEmpty">
                    <value name="VALUE">
                      <shadow type="text">
                        <field name="TEXT"></field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_indexOf">
                    <value name="VALUE">
                      <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                      </block>
                    </value>
                    <value name="FIND">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_charAt">
                    <value name="VALUE">
                      <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="text_getSubstring">
                    <value name="STRING">
                      <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="text_changeCase">
                    <value name="TEXT">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_trim">
                    <value name="TEXT">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_print">
                    <value name="TEXT">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="text_prompt_ext">
                    <value name="TEXT">
                      <shadow type="text">
                        <field name="TEXT">abc</field>
                      </shadow>
                    </value>
                  </block>
                </category>
                
                <category name="List" colour="%{BKY_LISTS_HUE}">
                  <block type="lists_create_with">
                    <mutation items="0"></mutation>
                  </block>
                  <block type="lists_create_with"></block>
                  <block type="lists_repeat">
                    <value name="NUM">
                      <shadow type="math_number">
                        <field name="NUM">5</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="lists_length"></block>
                  <block type="lists_isEmpty"></block>
                  <block type="lists_indexOf">
                    <value name="VALUE">
                      <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="lists_getIndex">
                    <value name="VALUE">
                      <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="lists_setIndex">
                    <value name="LIST">
                      <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="lists_getSublist">
                    <value name="LIST">
                      <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                      </block>
                    </value>
                  </block>
                  <block type="lists_split">
                    <value name="DELIM">
                      <shadow type="text">
                        <field name="TEXT">,</field>
                      </shadow>
                    </value>
                  </block>
                  <block type="lists_sort"></block>
                </category>

                <sep></sep>

                <category
                  name="Variables"
                  colour="%{BKY_VARIABLES_HUE}"
                  custom="VARIABLE"
                ></category>
                
                <category
                  name="Functions"
                  colour="%{BKY_PROCEDURES_HUE}"
                  custom="PROCEDURE"
                ></category>

                <category name="EMR Control" colour="%{BKY_LISTS_HUE}">
                  <block type="emr_init"></block>
                  <block type="emr_move"></block>
                  <block type="emr_move_to"></block>
                  <block type="emr_wait_goal"></block>
                  <block type="wait"></block>
                  <block type="emr_door"></block>
                  <block type="emr_tray"></block>
                  <block type="rosloop"></block>
                  
                  <block type="button1"></block>
                </category>

              </xml>
          </v-card>
        </v-col>
      </v-row>

      
      <!-- <v-card> -->

      <!-- <v-toolbar dark color="primary lighten-1">
          <v-toolbar-items>

            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-file-download</v-icon>
              <span>Save</span>
            </v-btn>
            <v-toolbar-title>Save</v-toolbar-title>

            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-trash-can-outline</v-icon>
              <span>Load</span>
            </v-btn>
            <v-toolbar-title>Load</v-toolbar-title>

            <v-btn icon dark @click="dialog = false">
              <v-icon right>mdi-exit-to-app</v-icon>
              <span>Run</span>
            </v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>

          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>            
          </v-btn>
          <v-toolbar-title>Close</v-toolbar-title> 
        </v-toolbar> -->
      <!-- </v-card> -->
    </v-dialog>
  </v-row>
</template>




<script>
import Blockly from "blockly";
import ROSLIB from "roslib";
import BlocklyPython from "blockly/python";
import { mapGetters } from 'vuex';
export default {
  name: "Block",
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      rbServer: null,
      isServerConnected: false,
      selectedMapFile: "",
      selectedWaypointFile: "",
      mymessage:"",

      blockly_workspace: null,
      options: {
        //media: "../assets",
        horizontalLayout:false,
        toolboxPosition: "start",
        rtl: false,
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1,
        },
        scrollbars: true,
        toolbox: null,
        trashcan: true,
      },
      runBlockSrv: null,
      loadBlockSrv: null,
      saveBlockSrv:null,
    };
  },
  mounted() {
    this.$store.dispatch('actionModeName', 'Blockly');
    console.log("MOUNTED");

    this.options.toolbox = document.getElementById("toolbox");
    this.blockly_workspace = Blockly.inject(
      this.$refs["blocklyDiv2"],
      this.options
    );
    window.g_blockly_workspace = this.blockly_workspace;
    this.blockly_workspace.addChangeListener(this.myUpdateFunction);
    

    Blockly.Blocks['emr_init'] = {
        init: function() {
        this.appendDummyInput()
        .appendField("EMR node start");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        }
      };

    Blockly.Python['emr_init'] = function(block) {
        // TODO: Assemble Python into code variable.
        var code = "#!/usr/bin/env python3\n"+
                   "import rospy\n"+
                   "from std_msgs.msg import String\n"+
                   "import actionlib\n"+

                   "import json\n"+
                   "from tinydb import TinyDB, Query\n"+
                   "from rospy_message_converter import json_message_converter\n"+

                   "from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal\n"+
                   "rospy.init_node('blockly_control_node', anonymous=True)\n\n"+

                   "client = actionlib.SimpleActionClient('move_base',MoveBaseAction)\n"+
                   "client.wait_for_server()\n\n"+

                   "ublock_pub = rospy.Publisher('ublock', String, queue_size=10)\n\n"+
                   "goal = MoveBaseGoal()\n"+
                   "goal.target_pose.header.frame_id = 'map'\n"+
                   "goal.target_pose.header.stamp = rospy.Time.now()\n\n" ;

        return code;
      };


    Blockly.Blocks['emr_move'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Move to");
          this.appendDummyInput()
              // .appendField(new Blockly.FieldTextInput("map"), "map")
              .appendField(": x")
              .appendField(new Blockly.FieldNumber(0), "x")
              .appendField(", y")
              .appendField(new Blockly.FieldNumber(0), "y")
              .appendField(", w")
              .appendField(new Blockly.FieldNumber(1), "w");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      Blockly.Python['emr_move'] = function(block) {
        // var text_map = block.getFieldValue('map');
        var number_x = block.getFieldValue('x');
        var number_y = block.getFieldValue('y');
        var number_w = block.getFieldValue('w');
        // TODO: Assemble Python into code variable.

        var code = "goal.target_pose.pose.position.x = " + number_x +"\ngoal.target_pose.pose.position.y =" + number_y +"\ngoal.target_pose.pose.orientation.w = " + number_w +"\n\n";

        code = code + "client.send_goal(goal)\n"

           return code;
      };

      Blockly.Blocks['emr_wait_goal'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("wait for robot move to goal");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };

      Blockly.Python['emr_wait_goal'] = function(block) {
        // TODO: Assemble Python into code variable.
        var code = "wait = client.wait_for_result()\n\n" ;     
           return code;
      };


      Blockly.Blocks["wait"] = {
        init: function () {
          this.appendDummyInput()
          .appendField("wait (sleep)")
          .appendField(new Blockly.FieldNumber(1), "time")
          .appendField("sec");
          
          // this.appendValueInput("time").setCheck(null);
          // this.appendDummyInput().appendField("sec");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };

      Blockly.Python["wait"] = function (block) {
        var value_time = block.getFieldValue('time');
        // TODO: Assemble Python into code variable.
        var code = "rospy.sleep(" + value_time + ")\n";
        return code;
      };


    var waypointdata = this.$store.state.selectedWayPoint;
    Blockly.Blocks["emr_move_to"] = {
      init: function () {
         this.appendDummyInput()
        .appendField("Move to ")
        .appendField(new Blockly.FieldDropdown(this.generateOptions), 'emr_target');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },

      generateOptions: function () {
        var options = [];
        for (let key in waypointdata){
          options.push([waypointdata[key].name , key]); 
        }
        return options;
      }
    };

    Blockly.Python["emr_move_to"] = function (block) {
      var dropdown_emr_target = block.getFieldValue('emr_target');
      var code = "goal.target_pose.pose.position.x = " + waypointdata[dropdown_emr_target].pose.position.x
      +"\ngoal.target_pose.pose.position.y ="  + waypointdata[dropdown_emr_target].pose.position.y
      +"\ngoal.target_pose.pose.position.z ="  + waypointdata[dropdown_emr_target].pose.position.z
      +"\ngoal.target_pose.pose.orientation.x ="  + waypointdata[dropdown_emr_target].pose.orientation.x
      +"\ngoal.target_pose.pose.orientation.y ="  + waypointdata[dropdown_emr_target].pose.orientation.y
      +"\ngoal.target_pose.pose.orientation.z ="  + waypointdata[dropdown_emr_target].pose.orientation.z
      +"\ngoal.target_pose.pose.orientation.w ="  + waypointdata[dropdown_emr_target].pose.orientation.w
      +"\n";
      code = code + "client.send_goal(goal)\n"
      return code;
    };


    Blockly.Blocks["rosloop"] = {
        init: function () {
          this.appendDummyInput().appendField("ROS LOOP");
          this.appendStatementInput("input").setCheck(null);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };

    Blockly.Python["rosloop"] = function (block) {
      var statements_input = Blockly.Python.statementToCode(block, "input");
      // TODO: Assemble Python into code variable.
      var code = "while not rospy.is_shutdown():\n";
      code = code + statements_input;
      return code;
    };


    Blockly.Blocks['emr_door'] = {
        init: function() {
        this.appendDummyInput()
        .appendField("EMR door")
        .appendField(new Blockly.FieldDropdown(
          [["open","emr_door_open"], 
           ["close","emr_door_close"]]), 
          "emr_door");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        }
      };

    Blockly.Python['emr_door'] = function(block) {
      var dropdown_emr_door = block.getFieldValue('emr_door');
      // TODO: Assemble Python into code variable.
      var code = "ublock_pub.publish('" + dropdown_emr_door + "')\n";
      return code;
    };

    Blockly.Blocks['emr_tray'] = {
        init: function() {
        this.appendDummyInput()
        .appendField("EMR tray")
        .appendField(new Blockly.FieldDropdown(
          [["#1","emr_tray1"], 
           ["#2","emr_tray2"], 
           ["#3","emr_tray3"]]), 
          "emr_tray")
        .appendField(new Blockly.FieldDropdown(
          [["out","_out"], 
           ["in","_in"]]), 
          "action");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        }
      };

    Blockly.Python['emr_tray'] = function(block) {
      var dropdown_emr_tray = block.getFieldValue('emr_tray');
      var dropdown_action = block.getFieldValue('action');
      // TODO: Assemble Python into code variable.
      var code = "ublock_pub.publish('" + dropdown_emr_tray + dropdown_action + "')\n";
      return code;
      };



    
    Blockly.Blocks["button1"] = {
      init: function () {
        this.appendDummyInput().appendField("Button 1");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    };
    Blockly.Python["button1"] = function (block) {
      console.log(block);
      var code = "rospy.wait_for_message('/io1', String, timeout=None).data";
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    console.log("isServerConnected : ", this.isServerConnected)
    this.isServerConnected = this.getServerConnected;
    this.rbServer = this.getRbServer;
    this.selectedMapFile = this.getSelectedMapName;
    //this.selectedWaypointFile = this.getSelectedWayPoint;
    

    console.log("isServerConnected : ", this.isServerConnected)
    if(this.isServerConnected ===true){


      //----------  Ros Service -----------//
      this.runBlockSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "run_block",
        serviceType: "agv_interface/runblock"
      });

      this.saveBlockSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "save_block",
        serviceType: "agv_interface/saveblock"
      });

      this.loadBlockSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "load_block",
        serviceType: "agv_interface/loadblock"
      });


      this.getWayPointsSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint",
        serviceType: "agv_interface/waypointsarray",
      });

      this.getWayPointNameSrv = new ROSLIB.Service({
        ros: this.rbServer,
        name: "/get_waypoint_name",
        serviceType: "agv_interface/waypointname",
      });

    }
  },
  methods: {
    myUpdateFunction(event) {
      var code = Blockly.Python.workspaceToCode(this.blockly_workspace);
      //document.getElementById("codeGenerated").value = code;
      console.log(event);
      console.log(code);
    },
 
    runBlock(filename){
      var runBlockParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMapFile,
        waypointfile: this.selectedWaypointFile
      });

      var code = Blockly.Python.workspaceToCode(this.blockly_workspace);
      console.log(code);
      
      // runBlockParam.mapfile = Blockly.Python.workspaeToCode(this.blockly_workspace);c

      runBlockParam.mapfile = code;

      console.log('run blockly : ', runBlockParam );

      this.runBlockSrv.callService(runBlockParam, function(reult){
        console.log(reult);
      });
    },

    saveBlock(filename){
      var saveBlockParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMapFile,
        waypointfile: this.selectedWaypointFile,
        message : ""
      });

      var xml = Blockly.Xml.workspaceToDom(this.blockly_workspace);
      console.log(xml);
      saveBlockParam.message = new XMLSerializer().serializeToString(xml);
      console.log('save block');

      // send saveBlockParan message to agvctl.py and get return as result
      this.saveBlockSrv.callService(saveBlockParam, function(reult){
        console.log(reult);   // show return from agvctl.py
      });   
    },
    
    loadBlock(){
      var loadBlockParam = new ROSLIB.ServiceRequest({
        mapfile: this.selectedMapFile,
        waypointfile: this.selectedWaypointFile
      });
      console.log('load block');
      this.loadBlockSrv.callService(loadBlockParam, function(reult){
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(reult.status),
          Blockly.mainWorkspace
        );
      });
      
    }
  },

  computed:{
    ...mapGetters(["getRbServer", "getServerConnected", "getIsSlamRunning", "getIsNavRunning", "getSelectedMapName", "getSelectedWayPoint"])
  }
};
</script>