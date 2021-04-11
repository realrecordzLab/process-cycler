const { spawn, fork } = require('child_process');
const cores = require('os').cpus();

class ProcessCycler {

    constructor(config){
        this.script = String(config.scriptPath);
        this.maxCycles = Number(config.cycles);
        this.cores = cores.length;
        this.activeProcess = [];
        this.cycles = 0;
    }
    
    startExecution(){
        if( this.cycles === 0 ){
            //console.log(`Max CPU cores available: ${this.cores}.\nStarting ${this.cores} child process...`);
            console.log(`Starting script: ${this.script}`);
        }
        this.cycles++;
        console.log(`Executing cycle: ${this.cycles}`);

        spawn(process.execPath, [this.script], { 
            stdio: 'inherit'
        });
    // fix
        for(let i = 0; i < this.cores; i++){
            let childProcess = fork(this.script, {
                stdio: 'inherit',
            });
            this.activeProcess.push({process: childProcess});
            console.log(`Starting child process ${i} pid: ${childProcess.pid}`);
        }
        process.on('beforeExit', () => {
            this.cycleExecution();
        });
    }

    cycleExecution(){
        if( this.cycles < this.maxCycles ){
            for(let i = 0; i < this.activeProcess.length; i++){
                let childProcess = this.activeProcess[i].process;
                if( !childProcess.killed ){
                    console.log(`Killing child process: ${childProcess.pid}`);
                    childProcess.kill('SIGKILL');
                }
            }
            this.activeProcess = [];
            this.startExecution();
        } else {
            process.exit();
        }
    }

}

exports.ProcessCycler = ProcessCycler;