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
            :progress="eatingTotal"
            :total="physicalActivitesTotal + eatingTotal"
            icon="restaurant">
        </progress-ring>
      </div>
      <div class="ring">
        <progress-ring
            :size="80"
            :progress="physicalActivitesTotal"
            :total="physicalActivitesTotal + eatingTotal"
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
    dayOfWeek: number[],
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

    public get events() {
      return this.state.events.filter(event => event.schedule.dayOfWeek)
    }

    public get today() {
      return this.events.filter(event => event.schedule.dayOfWeek.includes(this.dayOfWeek))
    }

    public get activities() {
      return this.today.filter(event => event.data.calendar === 'Physical Activities')
    }

    public get eating() {
      return this.today.filter(event => event.data.calendar === 'Eating')
    }

    public get dayOfWeek() {
      var d = new Date();
      return d.getDay()
    }

    public get tomorrow() {
      return this.events.filter(event => event.schedule.dayOfWeek.includes(this.dayOfWeek))
    }

    get physicalActivitesTotal() {
        let totalTime = 0;

        this.activities.forEach(event => {
            totalTime += event.schedule.times.length * event.schedule.duration;
        });

        return totalTime;
    }

    get eatingTotal() {
        let totalTime = 0;

        this.eating.forEach(event => {
            totalTime += event.schedule.times.length * event.schedule.duration;
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
