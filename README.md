# process-cycler
Simple nodejs cli tool to cycle script execution

This cli tool was born while I was looking for a solution to cycle and run multiple times a simple script I've made. There is nothing at the moment that will give this possibility and all the solutions available like PM2 or forever/forever-monitor are created to do different thing. 

The tool will spawn multiple child processes of the target script you want to cycle and will run it until the desired cycles number is reached. To spawn child processes, the tool will rely on the number of CPU cores available in your machine, in this way, all the workload is distributed across available CPU cores. 

Under the hood, the only dependency of this project is [inquirer](https://github.com/SBoudrias/Inquirer.js) that is providing a simple prompt to let you input the needed informations to start the tool. 

This project is a work in progress, if you found a bug please feel free to open an issue. 

#### USAGE

Download or clone this repository 
```
git clone https://github.com/realrecordzLab/process-cycler.git
```
Install dependencies
```
npm install
```
Start the tool 
``` 
node index.js
```   
   
