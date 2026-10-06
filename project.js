document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.getElementById("projectGrid");

  if (projectGrid) {
    fetch("data/projects.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load JSON data");
        return response.json();
      })
      .then(projects => {
        projectGrid.innerHTML = ""; // Clear loader
        projects.forEach(project => {
          const cardHtml = `
            <div class="card">
              <h3>${project.title}</h3>
              <p style="color: var(--accent); font-weight: 600; margin: 0.5rem 0;">Client: ${project.client}</p>
              <p>${project.description}</p>
              <div style="margin-top: 1rem;">
                ${project.tags.map(tag => `<span class="badge" style="margin-right: 5px;">${tag}</span>`).join("")}
              </div>
            </div>
          `;
          projectGrid.innerHTML += cardHtml;
        });
      })
      .catch(error => {
        console.error(error);
        projectGrid.innerHTML = `<p style="color: red;">Error loading client projects.</p>`;
      });
  }
});