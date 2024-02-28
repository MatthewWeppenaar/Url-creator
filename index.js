/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'

inquirer
  .prompt([{
    /* Pass your questions in here */
     name: 'url',
     message: 'Enter a url\n',
     type: 'input'
  }])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var qr_png = qr.image(answers.url,{type: 'png'});
    qr_png.pipe(fs.createWriteStream(`${answers.url}.png`));
    var png_string = qr.imageSync(answers.url, { type: 'png' });


    //console.log(png_string)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
        console.log("ERROR");
      // Something else went wrong
    }
  });