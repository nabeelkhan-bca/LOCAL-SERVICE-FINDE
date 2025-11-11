function loadServices(filter = "") {
  const services = JSON.parse(localStorage.getItem("services")) || [];
  const tableBody = document.querySelector("#serviceTable tbody");
  tableBody.innerHTML = "";

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.skill.toLowerCase().includes(filter.toLowerCase()) ||
    s.area.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.skill}</td>
      <td>${s.area}</td>
      <td>
        <a href="tel:${s.phone}" class="call-btn">📞 कॉल</a> |
        <a href="https://wa.me/${s.phone}" class="call-btn">💬 WhatsApp</a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  if (filtered.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = <td colspan="4" style="color:#888;">कोई रिकॉर्ड नहीं मिला</td>;
    tableBody.appendChild(emptyRow);
  }
}

document.querySelector("#serviceForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const skill = document.getElementById("skill").value.trim();
  const area = document.getElementById("area").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !skill || !area || !phone) {
    alert("सभी जानकारी भरें!");
    return;
  }

  const services = JSON.parse(localStorage.getItem("services")) || [];
  services.push({ name, skill, area, phone });
  localStorage.setItem("services", JSON.stringify(services));

  e.target.reset();
  loadServices();
});

document.getElementById("searchBox").addEventListener("input", e => {
  loadServices(e.target.value);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const data = localStorage.getItem("services");
  if (!data) {
    alert("कोई डेटा नहीं मिला!");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "services_backup.json";
  a.click();
});

window.addEventListener("load", loadServices);
