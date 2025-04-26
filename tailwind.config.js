module.exports = {
  theme: {
    extend: {
      animation: {
        // Add this to your existing animations
        glitch: "glitch 1s infinite",
      },
      keyframes: {
        // Add this to your existing keyframes
        glitch: {
          "0%": {
            transform: "translate(0)",
            textShadow: "0 0 transparent",
          },
          "10%": {
            transform: "translate(-2px, 2px)",
            textShadow: "-2px 2px rgba(var(--primary-rgb), 0.7)",
          },
          "20%": {
            transform: "translate(2px, -2px)",
            textShadow: "2px -2px rgba(var(--secondary-rgb), 0.7)",
          },
          "30%": {
            transform: "translate(-1px, -1px)",
            textShadow: "-1px -1px rgba(var(--primary-rgb), 0.7)",
          },
          "40%": {
            transform: "translate(1px, 1px)",
            textShadow: "1px 1px rgba(var(--secondary-rgb), 0.7)",
          },
          "50%": {
            transform: "translate(0)",
            textShadow: "0 0 transparent",
          },
        },
      },
    },
  },
};
