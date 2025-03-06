# honeydospinner# Honey Do List Spinner

A fun, interactive wheel spinner for your honey-do list or any tasks you want to randomly select.

## Features

- **Customizable Task List**: Add, remove, and edit tasks directly from the interface
- **Bulk Edit Mode**: Quickly update multiple tasks at once
- **Fun Design**: Honey-themed with bee and honey jar emojis
- **Mobile Responsive**: Works on all device sizes
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Getting Started

### Option 1: GitHub Pages Setup

1. Create a new repository on GitHub
2. Upload all the files in this repository
3. Go to Settings > Pages
4. Select the branch you want to deploy (usually 'main')
5. Your site will be published at `https://yourusername.github.io/repositoryname/`

### Option 2: Local Setup

Simply download all files and open the `index.html` file in your browser.

## Files

- `index.html`: The main HTML structure
- `styles.css`: All styling for the project
- `script.js`: JavaScript functionality

## Customization

### Changing Default Tasks

Edit the `tasks` array in the `script.js` file to change the default tasks:

```javascript
let tasks = [
    "Your task 1",
    "Your task 2",
    // Add more tasks here
];
```

### Changing Colors

To modify the honey theme colors, edit the CSS variables at the top of the `styles.css` file:

```css
:root {
    --honey-yellow: #FFC107;
    --honey-light: #FFD54F;
    --honey-dark: #FFA000;
    --honey-pale: #FFECB3;
    --honey-brown: #5D4037;
}
```

## License

Feel free to use, modify, and distribute this project for personal or commercial use.

## Enjoy!

Have fun with your honey-do list spinner! 🐝🍯
