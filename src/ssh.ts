import * as ssh from 'ssh-config';
import * as fs from 'fs';
import * as home from 'user-home';
import * as path from 'path';

export function updateConfig(name: string, port: number) {
    const configPath = path.join(home, ".ssh", "config");
    let config = new ssh();
    if (fs.existsSync(configPath)){
        const c = fs.readFileSync(configPath, 'utf8');
        config = ssh.parse(c);
    }
    
    config.remove({ Host: name });
    config.append({
        Host: name,
        HostName: 'localhost',
        User: 'root',
        Port: port,
        ForwardAgent: 'yes',
        StrictHostKeyChecking: 'no',
        UserKnownHostsFile: '/dev/null'
      });
    
    const content = ssh.stringify(config);
    fs.writeFileSync(configPath, content, { flag: 'w' });
    console.log(`generated config for ${name} in ${configPath}`)
}