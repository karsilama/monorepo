export class TodayDate extends HTMLElement {
  private interval: number | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          right: 4px;
          color: #333;
          background: white;
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 1000;
          font-size: 10px;
        }
      </style>
      <div id="datetime"></div>
    `;

    this.update();
    this.interval = window.setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formatted = now.toLocaleDateString("es-ES", options).replace(",", "");
    this.shadowRoot!.getElementById("datetime")!.textContent = formatted;
  }

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

customElements.define("date-today", TodayDate);
