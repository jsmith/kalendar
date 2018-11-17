<template>
  <div class="progress-ring">
      <vue-circle
        :progress="50"
        :size="100"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="5"
        :show-percent="true"
        @vue-circle-progress="progress"
        @vue-circle-end="progress_end">
          <p>Slot!</p>
      </vue-circle>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueCircle from 'vue2-circle-progress'

@Component
export default class ProgressRing extends Vue {
  @Prop({type: Number}) public runningTotal!: number;
  @Prop({type: Number}) public Total!: number;

  public fill = { gradient: ['red', 'green', 'blue'] };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
