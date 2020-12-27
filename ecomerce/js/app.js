let divShoes = document.querySelector('#tarjeta');


addEventListener('DOMContentLoaded', banner);
addEventListener('DOMContentLoaded', shoes);


function banner() {

    const imagenes = ['./img/banner/banner1.jpg', './img/banner/banner2.jpg', './img/banner/banner3.jpg', './img/banner/banner4.jpg'];

    let i = 1;
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const progressBar = document.querySelector('#progres-bar');
    const divIndicadores = document.querySelector('#indicadores');
    let porcentaje_base = 100 / imagenes.length;
    let porcentaje_actual = porcentaje_base;

    //Crear Indicadores

    for (let index = 0; index < imagenes.length; index++) {
        const div = document.createElement('div');
        div.classList.add('circles');
        div.id = index;
        divIndicadores.appendChild(div);
    }


    progressBar.style.width = `${porcentaje_base}%`;
    img1.src = imagenes[0];
    const circulos = document.querySelectorAll('.circles');
    circulos[0].classList.add('resultado');

    const slideShow = () => {
        img2.src = imagenes[i];
        const circulo_actual = Array.from(circulos).find(el => el.id == i);
        Array.from(circulos).forEach(cir => cir.classList.remove('resultado'));
        circulo_actual.classList.add('resultado');

        img2.classList.add('active');
        i++;
        porcentaje_actual += porcentaje_base;
        progressBar.style.width = `${porcentaje_actual}%`;

        if (i == imagenes.length) {
            i = 0
            porcentaje_actual = porcentaje_base - porcentaje_base;
        }

        setTimeout(() => {
            img1.src = img2.src
            img2.classList.remove('active')
        }, 1000)
    }

    setInterval(slideShow, 4000);


}


async function shoes() {
    const respuesta = await fetch('./shoes.json');
    const datos = await respuesta.json();



    let divShoes = document.querySelector('#resultado-shoes');

    //let html = '';
    datos.forEach(data => {

        divShoes.innerHTML += ` 
            <div class="cards">   
                <div class='image-card'><img src='${data.src}' alt='${data.nombre}'></div>
                <div><h4>${data.nombre}</h4></div>
                <div><p>$ ${data.precio}</p></div>
                <div class="boton-shoes">
                    <input type="submit" value="Comprar"  data-id=${data.id}>
                </div>
            </div>
        `
    })


}