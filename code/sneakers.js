import axios from 'axios';
import fs from 'fs';

const fetchData = async (page) => {
    const url = `http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=100`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const totalPages = 500;
const allData = [];

const fetchAllData = async () => {
    for (let page = 1; page <= totalPages; page++) {
        const response = await fetchData(page);

        if (response) {
            // Extraire uniquement les données de la réponse sans les métadonnées
            const data = response.data;

            if (data) {
                allData.push(data);
            }
        }
    }

    const jsonData = JSON.stringify(allData, null, 2);
    fs.writeFileSync('sneakerData.json', jsonData);
    console.log('All data saved to sneakersData.json');
};

fetchAllData();
