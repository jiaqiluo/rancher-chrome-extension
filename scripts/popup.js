
const nodes = document.querySelectorAll("tr.main-row.has-sub-row")

if (nodes){
    for (let i = 0; i < nodes.length; i++) {
        let t = nodes[i].querySelector("td span a")
        console.log(t.innerHTML)

    }
    console.log(nodes)

    const template = document.getElementById('li_template');
    const elements = new Set();
}

