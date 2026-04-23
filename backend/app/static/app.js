const statusEl = document.getElementById("status");
const gridEl = document.getElementById("emailGrid");
const refreshBtn = document.getElementById("refreshBtn");

function createCard(email, index) {
  const card = document.createElement("article");
  card.className = "card";

  const title = email.subject || `Email #${index + 1}`;
  const body = email.body || email.text || "No preview available.";

  card.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
    <div class="meta">ID: ${email.id ?? "n/a"}</div>
  `;

  return card;
}

async function loadEmails() {
  statusEl.textContent = "Loading emails...";
  gridEl.innerHTML = "";

  try {
    const response = await fetch("/emails");
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const payload = await response.json();
    const emails = payload.emails || [];

    if (emails.length === 0) {
      statusEl.textContent = "No emails found in the database.";
      return;
    }

    statusEl.textContent = `Loaded ${emails.length} email(s).`;
    emails.forEach((email, index) => gridEl.appendChild(createCard(email, index)));
  } catch (error) {
    statusEl.textContent = `Unable to load emails: ${error.message}`;
  }
}

refreshBtn.addEventListener("click", loadEmails);
loadEmails();
