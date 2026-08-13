const ENDPOINT = "https://theory-toolkit-feedback.smallroomloudstories.workers.dev/";

export function installFeedback({ page, build, getContext = () => "" }) {
  const host = document.createElement("div");

  host.innerHTML = `
    <div class="feedback-launch">
      <button type="button" data-feedback-open>Send Feedback</button>
    </div>

    <section class="feedback-panel" data-feedback-panel hidden>
      <h2>Send Feedback</h2>

      <form data-feedback-form>
        <label>
          Tell me what you think
          <textarea
            data-feedback-text
            maxlength="10000"
            required
            placeholder="What worked, what didn't, what surprised you, or what would you like to see?"
          ></textarea>
        </label>

        <label>
          What did you expect instead?
          <span class="optional">(optional)</span>
          <textarea data-feedback-expected maxlength="5000"></textarea>
        </label>

        <div class="feedback-contact">
          <label>
            Your name
            <span class="optional">(optional)</span>
            <input
              data-feedback-name
              maxlength="200"
              autocomplete="name"
            >
          </label>

          <label>
            Email
            <span class="optional">(optional — only if you'd like a reply)</span>
            <input
              data-feedback-email
              type="email"
              maxlength="320"
              autocomplete="email"
            >
          </label>
        </div>

        <p class="feedback-note">
          To help reproduce problems, this report includes the current
          Theory Toolkit Build, page, and selections. It does not collect
          information about activity outside Theory Toolkit.
        </p>

        <p class="feedback-note">
          <strong>Privacy:</strong>
          Your feedback is used only to improve Theory Toolkit. Your name
          and email are optional and will only be used to follow up with
          you about your feedback. Your information will not be sold or
          used for any other purpose.
        </p>

        <div class="feedback-actions">
          <button type="submit" data-feedback-submit>
            Submit Feedback
          </button>

          <button type="button" data-feedback-cancel>
            Cancel
          </button>

          <span
            class="feedback-status"
            data-feedback-status
            role="status"
            aria-live="polite"
          ></span>
        </div>
      </form>
    </section>
  `;

  document.body.appendChild(host);

  const open = host.querySelector("[data-feedback-open]");
  const panel = host.querySelector("[data-feedback-panel]");
  const form = host.querySelector("[data-feedback-form]");
  const text = host.querySelector("[data-feedback-text]");
  const expected = host.querySelector("[data-feedback-expected]");
  const name = host.querySelector("[data-feedback-name]");
  const email = host.querySelector("[data-feedback-email]");
  const submit = host.querySelector("[data-feedback-submit]");
  const cancel = host.querySelector("[data-feedback-cancel]");
  const status = host.querySelector("[data-feedback-status]");

  open.addEventListener("click", () => {
    panel.hidden = false;
    status.textContent = "";
    status.classList.remove("error");

    requestAnimationFrame(() => text.focus());
  });

  cancel.addEventListener("click", () => {
    panel.hidden = true;
    open.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Submitting…";
    status.classList.remove("error");
    submit.disabled = true;

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          feedback: text.value,
          expected: expected.value,
          name: name.value,
          email: email.value,
          page,
          build,
          context: getContext()
        })
      });

      let result = {};

      try {
        result = await response.json();
      } catch {}

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
          "Feedback could not be submitted right now. Please try again."
        );
      }

      form.reset();

      status.textContent =
        result.message || "Thanks! Your feedback has been submitted.";

      text.focus();

    } catch (error) {
      status.textContent =
        error.message ||
        "Feedback could not be submitted right now. Please try again.";

      status.classList.add("error");
      text.focus();

    } finally {
      submit.disabled = false;
    }
  });
}
