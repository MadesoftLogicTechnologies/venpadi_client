/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "640px",
        md: "880px",
        md2: "1150px",
        lg: "1400px",
      },
      colors: {
        // Venpadi brand — coral / orange-red (most prominent in signup UI)
        primary: "#FF4D17",
        "primary-light": "#FF8A00",
        "primary-dark": "#E03E0F",
        secondary: "#FF6B2C",
        // Neutrals from designs
        dark: "#0C0C0C",
        "dark-card": "#1A1A1A",
        header: "#111111",
        bodytext: "#666666",
        bodytext2: "#9CA3AF",
        bodytext3: "#CCCCCC",
        greybg: "#F9FAFB",
        whitebg: "#FFFFFF",
        border: "#E5E7EB",
        error: "#EF4A00",
        success: "#45B369",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #FF3B5C 0%, #FF8A00 100%)",
        "brand-gradient-soft":
          "linear-gradient(90deg, #FF4D17 0%, #FF8A00 100%)",
        "auth-glow":
          "radial-gradient(ellipse at 50% 40%, rgba(255, 77, 23, 0.18) 0%, transparent 65%)",
      },
      boxShadow: {
        auth: "0 8px 30px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
