async function fetchSeriesByTitle(titulo) {
    const response = await fetch(`http://localhost:3000/series?titulo=${encodeURIComponent(titulo)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}

async function fetchSeriesByPage(page, limit) {
    const response = await fetch(`http://localhost:3000/series?pagina=${page}&limite=${limit}`);
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}

export { fetchSeriesByTitle, fetchSeriesByPage }