const fs= require('fs');
const loadData= require('./input.js');
let EuroZoneArray = loadData('input.txt');
let globalArr =[];
i=0;
EuroZoneArray.forEach((euroZone)=>{
	globalArr.push(euroZone.toDoLifeCycle());  
})
console.log(globalArr);
writeToFile(globalArr)

function writeToFile(arr) {
	let result = '';
	let caseNum = 1;
  
	arr.forEach(innerArr => {
	  result += `Case Number ${caseNum}\n\n`;
  
	  innerArr.forEach(obj => {
		result += `${obj.country} ${obj.days}\n`;
	  });
  
	  result += '\n';
	  caseNum++;
	});
  
	fs.writeFile('output.txt', result, (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
  }