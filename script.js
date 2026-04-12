(() => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const siteNav = document.getElementById("siteNav");
    const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
    const revealItems = document.querySelectorAll("[data-reveal]");
    const storedTheme = window.localStorage.getItem("saikumar-theme");
    const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    const closeMenu = () => {
        if (!siteNav || !menuToggle) {
            return;
        }

        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        if (themeToggle) {
            themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
        }
        window.localStorage.setItem("saikumar-theme", theme);
    };

    setTheme(storedTheme || (preferredLight ? "light" : "dark"));

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
            setTheme(nextTheme);
        });
    }

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    sectionLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const section = document.querySelector(targetId);
            if (!section) {
                return;
            }

            event.preventDefault();
            closeMenu();

            const headerOffset = 96;
            const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    if (revealItems.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    const trackedSections = Array.from(document.querySelectorAll("main section[id]"));
    if (trackedSections.length && sectionLinks.length) {
        const linkMap = new Map(sectionLinks.map((link) => [link.getAttribute("href"), link]));

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    sectionLinks.forEach((link) => link.classList.remove("is-active"));
                    const activeLink = linkMap.get(`#${entry.target.id}`);
                    if (activeLink) {
                        activeLink.classList.add("is-active");
                    }
                });
            },
            {
                threshold: 0.45,
                rootMargin: "-20% 0px -45% 0px"
            }
        );

        trackedSections.forEach((section) => sectionObserver.observe(section));
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (!siteNav || !menuToggle) {
            return;
        }

        const clickedInsideMenu = siteNav.contains(event.target) || menuToggle.contains(event.target);
        if (!clickedInsideMenu) {
            closeMenu();
        }
    });
})();
