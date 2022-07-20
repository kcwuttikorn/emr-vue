import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {            // use:   $store.state.{state name}   when {state name is modename or ... selectedWayPoint }
    modeName: "",               // Slam or Navigation
    rbServer: undefined,        // Obj
    serverConnected: false,
    isSlamRunning: false,
    isNavRunning: false,
    rosIP: "",
    selectedMapName: "",
    selectedWayPoint: [],
  },
  getters: {
    getModeName: (state) => state.modeName,
    getRbServer: (state) => state.rbServer,
    getServerConnected: (state) =>state.serverConnected,
    getIsSlamRunning: (state) => state.isSlamRunning,
    getIsNavRunning: (state) => state.isNavRunning,
    getRosIP: (state) => state.rosIP,
    getSelectedMapName: (state) => state.selectedMapName,
    getSelectedWayPoint: (state) => state.selectedWayPoint,
  },
  mutations: {
    setModeName(state, data){
      state.modeName = data;
    },
    setRbServer(state, data){
      state.rbServer = data;
    },
    setServerConnected(state, data){
      state.serverConnected = data;
    },
    setIsSlamRunning(state, data){
      state.isSlamRunning = data;
    },
    setIsNavRunning(state, data){
      state.isNavRunning = data;
    },
    setRosIP(state, data){
      state.rosIP = data;
    },
    setSelectedMapName(state, data){
      state.selectedMapName = data;
    },
    setSelectedWayPoint(state, data){
      state.selectedWayPoint = data;
    },
    
  },
  actions: {
    actionModeName(context, value){
      context.commit('setModeName', value);
    },
    actionRbServer(context, value){
      context.commit('setRbServer', value);
    },
    actionServerConnected(context, value){
      context.commit('setServerConnected', value);
    },
    actionIsSlamRunning(context, value){
      context.commit('setIsSlamRunning', value);
    },
    actionIsNavRunning(context, value){
      context.commit('setIsNavRunning', value);
    },
    actionRosIP(context, value){
      context.commit('setRosIP', value);
    },
    actionSelectedMapName(context, value){
      context.commit('setSelecteMapName', value);
    },
    actionSelectedWayPoint(context, value){
      context.commit('setSelectedWayPoint', value);
    },
  },
  modules: {
  }
})
