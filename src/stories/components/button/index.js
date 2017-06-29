import Vue from 'vue'
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { addonNotes } from '@storybook/addon-notes';

import {
  addonKnobs,
  text,
  number,
  boolean,
  array,
  select,
  color,
  date,
} from '@storybook/addon-knobs';


import MyButton from './Button.vue';
Vue.component('my-button', MyButton)


storiesOf('Button', module)
  // Works if Vue.component is called in the config.js in .storybook
  .add('rounded', () => ({
    template: '<my-button :rounded="true">A Button with rounded edges</my-button>',
  }))
  .add('square', () => ({
    template: '<my-button :rounded="false">A Button with square edges</my-button>',
  }));

storiesOf('Method for rendering Vue', module)
  .add('render', () => ({
    render: h => h('div', ['renders a div with some text in it..']),
  }))
  .add('render + component', () => ({
    render(h) {
      return h(MyButton, { props: { color: 'pink' } }, ['renders component: MyButton']);
    },
  }))
  .add('template', () => ({
    template: `
      <div>
        <h1>A template</h1>
        <p>rendered in vue in storybook</p> 
      </div>`,
  }))
  .add('template + component', () => ({
    components: { MyButton },
    template: '<my-button>MyButton rendered in a template</my-button>',
  }))
  .add('template + methods', () => ({
    components: { MyButton },
    template: `
      <p>
        <em>Clicking the button will navigate to another story using the 'addon-links'</em><br/>
        <my-button :rounded="true" :handle-click="action">MyButton rendered in a template + props & methods</my-button>
      </p>`,
    methods: {
      action: linkTo('Button'),
    },
  }))
  .add('vuex + actions', () => ({
    components: { MyButton },
    template: '<my-button :handle-click="log">with vuex: {{ $store.state.count }}</my-button>',
    store: new Vuex.Store({
      state: { count: 0 },
      mutations: {
        increment(state) {
          state.count += 1; // eslint-disable-line
          action('vuex state')(state);
        },
      },
    }),
    methods: {
      log() {
        this.$store.commit('increment');
      },
    },
  }))
  .add('whatever you want', () => ({
    components: { MyButton },
    template:
      '<my-button :handle-click="log">with awesomeness: {{ $store.state.count }}</my-button>',
    store: new Vuex.Store({
      state: { count: 0 },
      mutations: {
        increment(state) {
          state.count += 1; // eslint-disable-line
          action('vuex state')(state);
        },
      },
    }),
    methods: {
      log() {
        this.$store.commit('increment');
      },
    },
  }))
  .add('pre-registered component', () => ({
    /* By pre-registering component in config.js,
     * the need to register all components with each story is removed.
     * You'll only need the template */
    template: `
      <p>
        <em>This component was pre-registered in .storybook/config.js</em><br/>
        <my-button>MyButton rendered in a template</my-button>
      </p>`,
  }));
