<template>
  <div class="progress-ring">
      <v-progress-circular
      :value="percentage"
      :color="color"
      :size="size"
    >
     <v-icon>{{icon}}</v-icon>
    </v-progress-circular>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProgressRing extends Vue {
  @Prop({type: Number}) public progress!: number;
  @Prop({type: Number}) public total!: number;
  @Prop({type: String}) public icon!: string;
  @Prop({type: Number, default: 50}) public size!: number;

  get percentage() {
    return Math.round(this.progress / this.total * 100);
  }

  get color() {
    let p = this.percentage;
    return p >= 70? 'green': p >= 40? 'yellow':'red' 
  }
}
</script>

<style scoped lang="sass">

</style>
