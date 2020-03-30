import { html, render } from './external/lit-html/lit-html.js';

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
        render(template(this), this.root)
    }

    onInput(text) {
        this.name = text;
    }
}

customElements.define('my-app', App);
