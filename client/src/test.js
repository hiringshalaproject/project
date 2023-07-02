const ResumeParser = require('./resume-parser/src');

const fileDir = "/Users/ankit.mishra/Documents/repos/project/client/src" + '/files/';
ResumeParser
  .parseResumeFile(fileDir + 'resume.txt', fileDir + 'compiled') //input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });

// ResumeParser.parseResumeUrl('https://hiringshala.s3.ap-south-1.amazonaws.com/1682876267409-ankit-mishra-cv-+2022.pdf') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.log('parseResume failed');
//     console.error(error);
//   });
