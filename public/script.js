
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#46ec13",
                "background-light": "#f6f8f6",
                "background-dark": "#142210",
                "surface-dark": "#1c2b18", // Slightly lighter than background-dark for cards
                "text-secondary": "#a3b99d",
                "text-muted": "#a3b99d",
                "border-dark": "#2f4528",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif", "Noto Sans"],
                "body": ["Manrope", "Noto Sans", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px" },
        },
    },
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
}
