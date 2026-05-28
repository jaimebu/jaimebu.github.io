fetch('publications.json')
    .then(response => response.json())
    .then(data => {
        const html = data.publications.map(entry => {
            return generarHTML(entry);
        }).join('');
        document.getElementById('publications').innerHTML = html;
    })
    .catch(error => console.error('Error:', error));


function generarHTML(data) {
    return `
        <div class="publication"><table width="100%"><tbody><tr style="display: flex; align-items: center;">
            <td width="20%" class="pub-icontainer">
                <image class="pub-icon"src="${data.id}.png" alt="Paper icon" style="width: 100%;"></image>
            </td>
            <td width="80%" class="pub-content">
                <div class="text-sz-6 text-wg-500 text-color-body">
                    ${data.year} - ${data.type}
                </div>
                <div class="text-sz-6 text-wg-500 text-color-body text-italic mg-t-2">
                    ${data.conference}
                </div>
                <div class="text-color-body mg-bt-5 text-sz-10 text-wg-700">
                    <a href="${data.url}" class="color-body hover-color-light" target="_blank">${data.title}</a>
                </div>
                <div class="authors">
                    ${data.authors.map(author => {
                        if (author.me) {
                            return `<span class="text-wg-500">${author.name}</span>`;
                        } else {
                            return `<a href="${author.url}" class="text-wg-300 hover-text-wg-500 color-body hover-color-light" target="_blank">${author.name}</a>`;
                        }
                    }).join(', ')}
                </div>
            </td>
        </tr></tbody></table></div>
    `;
}