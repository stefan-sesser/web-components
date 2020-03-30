import { html, render } from './external/lit-html/lit-html.js';
import { MY_TABLE_ADD_ENTRY_EVENT } from './my-list.js';

const template = app => html`
            <h2>Hello ${app.name}</h2>
            <button @click=${_ => app.clicked()}>Change Name</button>
            <input @change=${event => app.onInput(event.target.value)}, type="text" />
        `;

const SHADOW_DOM_OPEN_FOR_JS = "open";

class App extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode:SHADOW_DOM_OPEN_FOR_JS});

        this.name = "World";
    }

    connectedCallback() {
        render(template(this), this.root);
    }

    clicked() {
        console.log("clicked button with name: " + this.name);
        render(template(this), this.root);

        this.dispatchMyTableAddEntryEvent();
    }

    onInput(text) {
        this.name = text;
    }

    dispatchMyTableAddEntryEvent() {
        const fetchEvent = new CustomEvent(MY_TABLE_ADD_ENTRY_EVENT, { detail: this.name });
        window.dispatchEvent(fetchEvent);
    }
}

customElements.define('my-app', App);
