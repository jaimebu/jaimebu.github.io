fetch('publications.json')
	.then(response => response.json())
	.then(data => {
		let html = data.publications.map(entry => {
			return insertPublication(entry);
		}).join('');
		document.getElementById('publications').innerHTML = html;

		html = data.career.map(entry => {
			return insertCareerEntry(entry);
		}).join('');
		document.getElementById('career-record').innerHTML = html;

		html = data.conferences.map(entry => {
			return insertConference(entry);
		}).join('');
		blocks = document.querySelectorAll('#conference-entries');
		blocks.forEach(block => {
			block.innerHTML = html;
		});

		html = data.teaching.map(entry => {
			return insertTeachingEntry(entry);
		}).join('');
		blocks = document.querySelectorAll('#teaching-entries');
		blocks.forEach(block => {
			block.innerHTML = html;
		});

		html = data.reviewing_conference.map(entry => {
			return insertReviewingEntry(entry);
		}).join('');
		blocks = document.querySelectorAll('#reviewing-conferences');
		blocks.forEach(block => {
			block.innerHTML = html;
		});

		html = data.reviewing_journal.map(entry => {
			return insertReviewingEntry(entry);
		}).join('');
		blocks = document.querySelectorAll('#reviewing-journals');
		blocks.forEach(block => {
			block.innerHTML = html;
		});
	})
	.catch(error => console.error('Error:', error));


// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', distribuirBalanceado);

// Re-ejecutar si cambia el tamaño de la ventana (opcional)
let timeout;
window.addEventListener('resize', () => {
  clearTimeout(timeout);
  timeout = setTimeout(distribuirBalanceado, 300);
});


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





function insertCareerEntry(data) {
	return `
		<div class="publication">
			<div class="pub-icontainer">
				<image src="${data.id}.${data.file_format}" ${data.theme_responsive ? 'id='+data.id+'-theme' : ''} class="career-entry-icon"></image>
			</div>
			<div class="pub-content">
				<div class="studying_years text-sz-9">${data.years}</div>
				<div class="studies_title text-sz-15">${data.name}</div>
				<div class="studies_institution text-sz-10">${data.institution}</div>
			</div>
		</div>
	`;
}





function insertConference(data) {
	return `
		<table width="100%" class="mg-t-5">
			<tbody>
				<tr class="pd-t-10">
					<td class="text-align-right pd-r-10 align-middle width-30em" rowspan="2">${data.year}</td>
					<td class="width-auto">${data.name}</td>
				</tr>
				<tr class="text-align-right mg-y-20">
					<td class="text-sz-8 color-body"> ${data.contribution} | <a href="${data.url}" class="color-body hover-color-secondary" target="_blank">Link</a></td>
				</tr>
			</tbody>
		</table>
	`;
}





function insertTeachingEntry(data) {
	return `
		<table width="100%" class="mg-t-5">
			<tbody>
				<tr class="pd-t-10">
					<td class="text-align-right pd-r-10 align-middle width-10em" rowspan="3"><i class=${data.subject.includes("MSc") ? `"fas fa-star"` : `"far fa-star"`}></i></td>
					${data.url ? `<td class="width-auto"><a href="${data.url}" class="color-body hover-color-secondary" target="_blank">${data.name}</a></td>` : `<td class="width-auto">${data.name}</td>`}
				</tr>
				<tr class="text-align-right mg-y-20">
					<td class="text-sz-8 color-body text-wg-300">${data.subject}</td>
				</tr>
				<tr class="text-align-right mg-y-20">
					<td class="text-sz-8 color-body text-wg-300">${data.schedule}</td>
				</tr>
			</tbody>
		</table>
	`;
}





function insertReviewingEntry(data) {
	return `
		<table width="100%" class="mg-t-5">
			<tbody>
				<tr class="pd-t-10">
					<td class="text-align-right pd-r-10 align-middle width-10em" rowspan="3"><i class="fas fa-highlighter"></i></td>
					${data.url ? `<td class="width-auto"><a href="${data.url}" class="color-body hover-color-secondary" target="_blank">${data.name}</a></td>` : `<td class="width-auto">${data.name}</td>`}
				</tr>
				<tr class="text-align-right mg-y-20">
					<td class="text-sz-8 color-body text-wg-300">${data.schedule}</td>
				</tr>
			</tbody>
		</table>
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





function distribuirBalanceado() {
	const col1 = document.getElementById('profservice-col1');
	const col2 = document.getElementById('profservice-col2');
	const bloques = document.querySelectorAll('#profservice-base .profsvc');
	console.log(bloques)

	// Limpiar columnas
	col1.innerHTML = '';
	col2.innerHTML = '';

	// Variable para llevar la altura acumulada de cada columna
	let alturaCol1 = 0;
	let alturaCol2 = 0;

	bloques.forEach(bloque => {
		// Clonar el bloque para poder moverlo
		const clon = bloque.cloneNode(true);
		// Quitamos el display:none del clon
		clon.style.display = 'block';

		// Obtener la altura (desde data-altura o calculada)
		const altura = parseInt(bloque.dataset.altura) || 100;

		// Asignar a la columna con menos altura acumulada
		if (alturaCol1 <= alturaCol2) {
			col1.appendChild(clon);
			alturaCol1 += altura;
		} else {
			col2.appendChild(clon);
			alturaCol2 += altura;
		}
	});

	console.log("Altura columna 1:", alturaCol1);
	console.log("Altura columna 2:", alturaCol2);

	
}
