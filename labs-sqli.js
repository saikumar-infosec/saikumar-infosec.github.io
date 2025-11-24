// ---------- Tabs ----------
document.querySelectorAll(".lab-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    document
      .querySelectorAll(".lab-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".lab-panel")
      .forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// ---------- Flags ----------
const FLAG_KEYS = {
  error: "FLAG_ERROR_BASED",
  bool: "FLAG_BOOLEAN_BASED",
  time: "FLAG_TIME_BASED",
};

function loadFlags() {
  let count = 0;
  Object.values(FLAG_KEYS).forEach((k) => {
    if (localStorage.getItem(k) === "1") count++;
  });
  const el = document.getElementById("flagCount");
  if (el) el.textContent = count;
}

function setFlag(key) {
  localStorage.setItem(key, "1");
  loadFlags();
}

const resetBtn = document.getElementById("resetFlagsBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    Object.values(FLAG_KEYS).forEach((k) => localStorage.removeItem(k));
    loadFlags();
  });
}

loadFlags();

// ---------- Lab 1 – Error-based ----------
const errorInput = document.getElementById("sqliErrorInput");
const errorOutput = document.getElementById("sqliErrorOutput");

document.getElementById("sqliErrorBtn").addEventListener("click", () => {
  const value = (errorInput.value || "").trim();
  const base = "SELECT * FROM products WHERE id = ";
  let html = "";

  if (!value) {
    html = "<p>Please enter a value.</p>";
  } else if (value.includes("' OR 1=1")) {
    html = `
      <p><strong>Simulated query:</strong><br>
      <code>${base}${value};</code></p>
      <p>Query executed successfully. Multiple rows returned – your payload forced the condition to always be TRUE.</p>
      <p class="flag">FLAG{ERROR_BASED_SI_DEMO}</p>`;
    setFlag(FLAG_KEYS.error);
  } else if (value.includes("'")) {
    html = `
      <p><strong>Simulated query:</strong><br>
      <code>${base}'${value}';</code></p>
      <p><strong>Simulated error:</strong> SQL syntax error near <code>'</code>.</p>
      <p class="muted small">In real applications, such errors may reveal database type and query structure.</p>`;
  } else {
    html = `
      <p><strong>Simulated query:</strong><br>
      <code>${base}${value};</code></p>
      <p>Result: 1 row returned (normal behaviour).</p>`;
  }

  errorOutput.innerHTML = html;
});

// ---------- Lab 2 – Boolean-based ----------
const boolInput = document.getElementById("sqliBoolInput");
const boolOutput = document.getElementById("sqliBoolOutput");

document.getElementById("sqliBoolBtn").addEventListener("click", () => {
  const value = (boolInput.value || "").trim();
  let html = "";

  if (!value) {
    html = "<p>Please enter a condition.</p>";
  } else if (value.includes("AND 1=1")) {
    html = `
      <p>Condition evaluated to <strong>TRUE</strong>.</p>
      <p>Record exists. Your injected condition did not change the result.</p>
      <p class="flag">FLAG{BOOLEAN_BASED_TRUE_BRANCH}</p>`;
    setFlag(FLAG_KEYS.bool);
  } else if (value.includes("AND 1=2")) {
    html = `
      <p>Condition evaluated to <strong>FALSE</strong>.</p>
      <p>No matching record returned.</p>`;
  } else {
    html = `
      <p>Baseline request. Simulated condition behaves as normal.</p>
      <p class="muted small">Try payloads like <code>1) AND 1=1--</code> or <code>1) AND 1=2--</code>.</p>`;
  }

  boolOutput.innerHTML = html;
});

// ---------- Lab 3 – Time-based ----------
const timeInput = document.getElementById("sqliTimeInput");
const timeOutput = document.getElementById("sqliTimeOutput");

document.getElementById("sqliTimeBtn").addEventListener("click", () => {
  const value = (timeInput.value || "").trim();
  const start = performance.now();
  let delay = 300;

  if (/sleep\s*\(\s*5\s*\)/i.test(value) || /waitfor\s+delay/i.test(value)) {
    delay = 5000;
  }

  timeOutput.innerHTML = "<p>Sending simulated request…</p>";

  setTimeout(() => {
    const end = performance.now();
    const ms = Math.round(end - start);
    let html = `<p>Response received. Measured time: <strong>${ms} ms</strong>.</p>`;

    if (delay >= 5000) {
      html += `
        <p>Your payload triggered an intentional delay, simulating a time-based SQLi condition.</p>
        <p class="flag">FLAG{TIME_BASED_DELAY_CONFIRMED}</p>`;
      setFlag(FLAG_KEYS.time);
    } else {
      html += `
        <p>No delay detected. Try adding <code>; SLEEP(5)--</code> or 
        <code>; WAITFOR DELAY '0:0:5'--</code> to your input.</p>`;
    }

    timeOutput.innerHTML = html;
  }, delay);
});