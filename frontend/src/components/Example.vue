<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.name">
          <td>{{ event.name }}</td>
          <td>{{ event.location }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Example',

  data: () => ({
    events: [
      {
        name: 'Hello',
        location: 'Szeged',
      },
      {
        name: 'Other Event',
        location: 'Budapest',
      },
    ],
  }),
});
</script>
