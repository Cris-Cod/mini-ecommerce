let divShoes = document.querySelector('#tarjeta');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCuaros = document.querySelector('#resultado-shoes');
let articulosCarrito = [];


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
                    <a href="#" class="agregar-carrito" data-id=${data.id}>Comprar</a>
                </div>
            </div>
        `
    })


}


cargarEventListeners();

function cargarEventListeners() {
    listaCuaros.addEventListener('click', agrearItem);

    carrito.addEventListener('click', eliminarItem);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    vaciarCarrito.addEventListener('click', () => {

        articulosCarrito = [];

        limpiarHtml();
    })
}


function agrearItem(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const itemSeleccionado = e.target.parentElement.parentElement;
        leerDatosItem(itemSeleccionado);

    }
}

function leerDatosItem(item) {
    // console.log(item);

    const infoItem = {
        imagen: item.querySelector('img').src,
        nombre: item.querySelector('h4').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(item => item.id === infoItem.id);
    if (existe) {
        const items = articulosCarrito.map(item => {
            if (item.id === infoItem.id) {
                item.cantidad++;
                return item;
            } else {
                return item;
            }
        });
        articulosCarrito = [...items];
    } else {
        articulosCarrito = [...articulosCarrito, infoItem];
    }


    carritoHTML();

}

function carritoHTML() {

    limpiarHtml();

    articulosCarrito.forEach(item => {
        const { imagen, nombre, precio, id, cantidad } = item;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100%">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}>X</a>
            </td>
        `

        contenedorCarrito.appendChild(row);
    })

    agregarLocalStorge();

}

function agregarLocalStorge() {

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


function eliminarItem(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const itemId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(item => item.id !== itemId);

        carritoHTML();
    }

}


window.addEventListener('scroll', () => {

    const bannerS = document.querySelector('.banner-medio');
    const ubicacion = bannerS.getBoundingClientRect();

    //console.log(ubicacion);

    if (ubicacion.top < 500) {
        console.log('listo')
        bannerS.classList.add('active');
    } else {
        bannerS.classList.remove('active');
    }
})