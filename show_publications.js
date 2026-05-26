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
                <div class="year-and-type">
                    ${data.year} - ${data.type}
                </div>
                <div class="conference">
                    ${data.conference}
                </div>
                <div class="title">
                    <a href="${data.url}" class="title" target="_blank">${data.title}</a>
                </div>
                <div class="authors">
                    ${data.authors.map(author => {
                        if (author.me) {
                            return `<span class="me">${author.name}</span>`;
                        } else {
                            return `<a href="${author.url}" class="oneauthor" target="_blank">${author.name}</a>`;
                        }
                    }).join(', ')}
                </div>
            </td>
        </tr></tbody></table></div>
    `;
}