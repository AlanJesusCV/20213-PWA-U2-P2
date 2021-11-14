let contexSW = '/20213-PWA-U2-P2/sw.js';
let url = window.location.href;

let player = $('#player');
let photoUser = $('#photoUser');

let btnCamara = $('#btnCamara');
let btnCamaraBack = $('#btnCamaraBack');
let btnTakeFoto = $('#btnTakeFoto');

let texto = ""

const camera = new Camera(player[0])

btnCamara.on('click', () => {
    console.log('Camera front')
    texto = "Camara Frontal"
    camera.on()
    .then(result =>{
        if(!result){
            alert('Error al iniciar la camara');
        }
    })

})

btnCamaraBack.on('click', function() {
    console.log('Camera back')
    camera.onBack()
    texto = "Camara Trasera"


})

btnTakeFoto.on('click', () => {
    console.log('Camera off')
    camera.off()
    let photo = camera.take_photo()
    let img = create_img(photo, texto)
    $('#photo_list').append(img)

})

function create_img(image, texto) {

    let card = $(`
    <div class="mx-auto py-5">
        <img class="mx-auto rounded" style="width: 300px; height: 300px;" src="${image}">
        <h1 class="text-2xl font-thin pt-3 text-center">${texto}</h1>

    </div>
    `)

    return card
}

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        contexSW = '/sw.js'
    }

    navigator.serviceWorker.register(contexSW)
}