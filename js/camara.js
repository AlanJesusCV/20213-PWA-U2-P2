class Camera {

    constructor(videoNode) {
        this.videoNode = videoNode
        this.stream = null
        this.photo = null
        console.log('Camara creada')
    }

    on() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.off()
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300
                }
            })
            .then( stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            })
            .catch( err => {
                console.log('Ocurrio un error al abrir la camara');
                console.log(err);
                return false
            })
        } else {
            console.log('No cuentas con dispositivos multimedia');
            return false
        }
    }

    onBack() {
        if (navigator.mediaDevices) {
            this.off();
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: {
                        exact: 'environment'
                    }
                },
            })
            .then( stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            })
            .catch( err => {
                console.log('Sucedio un error al abrir la camara');
           
                        alert('Error al iniciar la camara');
                 
                console.log(err);
                return false
            })
        } else {
            console.log('No cuentas con dispositivosw multimedia');
            return false
        }
    }

    off() {
        if (this.videoNode) {
            this.videoNode.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop()
                })
            }
        }
    }

    take_photo() {
        let canvas = document.createElement('canvas')
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)

        let context = canvas.getContext('2d')
        context.drawImage(this.videoNode, 0,0, canvas.width, canvas.height)

        this.photo = context.canvas.toDataURL()

        canvas = null
        context = null
        this.videoNode.removeAttribute('src')
        this.videoNode.load()

        return this.photo
    }

}