fetch('publications.json')
	.then(response => response.json())
	.then(data => {

		// take only the first five elements from the list of news entries
		let html = data.news.map(entry => {
			return insertNewsEntry(entry);
		}).join('');
		document.getElementById('news-entries').innerHTML = html;

	})
	.catch(error => console.error('Error:', error));



function insertNewsEntry(data) {
	return `
		<table>
			<tbody>
				<tr class="pd-t-10">
					<td class="text-align-right pd-r-7 width-40em text-wg-700 color-main">${data.date}</td>
					<td class="width-auto"><p class="text-wg-400 mg-t-0">${data.body}</p></td>
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