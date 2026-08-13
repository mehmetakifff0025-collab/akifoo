document.addEventListener("DOMContentLoaded", () => {

    const toolsContainer = document.getElementById("tools-container");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const searchInput = document.getElementById("tool-search");

    if (!toolsContainer || !sidebarMenu) {
        return;
    }


    // Kategori sırasını koru
    const categories = [];

    AKIFIO_TOOLS.forEach(tool => {
        if (!categories.includes(tool.category)) {
            categories.push(tool.category);
        }
    });


    function createToolCard(tool) {

        const card = document.createElement("a");

        card.className = "tool-card";

        if (tool.active) {
            card.href = tool.url;
        } else {
            card.href = "javascript:void(0)";
            card.classList.add("tool-disabled");
        }

        card.innerHTML = `
            <div class="tool-icon">
                ${tool.icon}
            </div>

            <h3>
                ${tool.name}
            </h3>

            <p>
                ${tool.description}
            </p>
        `;

        return card;
    }


    function renderTools(searchTerm = "") {

        toolsContainer.innerHTML = "";

        const search = searchTerm.trim().toLowerCase();

        categories.forEach(category => {

            const categoryTools = AKIFIO_TOOLS.filter(tool => {

                const matchesCategory = tool.category === category;

                const matchesSearch =
                    !search ||
                    tool.name.toLowerCase().includes(search) ||
                    tool.description.toLowerCase().includes(search);

                return matchesCategory && matchesSearch;
            });


            if (categoryTools.length === 0) {
                return;
            }


            const section = document.createElement("section");

            section.className = "category";


            const header = document.createElement("div");

            header.className = "category-header";


            const title = document.createElement("h2");

            title.className = "category-title";

            title.innerHTML = `
                <span class="category-dot"></span>
                ${category}
            `;


            header.appendChild(title);
            section.appendChild(header);


            const grid = document.createElement("div");

            grid.className = "tools-grid";


            categoryTools.forEach(tool => {
                grid.appendChild(createToolCard(tool));
            });


            section.appendChild(grid);

            toolsContainer.appendChild(section);

        });

    }


    function renderSidebar() {

        sidebarMenu.innerHTML = "";

        categories.forEach(category => {

            const title = document.createElement("div");

            title.className = "menu-title";

            title.textContent = category;

            sidebarMenu.appendChild(title);


            const categoryTools = AKIFIO_TOOLS.filter(
                tool => tool.category === category
            );


            categoryTools.forEach(tool => {

                const link = document.createElement("a");

                link.className = "menu-link";

                if (tool.active) {
                    link.href = tool.url;
                } else {
                    link.href = "javascript:void(0)";
                }

                link.innerHTML = `
                    <span class="menu-icon">
                        ${tool.icon}
                    </span>
                    ${tool.name}
                `;

                sidebarMenu.appendChild(link);

            });

        });

    }


    renderTools();
    renderSidebar();


    if (searchInput) {

        searchInput.addEventListener("input", () => {
            renderTools(searchInput.value);
        });

    }

});
