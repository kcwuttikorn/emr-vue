<template>
  <div class="program">
    <v-container fluid class="blue">
      <!-- <h1>Blockly view</h1> -->
      <!-- <div class="row"> -->
      <v-row no-gutters>
        <v-col cols="12">          
          <v-card fluid class="yellow lighten-5 pa-1">
            <v-btn 
              color="primary" 
              elevation="2"
              onclick="runBlockly(this)"
              id="run_blockly"
              class="ma-2"
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
            >
            Save
            </v-btn>

            <v-btn 
              color="warning" 
              elevation="2"
              data-toggle="modal"
              data-target="#loadBlockyModal"
              onclick="getFile()"
              id="load_blockly"
              class="ma-2"
            >
            Load
            </v-btn>

          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12">
          <v-card 
            fluid             
            class="cyan lighten-5 pa-2 ma-2"
            id="blocklyArea"
            height="75vh"
          >
              <div
                id="blocklyDiv"
                ref="blocklyDiv"
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
                  <!--<block type="agv_init"></block> -->
                  <!--<block type="move_to"></block> -->
                  <!--<block type="move_to_preset"></block>-->
                  <block type="emr_init"></block>
                  <block type="emr_move"></block>
                  <!-- <block type="emr_move_to"></block> -->
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

      <!-- </div> -->
    </v-container>
  </div>
</template>

<script>
//import './prompt';
import Blockly from "blockly";
import ROSLIB from "roslib";
//const Blockly = () => import("blockly");
//import BlocklyComponent from "../components/BlocklyComponent.vue";
//import "../blocks/agv";
import BlocklyPython from "blockly/python";
//import BlocklyJS from 'blockly/javascript';
export default {
  components: {
    // BlocklyComponent,
  },
  data: function () {
    return {
      blockly_workspace: null,
      options: {
        //media: "../assets",
        horizontalLayout:false,
        toolboxPosition: "start",
        rtl: true,
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
    };
  },
  mounted() {
    this.$store.dispatch('actionModeName', 'Blockly');
    console.log("MOUNTED");
    
    this.options.toolbox = document.getElementById("toolbox");
    this.blockly_workspace = Blockly.inject(
      this.$refs["blocklyDiv"],
      this.options
    );
    window.g_blockly_workspace = this.blockly_workspace;
    this.blockly_workspace.addChangeListener(this.myUpdateFunction);
    

    
   
    // BlocklyPython["agv_init"] = function (block) {
    //   // TODO: Assemble JavaScript into code variable.
    //   console.log(block);
    //   var code = "import rospy\n";
    //   code = code + "import actionlib\n";
    //   code =
    //     code + "from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal\n";
    //   code = code + "from std_msgs.msg import String\n";
    //   code = code + "import json\n";
    //   code = code + "from tinydb import TinyDB, Query\n";
    //   code =
    //     code + "from rospy_message_converter import json_message_converter\n";
    //   code = code + "import agv\n";
    //   code = code + "import time\n";
    //   //code = code + "waypoint_db = TinyDB('/home/pi/db.json')\n"
    //   code = code + "rospy.init_node('patrol')\n";
    //   code =
    //     code +
    //     "client = actionlib.SimpleActionClient('move_base', MoveBaseAction)\n";
    //   code = code + "client.wait_for_server()\n";
    //   return code;
    // };


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
        var code = "import rospy\n"+
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
          this.appendDummyInput().appendField("wait (sleep)");
          this.appendValueInput("time").setCheck(null);
          this.appendDummyInput().appendField("sec");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };

      Blockly.Python["wait"] = function (block) {
        var value_time = Blockly.Python.valueToCode(
          block,
          "time",
          Blockly.Python.ORDER_ATOMIC
        );
        // TODO: Assemble Python into code variable.
        var code = "rospy.sleep(" + value_time + ")\n";
        return code;
      };




    Blockly.Blocks["move_to_preset"] = {
      init: function () {
        this.appendDummyInput().appendField("Move to ");
        this.appendDummyInput().appendField(
          this.$store.state.selectedMapName + " "
        );
        this.appendDummyInput()
          .appendField("waypoint")
          .appendField(
            new Blockly.FieldDropdown(this.generateOptions),
            "WAYPOINT"
          );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      },
      generateOptions: function () {
        var options = [];
        var g_waypoints = this.$store.state.selectedWayPoints;
        for (var i = 0; i < g_waypoints.length; i++) {
          options.push([g_waypoints[i].name, g_waypoints[i].name]);
        }
        return options;
      },
    };
    Blockly.Python["move_to_preset"] = function (block) {
      /*var value_waypoint = Blockly.Python.valueToCode(block, 'waypoint', Blockly.Python
                  .ORDER_ATOMIC);*/
      var value_waypoint = block.getFieldValue("WAYPOINT");
      // TODO: Assemble Python into code variable.
      var code =
        'goal = agv.goal_pose("' +
        this.$store.state.selectedMapName +
        '" , "' +
        value_waypoint +
        '")\n';
      code = code + "client.send_goal(goal)\n";
      code = code + "client.wait_for_result()\n";
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
      var code = "ublock_pub.publish(" + dropdown_emr_door + ")\n";
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
      var code = "ublock_pub.publish(" + dropdown_emr_tray + dropdown_action + ")\n";
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
  },


  methods: {
    myUpdateFunction(event) {
      var code = Blockly.Python.workspaceToCode(this.blockly_workspace);
      //document.getElementById("codeGenerated").value = code;
      console.log(event);
      console.log(code);
    },
    runBlock(filename){
      console.log('run blockly :', filename )
    },
  },
};
</script>

