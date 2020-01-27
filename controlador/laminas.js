const axios = require('axios');


const getLaminas = async(min, max) => {

    let CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
    let FIREFOX_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1';
    let IE_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko';

    const instance = axios.create({
        baseURL: `https://bazarapi.herokuapp.com/Lamina?desde=${min}&limite=${max}`,
        method: 'GET',
        headers: { 'user-agent': IE_USER_AGENT }
    });
    const resp = await instance.get();

    const data = resp.data;
    return data;
}



const nuevaLamina = async(n1, n2, n3, n4) => {
    axios.post('https://bazarapi.herokuapp.com/Lamina', {
            numero: n1,
            nombre: n2,
            numero_seccion: n3,
            seccion: n4
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            return error;
        });
}

const eliminarLamina = async(ide) => {
    axios.delete('https://bazarapi.herokuapp.com/Lamina', {
            data: { id: ide }
        })
        .then(function(response) {
            return response.data
        })
        .catch(function(error) {
            return error;
        });
}


const actualizarLamina = async(ide, n1, n2, n3, n4) => {
    axios.put(`https://bazarapi.herokuapp.com/Lamina/${ide}`, {
            numero: n1,
            nombre: n2,
            numero_seccion: n3,
            seccion: n4
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            return error;
        });
}



module.exports = {
    getLaminas,
    nuevaLamina,
    eliminarLamina,
    actualizarLamina
}