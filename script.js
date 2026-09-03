const repositoryList = document.querySelector("#repository-list");

function formatStars(stars) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories
    .map(
      (repository) => `
        <li class="repository">
          <h2>
            <a href="https://github.com/${repository.repository}" target="_blank" rel="noreferrer">
              ${repository.repository}
            </a>
          </h2>
          <p>${repository.description}</p>
          <div class="repository-meta">
            <span>${repository.language}</span>
            <span>${formatStars(repository.stars)} stars</span>
            <time datetime="${repository.starredAt}">Starred ${repository.starredAt}</time>
          </div>
        </li>
      `,
    )
    .join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = `<li class="status">Unable to load starred repositories.</li>`;
    console.error(error);
  }
}

loadRepositories();
