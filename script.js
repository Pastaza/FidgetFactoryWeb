/* =========================================================
   FIDGET FACTORY – Pre-Order Interest Form
   =========================================================
   Handles:
   • Enabling the qty select when its checkbox is ticked
   • Client-side validation (name + at least one product)
   • AJAX submission to Formspree (no page reload)
   • Success / error UI states
   ========================================================= */

(function () {
  'use strict';

  var form      = document.getElementById('preorder-form');
  var success   = document.getElementById('preorder-success');
  var errorEl   = document.getElementById('preorder-error');
  var submitBtn = document.getElementById('preorder-submit');

  if (!form) return;

  /* ── Enable / disable qty and colour selectors when checkbox changes ── */
  form.addEventListener('change', function (e) {
    if (!e.target.matches('.preorder-item__check')) return;
    var item  = e.target.closest('.preorder-item');
    var qty   = item && item.querySelector('.preorder-item__qty');
    var color = item && item.querySelector('.preorder-item__color');
    if (qty) {
      qty.disabled = !e.target.checked;
      qty.setAttribute('aria-disabled', e.target.checked ? 'false' : 'true');
      /* Reset to first option when unchecked so stale values don't get sent */
      if (!e.target.checked) qty.selectedIndex = 0;
    }
    if (color) {
      color.disabled = !e.target.checked;
      color.setAttribute('aria-disabled', e.target.checked ? 'false' : 'true');
      if (!e.target.checked) color.selectedIndex = 0;
    }
  });

  /* ── Form submit (AJAX → Formspree) ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameVal  = form.elements['name'] && form.elements['name'].value.trim();
    var checked  = form.querySelectorAll('.preorder-item__check:checked');

    /* Validation */
    if (!nameVal) {
      return showError('Please enter your name so we know who to look for! 😊');
    }
    if (checked.length === 0) {
      return showError('Please tick at least one product you\'re interested in. 🛒');
    }

    hideError();
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending… ⏳';

    var data = new FormData(form);

    fetch(form.action, {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        /* Show the success banner and hide the form */
        form.hidden    = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        return res.json().then(function (json) {
          var msg = (json.errors || []).map(function (er) { return er.message; }).join(', ') ||
                    'Something went wrong. Please try again!';
          throw new Error(msg);
        });
      }
    })
    .catch(function (err) {
      showError((err && err.message) || 'Could not send – please try again or just come see us on the day! 👋');
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Register My Interest 📋';
    });
  });

  /* ── Helpers ── */
  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden      = false;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function hideError() {
    errorEl.textContent = '';
    errorEl.hidden      = true;
  }

}());
