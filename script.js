const domainInput = document.getElementById("domainInput");
const rootInput = document.getElementById("rootInput");
const portInput = document.getElementById("portInput");
const configOutput = document.getElementById("configOutput");
const copyBtn = document.getElementById("copyBtn");
const copyStatus = document.getElementById("copyStatus");

function generateConfig() {
  const domain = domainInput.value.trim() || "example.local";
  const root = rootInput.value.trim() || "/var/www/html";
  const port = portInput.value.trim() || "80";

  configOutput.textContent = `server {
    listen ${port};
    listen [::]:${port};

    server_name ${domain};
    root ${root};
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}`;
}

[domainInput, rootInput, portInput].forEach((el) => el.addEventListener("input", generateConfig));

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(configOutput.textContent);
  copyStatus.textContent = "Copied!";
  setTimeout(() => (copyStatus.textContent = ""), 2000);
});

generateConfig();