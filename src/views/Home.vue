<template>
  <v-app id="dayspan" v-cloak>
    <ds-calendar-app 
      ref="app"
      class="calendar-app"
      :class="{'calendar-active': sidebarActive}"
      :calendar="calendar"
      :read-only="readOnly"
    >

      <template slot="title">
        Kalendar
      </template>

      <template slot="menuRight">
        <v-btn icon large href="https://github.com/ashlynmoody/UNBFQualifiers-Amir-Eldesoky" target="_blank">
          <v-avatar size="32px" tile>
            <img src="https://simpleicons.org/icons/github.svg" alt="Github">
          </v-avatar>
        </v-btn>
      </template>

      <template slot="eventPopover" slot-scope="slotData">
        <ds-calendar-event-popover
          v-bind="slotData"
          :read-only="readOnly"
          @event-remove="remove"
        ></ds-calendar-event-popover>
      </template>

      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.app.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.app.editPlaceholder"
          @event-create="create"
        >
          <template slot="eventCreatePopoverBodyTop" slot-scope="{ calendarEvent }">
            <div v-if="eventHasConflict(calendarEvent, calendar)">
              <div style="display: inline-block">
                <v-icon large color="red">info</v-icon>
              </div>
              <div style="display: inline-block">
                <span>This event has conflicts with other events. You may still create this event, but consider picking a new time if possible to avoid an overbooked schedule.</span>
              </div>
            </div>
            <div v-if="eventIsLate(calendarEvent)">
              <div style="display: inline-block">
                <v-icon large color="red">info</v-icon>
              </div>
              <div style="display: inline-block">
                <span>This event occurs late in the evening. You may still create this event, but consider picking a new day if to ensure you get your 8 hours of sleep.</span>
              </div>
            </div>
          </template>
          <template slot="eventCreatePopoverCalendar" slot-scope="{ details }">
            <v-select
              style="width: 100%"
              single-line hide-details solo flat full-width
              :items="calendars.map(({ name }) => name)"
              label="Calendar"
              v-model="details.calendar"
            ></v-select>
          </template>
        </ds-calendar-event-create-popover>
      </template>

      <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div>
          <v-icon class="ds-ev-icon"
            v-if="details.icon"
            size="14"
            :style="{color: details.forecolor}"
          >
            {{ details.icon }}
          </v-icon>
          <strong class="ds-ev-title">{{ details.title }}</strong>
        </div>
        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
      </template>

      <template slot="drawerBottom">
        <div class="pa-3 calendar-slot">
          <v-checkbox
            v-for="calendar in calendars" 
            :key="calendar.name"
            style="margin: 0"
            :label="calendar.name"
            v-model="calendar.active"
          ></v-checkbox>
          <health-tracker></health-tracker>
        </div>
      </template>

    </ds-calendar-app>

  </v-app>
</template>

<script>
import { Calendar, Weekday, Month } from 'dayspan';
import HealthTracker from '@/components/HealthTracker.vue'
import Default from '@/default';
import Vue from 'vue';

export default {
  name: 'app',
  components: { HealthTracker },
  data: () => ({
    storeKey: 'dayspanState',
    calendar: Calendar.months(),
    readOnly: false,
    defaultEvents: Default,
    calendars: [
      {
        name: 'School',
        active: true,
      },
      {
        name: 'Personal Schedule',
        active: true,
      },
      {
        name: 'Physical Activities',
        active: true,
      },
      {
        name: 'Eating',
        active: true,
      },
      {
        name: 'US Holidays',
        active: true,
      }
    ],
    app: null,
    ignore: false,
    state: {},
  }),

  mounted() {
    window.app = this.app = this.$refs.app;

    const eventDialog = this.app.$refs.eventDialog;
    eventDialog.$on('event-update', this.update)

    this.loadState();
  },

  computed: {
    sidebarActive () {
      if (!this.app) {
        return true;
      }

      return this.app.drawer;
    },
    calendarNames() {
      return this.calendars.map(({ name }) => name)
    },
    activeLookup() {
      const lookup = {};
      this.calendars.map(({ name, active }) => {
        lookup[name] = active;
      })
      return lookup;
    }
  },

  methods: {
    create(o) {
      this.state.events.push(o);
      this.app.setState(this.state);
      this.saveState()
    },
    update(o) {
      this.state.events = this.state.events.find(event => event.data.title === o.data.title)
      this.app.setState(this.state);
      this.saveState()
    },
    remove(o) {
      this.state.events = this.state.events.find(event => event.data.title !== o.data.title)      
      this.app.setState(this.state);
      this.saveState()
    },
    getCalendarTime(calendarEvent) {
      let sa = calendarEvent.start.format('a');
      let ea = calendarEvent.end.format('a');
      let sh = calendarEvent.start.format('h');
      let eh = calendarEvent.end.format('h');

      if (calendarEvent.start.minute !== 0) {
        sh += calendarEvent.start.format(':mm');
      }

      if (calendarEvent.end.minute !== 0) {
        eh += calendarEvent.end.format(':mm');
      }

      return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
    },

    saveState() {
      this.state = this.calendar.toInput(true);
      localStorage.setItem(this.storeKey, JSON.stringify(this.state));
    },

    loadState() {
      let state = {};

      try {
        const savedState = JSON.parse(localStorage.getItem(this.storeKey));

        if (savedState) {
          state = savedState;
          state.preferToday = false;
        }
      } catch (e) {
        // eslint-disable-next-line
        // console.error( e );
      }

      if (!state.events || !state.events.length) {
        state.events = this.defaultEvents;
      }

      state.events.forEach((ev) => {
        const defaults = this.$dayspan.getDefaultEventDetails();
        ev.data = Vue.util.extend( defaults, ev.data );
      });

      this.state = state;
      this.app.setState(this.state);
    },

    eventHasConflict(calendarEvent, calendar) {
      if(!calendarEvent.start || !calendarEvent.end) {
          return false;
      }

      const newEventStart = calendarEvent.start.time;
      const newEventEnd = calendarEvent.end.time;

      for(let index = 0; index < calendar.events.length; index++) {
        let event = calendar.events[index].schedule;

        if(!event.start || !event.end) {
          continue;
        }

        let eventStart = event.start.time;
        let eventEnd = event.start.time;

        if(!eventStart && !eventEnd) {
          continue;
        }

        if(newEventStart >= eventStart && newEventStart <= eventEnd) {
          return true;
        }
      }

      return false;
    },

    eventIsLate(calendarEvent) {
      return calendarEvent.start.hour < 3  || calendarEvent.end.hour < 5;
    }
  },
  watch: {
    calendars: {
      deep: true,
      handler () {
        const events = this.state.events.filter((event) => {
          if (!event.data.calendar) {
            return true;
          }
          return this.activeLookup[event.data.calendar];
        })
        this.app.setState({
          ...this.state,
          events,
        })
      }
    }
  },
};
</script>

<style lang="sass">

body, html, #app, #dayspan
  font-family: Roboto, sans-serif !important
  width: 100%
  height: 100%

.v-btn--flat,
.v-text-field--solo .v-input__slot
  background-color: #f5f5f5 !important
  margin-bottom: 8px !important

.calendar-slot
  text-align: left
</style>

<style lang="sass">
.calendar-active .ds-app-calendar-toolbar
  padding-left: 300px!important

.v-navigation-drawer
  margin-top: 0!important
  z-index: 100!important

.v-input__slot
  margin: 0!important

.v-toolbar__title
  display: flex

.hidden-sm-and-down
  vertical-align: middle
  line-height: 48px

.v-toolbar__content
  padding-left: 10px!important
</style>
