<template>
  <div class="progress-rings">
        <progress-ring
            :progress="30"
            :total="100">
        </progress-ring>
        <progress-ring
            :progress="60"
            :total="100">
        </progress-ring> 
        <progress-ring
            :progress="80"
            :total="100">
        </progress-ring>      
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
</style>
