console.log('[rancher-chrome-extension] The extension works');

function getNodes(){
    let table = document.querySelector('table')
    if (table){
        return table.querySelectorAll('tr.main-row')
    }
}

function waitForNodes(){
    return new Promise( resolve => {
        let nodes = getNodes()
        if (nodes && nodes.length > 0){
            resolve(nodes)
        }

        let observer = new MutationObserver( mutations => {
            let nodes = getNodes()
            if (nodes && nodes.length > 0){
                resolve(nodes)
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        })

    })
}

waitForNodes().then((nodes) => {
    console.log('[rancher-chrome-extension] nodes are ', nodes)
    let currentUrl = window.location.origin;
    console.log('[rancher-chrome-extension] URL:', currentUrl)
    let buttons = document.querySelector(".bulk.bulk")
    // inject a button to the UI
    let bt = buttons.querySelector("button")
    if (bt) {
        console.log("[rancher-chrome-extension] cloning ...");
        let newButton = bt.cloneNode();
        newButton.textContent = "Download SSH Keys";
        newButton.setAttribute("disabled", "false")
        newButton.removeAttribute("disabled")
        newButton.setAttribute("id", "download-ssh-keys")

        newButton.onclick = function (){
            console.log("[rancher-chrome-extension] Click!");
        nodes.forEach((node) => {
            let name = node.querySelector('a[href]').innerHTML
            console.log("[rancher-chrome-extension] node name:", name);
            console.log("[rancher-chrome-extension] ", node);
            let link = currentUrl + "/v1/cluster.x-k8s.io.machines/fleet-default/" + name.trim() +'/sshkeys'
            console.log("[rancher-chrome-extension] ", link);
            chrome.runtime.sendMessage({url:link});
        })
        }

        buttons.prepend(newButton);
    }
    for (let i = 0; i < nodes.length; i++) {
        let t = nodes[i].querySelector("td span a");
        console.log(t.innerHTML);
    }
})


