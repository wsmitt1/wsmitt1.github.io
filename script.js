
    document.addEventListener("DOMContentLoaded", () => {
        const projects = document.querySelectorAll(".project-card");
        const filterBtns = document.querySelectorAll(".filter-btn");

        // 1. Calculate and set the 'All' count
        document.getElementById("all-count").textContent = projects.length;

        // 2. Calculate and set individual tag counts dynamically
        filterBtns.forEach(btn => {
            const filter = btn.getAttribute("data-filter");
            if (filter !== "all") {
                let count = 0;
                projects.forEach(project => {
                    // If the project card contains a span with this specific class, increment
                    if (project.querySelector(`.tag.${filter}`)) {
                        count++;
                    }
                });
                btn.querySelector(".count").textContent = count;
                
                // Optional: Disable button if count is 0
                if(count === 0) {
                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                    btn.style.cursor = "not-allowed";
                }
            }
        });

        // 3. Filter functionality on click
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Ignore disabled buttons
                if(btn.disabled) return;

                // Update active button styling
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-filter");

                // Show/Hide projects
                projects.forEach(project => {
                    if (filter === "all") {
                        project.style.display = ""; // Resets to default CSS display
                    } else {
                        // Check if the project has the requested tag
                        if (project.querySelector(`.tag.${filter}`)) {
                            project.style.display = "";
                        } else {
                            project.style.display = "none";
                        }
                    }
                });
            });
        });
    });
