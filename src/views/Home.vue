<template>
  <v-app id="dayspan" v-cloak>

    <ds-calendar-app 
      ref="app"
      class="calendar-app"
      :class="{'calendar-active': sidebarActive}"
      :calendar="calendar"
      :read-only="readOnly"
      @change="saveState"
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
          @finish="saveState"
        ></ds-calendar-event-popover>
      </template>

      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.app.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.app.editPlaceholder"
          @create-popover-closed="saveState"
        ></ds-calendar-event-create-popover>
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
        </div>
      </template>

    </ds-calendar-app>

  </v-app>
</template>

<script>
import { Calendar, Weekday, Month } from 'dayspan';
import Default from '@/default'
import Vue from 'vue';

export default {
  name: 'app',

  data: () => ({
    storeKey: 'dayspanState',
    calendar: Calendar.months(),
    readOnly: false,
    defaultEvents: Default,
    calendars: [
      {
        name: 'US Holidays',
        active: true
      }, 
      {
        name: 'Jacob',
        active: true
      },
    ],
    app: null,
  }),

  mounted() {
    window.app = this.app = this.$refs.app;
    this.loadState();
  },

  computed: {
    sidebarActive () {
      if (!this.app) {
        return true;
      }

      return this.app.drawer;
    }
  },

  methods: {
    getCalendarTime(calendarEvent) {
      let sa = calendarEvent.start.format('a');
      let ea = calendarEvent.end.format('a');
      let sh = calendarEvent.start.format('h');
      let eh = calendarEvent.end.format('h');

      if (calendarEvent.start.minute !== 0)
      {
        sh += calendarEvent.start.format(':mm');
      }

      if (calendarEvent.end.minute !== 0)
      {
        eh += calendarEvent.end.format(':mm');
      }

      return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
    },

    saveState() {
      let state = this.calendar.toInput(true);
      let json = JSON.stringify(state);

      localStorage.setItem(this.storeKey, json);
    },

    loadState() {
      let state = {};

      try {
        let savedState = JSON.parse(localStorage.getItem(this.storeKey));

        if (savedState) {
          state = savedState;
          state.preferToday = false;
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log( e );
      }

      if (!state.events || !state.events.length) {
        state.events = this.defaultEvents;
      }

      state.events.forEach(ev => {
        let defaults = this.$dayspan.getDefaultEventDetails();
        ev.data = Vue.util.extend( defaults, ev.data );
      });

      this.$refs.app.setState( state );
    }
  }
}
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
</style>
