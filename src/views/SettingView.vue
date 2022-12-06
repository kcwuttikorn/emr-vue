<template>
  <div class="setting">
    <v-container fluid>
      <h1>This is a setting page</h1>
      <v-card>
    <v-container fluid>
      <v-row
        align="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Chips"
            multiple
          ></v-select>
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>

    </v-container>
    
  </div>
</template>

<script>
export default {
  name:'setting',
  data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
  // data() {
  //   return {
      
  //   };
  // },
}
</script>

<style>

</style>