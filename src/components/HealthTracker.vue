<template>
  <div class="progress-rings">
      <div class="ring">
        <progress-ring
            :size="80"
            :progress="30"
            :total="100"
            icon="snooze">
        </progress-ring>
      </div>
      <div class="ring">
        <progress-ring
            :size="80"
            :progress="80"
            :total="100"
            icon="restaurant">
        </progress-ring>
      </div>
      <div class="ring">
        <progress-ring
            :size="80"
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

interface Event {
    data: {
          title: string,
          color: string,
          calendar?: string,
      },
      schedule: {
          dayOfWeek: string[],
          times: number[],
          duration: number,
          durationUnit: string,
      },
}

interface State {
    events: Event[]
}

@Component({
    components: {ProgressRing},
})
export default class HealthTracker extends Vue {
  @Prop({type: Object}) public state!: State;

    get physicalActivitesTotal() {
        let totalTime = 0;
        let scaleFactor = 1;

        this.state.events.forEach(event => {
            if (event.data.calendar === 'Physical Activities') {
                scaleFactor = event.schedule.durationUnit === 'days' ? 24:
                              event.schedule.durationUnit ===  'hours' ? 60: 1;
            }

            totalTime += event.schedule.duration * scaleFactor;
        });

        return totalTime;
    }

    get eatingTotal() {
        let totalTime = 0;
        let scaleFactor = 1;

        this.state.events.forEach(event => {
            if (event.data.calendar === 'Eating') {
                scaleFactor = event.schedule.durationUnit === 'days' ? 24:
                              event.schedule.durationUnit ===  'hours' ? 60: 1;
            }

            totalTime += event.schedule.duration * scaleFactor;
        });

        return totalTime;
    }
}
</script>

<style scoped lang="sass">
    .progress-rings
        display: flex
        flex-direction: column
        align-items: stretch 

    .ring
        margin: auto
        padding-top: 20px    
</style>
