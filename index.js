const { Triangle, Square, Circle } = require('./lib/shapes')
const inquirer = require('inquirer');
const fs = require('fs'); 

function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter a max of three characters for the logo.',
            validate: (input) => input.length <= 3,
        },

        {
            type: 'input',
            name: 'textColor',
            message: 'Enter a color for the text of your logo. It can be a keyword or a hexidecimal value.',
        },

        {
            type: 'input',
            name: 'shape',
            message: 'Please select which shape you would like for your logo.',
            choices: ['Circle', 'Square', 'Triangle'],
        },

        {
            type: 'input',
            name: 'shapeColor',
            message: 'Please select a color for your shape. Again, it can be a keyword or hexidecimal value.',

        },
    ])
    .then((answers) => {
        if (answers.text.length > 3) {
          console.log("Must enter a value of no more than 3 characters");
          promptUser();
        } else {
          writeToFile("logo.svg", answers);
        }
      });
};

function writeToFile(fileName, answers) {
    let svgString = "";
    svgString =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${answers.shape}`;
  
    let shapeChoice;
    if (answers.shape === "Triangle") {
      shapeChoice = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
      shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      shapeChoice = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
  
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";
  
    fs.writeFile(fileName, svgString, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
  }

  promptUser();


