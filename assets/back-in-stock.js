if (!customElements.get('back-in-stock')) {
  customElements.define(
    'back-in-stock',
    class BackInStock extends HTMLElement {
      constructor() {
        super();
        // Listen on the element, not its children: product-info.js swaps them when the variant changes.
        this.addEventListener('click', this.onClick.bind(this));
        this.addEventListener('submit', this.onSubmit.bind(this));
      }

      connectedCallback() {
        // Back from a regular post (e.g. after a captcha): show the confirmation.
        if (this.querySelector('[data-back-in-stock-posted]') && !this.dialog.open) this.dialog.showModal();
      }

      get dialog() {
        return this.querySelector('dialog');
      }

      onClick(event) {
        if (event.target.closest('.back-in-stock__open')) {
          this.dialog.showModal();
        } else if (event.target === this.dialog || event.target.closest('[data-back-in-stock-close]')) {
          // A click on the dialog itself is a click on the backdrop.
          this.dialog.close();
        }
      }

      async onSubmit(event) {
        // Something else (e.g. Shopify's captcha) is handling this submit, let it post natively.
        if (event.defaultPrevented) return;
        event.preventDefault();

        const form = event.target;
        const button = form.querySelector('[type="submit"]');
        if (button.getAttribute('aria-disabled') === 'true') return;

        this.toggleLoading(button, true);
        this.querySelector('.back-in-stock__error').classList.add('hidden');

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(form)),
          });

          // Shopify wants the customer to solve a captcha: post the form normally so they can.
          if (response.url.includes('/challenge')) return form.submit();
          if (!response.ok || !response.url.includes('contact_posted=true')) {
            throw new Error(`Back in stock request failed (${response.status})`);
          }

          this.querySelector('.back-in-stock__fields').classList.add('hidden');
          this.querySelector('.back-in-stock__success').classList.remove('hidden');
        } catch (error) {
          console.error(error);
          this.querySelector('.back-in-stock__error').classList.remove('hidden');
        } finally {
          this.toggleLoading(button, false);
        }
      }

      toggleLoading(button, loading) {
        if (loading) {
          button.setAttribute('aria-disabled', 'true');
        } else {
          button.removeAttribute('aria-disabled');
        }
        button.classList.toggle('loading', loading);
        button.querySelector('.loading__spinner').classList.toggle('hidden', !loading);
      }
    }
  );
}
