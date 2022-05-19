# wakeandfake

let names = []; document.querySelectorAll('.table').forEach(table => table.childNodes[5].childNodes.forEach(node => node.tagName === 'TR' && names.push(node.children[1].textContent))); console.log(JSON.stringify(names));
