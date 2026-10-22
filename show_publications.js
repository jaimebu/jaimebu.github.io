fetch('publications.json')
	.then(response => response.json())
	.then(data => {

		html = data.publications.map(entry => {
			return insertPublication(entry);
		}).join('');
		document.getElementById('publications').innerHTML = html;

	})
	.catch(error => console.error('Error:', error));



function insertPublication(data) {
	return `
		<div class="publication">
			<div class="pub-icontainer">
				<a href="${data.url}" target="_blank">
					<image class="pub-icon"src="${data.id}.png" alt="Paper icon" style="width: 10em;"></image>
				</a>
			</div>
			<div class="pub-content">
				<div class="text-sz-9 text-wg-500 text-color-body">
					${data.year} - ${data.type}
				</div>
				<div class="text-sz-9 text-wg-500 text-color-body text-italic">
					${data.conference}
				</div>
				<div class="text-color-body mg-y-5 text-sz-15 text-wg-700">
					<a href="${data.url}" class="color-body hover-color-secondary" target="_blank">${data.title}</a>
				</div>
				<div class="authors text-sz-10 text-wg-300 text-color-body mg-t-5">
					${data.authors.map(author => {
						if (author.me) {
							return `<span class="text-wg-500">${author.name}</span>`;
						} else {
							return `<a href="${author.url}" class="text-wg-300 hover-text-wg-500 color-body hover-color-secondary" target="_blank">${author.name}</a>`;
						}
					}).join(', ')}
				</div>
				${data.notes && data.notes.length > 0 ? data.notes.map(note => {
					return `
						<div class="note text-sz-9 text-wg-500 mg-t-5" style="color:var(--${note.color});">
							<i class="${note.icon}"></i> ${note.text}
						</div>
					`;
				}).join('') : ''}
				${data.tags && data.tags.length > 0 ? `<div class="tag text-sz-9 text-wg-500 mg-t-5 color-body d-flex gap-5">
					${data.tags.map(tag => {
						if (!tag.link) {
							return `<span class="button pubbutton text-wg-700 dark-text text-center align-content-center ${tag.color}-button">${tag.name}</span>`;
						}
						return `
							<a href="${tag.link}" class="button pubbutton text-wg-700 dark-text text-center align-content-center ${tag.color}-button">${tag.name}</a>
						`;
					}).join('')}
				</div>` : ''}
			</div>
		</div>
	`;
}



// Funciona SIEMPRE - para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
	e.preventDefault();
	
	const targetId = this.getAttribute('href');
	
	// Manejar el caso de solo "#" (volver arriba)
	if (targetId === '#') {
	  window.scrollTo({
		top: 0,
		behavior: 'smooth'
	  });
	  return;
	}
	
	const targetElement = document.querySelector(targetId);
	
	if (targetElement) {
	  targetElement.scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	  });
	}
  });
});