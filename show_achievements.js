fetch('publications.json')
	.then(response => response.json())
	.then(data => {

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



function insertCareerEntry(data) {
	return `
		<div class="publication bd-rd-15">
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