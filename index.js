function loadData(link) {
    try {
        fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
            .then(res => res.json())
            .then(data => displayShortLink(data.result))
    } catch {
        console.error('error', error);
    }
}
let allShortLinkArray = [];
function displayShortLink(data) {
    allShortLinkArray = [...allShortLinkArray, `${data.full_short_link}`];
    console.log(allShortLinkArray);
    const shortLinkContainer = document.getElementById('short-link-container');
    shortLinkContainer.style.display = 'flex';
    shortLinkContainer.style.flexDirection = 'column';
    shortLinkContainer.style.alignItems = 'center';
    shortLinkContainer.textContent = '';
    const link = document.createElement('p');
    link.setAttribute('id', 'short-link');
    link.innerHTML = `<a  href="${data.full_short_link}" target="_blank"> ${data.short_link}</a>`;
    const button = document.createElement('button');
    button.setAttribute('onclick', 'myFunction()');
    button.classList.add('btn');
    button.classList.add('btn-success');
    button.classList.add('ms-3');
    button.classList.add('text-success');
    button.innerText = 'Copy Link'
    const h4 = document.createElement('h4');
    h4.classList.add('text-danger');
    // console.log(h4);
    h4.innerHTML = "Short Link";
    shortLinkContainer.appendChild(h4);
    shortLinkContainer.appendChild(link);
    shortLinkContainer.appendChild(button);

}
document.getElementById('generate-btn').addEventListener('click', () => {
    const inputField = document.getElementById('input-field');
    const link = inputField.value;
    loadData(link);
    inputField.value = '';
})
document.getElementById('eye-btn').addEventListener('click', function () {
    const shortLinkContainer = document.getElementById('short-link-container');

    shortLinkContainer.style.display = 'flex';
    shortLinkContainer.style.alignItems = 'center';
    shortLinkContainer.style.flexDirection = 'column';
    shortLinkContainer.classList.add('bg-warning-subtle');
    shortLinkContainer.classList.add('w-25');
    shortLinkContainer.classList.add('mx-auto');
    shortLinkContainer.classList.add('p-4');
    shortLinkContainer.classList.add('rounded-3');

    shortLinkContainer.textContent = '';
    const h4 = document.createElement('h6');
    h4.classList.add('text-danger');
    // console.log(h4);
    h4.innerHTML = "All Short Links";
    shortLinkContainer.appendChild(h4);
    allShortLinkArray.forEach(item => {
        const p = document.createElement('p');
        p.innerHTML = `
        <a  href="${item}" target="_blank"> ${item}</a>
        
        `;
        shortLinkContainer.appendChild(p);
    })
})
function myFunction() {
    // Get the text field
    var copyText = document.getElementById("short-link");

    // // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.innerText);

    // Alert the copied text
    alert("Copied the text: " + copyText.innerText);
}