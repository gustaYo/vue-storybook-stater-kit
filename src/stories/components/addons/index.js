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

storiesOf('Addon Actions', module)
  .add('Action only', () => ({
    template: '<my-button :handle-click="log">Click me to log the action</my-button>',
    methods: {
      log: action('log1'),
    },
  }))
  .add('Action and method', () => ({
    template: '<my-button :handle-click="log">Click me to log the action</my-button>',
    methods: {
      log: e => {
        e.preventDefault();
        action('log2')(e.target);
      },
    },
  }));

storiesOf('Addon Notes', module)
  .add(
    'Simple note',
    addonNotes({ notes: 'My notes on some bold text' })(() => ({
      template:
        '<p><strong>Etiam vulputate elit eu venenatis eleifend. Duis nec lectus augue. Morbi egestas diam sed vulputate mollis. Fusce egestas pretium vehicula. Integer sed neque diam. Donec consectetur velit vitae enim varius, ut placerat arcu imperdiet. Praesent sed faucibus arcu. Nullam sit amet nibh a enim eleifend rhoncus. Donec pretium elementum leo at fermentum. Nulla sollicitudin, mauris quis semper tempus, sem metus tristique diam, efficitur pulvinar mi urna id urna.</strong></p>',
    }))
  )
  .add(
    'Note with HTML',
    addonNotes({
      notes: `
      <h2>My notes on emojies</h2>

      <em>It's not all that important to be honest, but..</em>

      Emojis are great, I love emojis, in fact I like using them in my Component notes too! 😇
    `,
    })(() => ({
      template: '<p>🤔😳😯😮<br/>😄😩😓😱<br/>🤓😑😶😊</p>',
    }))
  );

storiesOf('Addon Knobs', module)
  .add(
    'Simple',
    addonKnobs()(() => {
      const name = text('Name', 'John Doe');
      const age = number('Age', 44);
      const content = `I am ${name} and I'm ${age} years old.`;

      return {
        template: `<div>${content}</div>`,
      };
    })
  )
  .add(
    'All knobs',
    addonKnobs()(() => {
      const name = text('Name', 'Jane');
      const stock = number('Stock', 20, { range: true, min: 0, max: 30, step: 5 });
      const fruits = {
        apples: 'Apple',
        bananas: 'Banana',
        cherries: 'Cherry',
      };
      const fruit = select('Fruit', fruits, 'apple');
      const price = number('Price', 2.25);

      const colour = color('Border', 'deeppink');
      const today = date('Today', new Date('Jan 20 2017'));
      const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
      const nice = boolean('Nice', true);

      const stockMessage = stock
        ? `I have a stock of ${stock} ${fruit}, costing &dollar;${price} each.`
        : `I'm out of ${fruit}${nice ? ', Sorry!' : '.'}`;
      const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';

      return {
        template: `
          <div style="border:2px dotted ${colour}; padding: 8px 22px; border-radius: 8px">
            <h1>My name is ${name},</h1>
            <h3>today is ${new Date(today).toLocaleDateString()}</h3>
            <p>${stockMessage}</p>
            <p>Also, I have:</p>
            <ul>
              ${items.map(item => `<li key=${item}>${item}</li>`).join('')}
            </ul>
            <p>${salutation}</p>
          </div>
        `,
      };
    })
  );
