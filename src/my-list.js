import { html, render } from './external/lit-html/lit-html.js';

const TABLE_ID = "my-table";

const template = html`
        <table id="${TABLE_ID}">
            <tr>
                <td>Name:</td>
                <td>Time:</td>
            </tr>
        </table>
    `;

const SHADOW_DOM_OPEN_FOR_JS = "open";
export const MY_TABLE_ADD_ENTRY_EVENT = "my-table-add-entry";

class MyList extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode:SHADOW_DOM_OPEN_FOR_JS});

        window.addEventListener(MY_TABLE_ADD_ENTRY_EVENT,e => this.onAddEntry(e));
    }

    connectedCallback() {
        render(template, this.root);
    }

    onAddEntry(e) {
        console.log(e.detail);

        let table = this.root.getElementById(TABLE_ID);
        let row = table.insertRow();

        row.insertCell(0).innerHTML = e.detail;
        row.insertCell(1).innerHTML = new Date().toLocaleString();
    }
}

customElements.define('my-list', MyList);
