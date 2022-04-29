import './style.css';
import We from './we-can';

We.can('strikeThroughLinks', () => {
  document.querySelectorAll(':any-link').forEach((link : HTMLAnchorElement) => link.style.textDecoration = 'line-through');
});

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>

  <div>
    <button disabled class="js-party">Party!</button>
  </div>


  <div hidden class="js-dance-wrap">
    <button class="js-dance">Dance!</button>
  </div>
`
We.should('strikeThroughLinks');
We.should('boldenLinks');


We.can('boldenLinks', () => {
  document.querySelectorAll(':any-link').forEach((link : HTMLAnchorElement) => link.style.fontWeight = '600');
});

We.can('learnToPartyIfNeeded', () => {

  if (document.querySelector('.js-party')) {
    We.util.loadScript('src/party.js', () => {
      // Partying script loaded!
      We.can('party', () => {
        // @ts-ignore
        window.party();

        // Show and enable dance button
        document.querySelector('.js-dance-wrap').removeAttribute('hidden');
        document.querySelector('.js-dance').addEventListener('click', () => {
          We.should('dance');
        });
      });

      document.querySelectorAll('.js-party').forEach((e) => {
        // Due to We's queue, we could actually do this before the
        // party script loaded, but this way we guarantee any
        // clicks of the non-disabled button cause immediate partying
        e.removeAttribute('disabled');
        e.addEventListener('click', () => We.should('party'));
      })
    });
  }
});

We.should('learnToPartyIfNeeded');

// We should be global so dance.js can teach dancing
// @ts-ignore
window.We = We;

// This time use We.canLearnTo
We.canLearnTo('dance', 'src/dance.js');

