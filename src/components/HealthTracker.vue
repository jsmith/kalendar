<template>
  <div class="progress-rings">
      <div class="ring">
        <progress-ring
            :progress="30"
            :total="100"
            icon="snooze">
        </progress-ring>
      </div>
      <div class="ring">
        <progress-ring
            :progress="80"
            :total="100"
            icon="restaurant">
        </progress-ring>
      </div>
      <div class="ring">
        <progress-ring
            :progress="60"
            :total="100"
            icon="directions_run">
        </progress-ring>
      </div>   
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProgressRing from '@/components/ProgressRing.vue';

@Component({
    components: {ProgressRing},
})
export default class HealthTracker extends Vue {

}
</script>

<style scoped lang="sass">
    .progress-rings
        display: flex
        flex-direction: row
        align-items: stretch 

    .ring
        margin: auto    
</style>
