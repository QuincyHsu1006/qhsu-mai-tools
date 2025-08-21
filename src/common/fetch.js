export async function fetchPage(url) {
    try {
        const res = await fetch(url, { credentials: 'include' }).then(res => res.text());
        return new DOMParser().parseFromString(res, 'text/html');
    }
    catch (e){
        console.error('Error fetching page:', e);
        return null;
    }
}

export async function fetchJSON(url) {
    try{
        return await fetch(url).then(res => res.json());
    }
    catch (e) {
        console.error('Error fetching JSON:', e);
        return null;
    }
}