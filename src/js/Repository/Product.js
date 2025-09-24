export function GetProducts(){
    const API_URL = 'https://fakestoreapi.com/products';

    let response = fetch(API_URL)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error('Error fetching products:', error));

    return response;
}