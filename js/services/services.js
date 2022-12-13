/* 
    Создаём функцию для запросов на сервер.
    Но так как это асинхронный код, нужно немного его доработать (async/await ES8)
    async - ставится перед функцией
    await - ставится перед операциями которые необходимо дождаться.
    Эта конструкция нужна для того чтобы вызывая функцию мы точно увидели результат полученный от сервера.
*/
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url);
    /* 
        Если fetch сталкивается с ошибкой в http статусе, это не будет ошибкой для fetch
        Ошибки для fetch:
        1) Отсутствие интернета
        2) критические неполадки в самом запросе.

        свойства промиса fetch:
        .ok - запрос выполнился и мы что-то получили
        .status - получаем http статус 200, 404, 501
    */
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
}

export {postData, getResource};