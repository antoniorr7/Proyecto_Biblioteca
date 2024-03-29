import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';

export class VistaEditarAutor extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.datos = new ModeloAutor();
    
  }

  

  rellenar(autor, controlador) {
    
    // Verificar si el formulario está dentro del div con id 'divEditarAutor'
    const divEditarAutor = document.getElementById('divEditarAutor');
    if (!divEditarAutor) {
        console.error("No se encontró el div 'divEditarAutor'");
        return;
    }
    //lenar el campo id
    const idInput = divEditarAutor.querySelector('#id');
    if (idInput) {
      idInput.value = autor.id;
  }
    // Llenar el campo de nombre
    const nombreInput = divEditarAutor.querySelector('#nombre');
    if (nombreInput) {
        nombreInput.value = autor.nombre;
    }

    // Llenar el campo de fecha de nacimiento
    const fechaNacimientoInput = divEditarAutor.querySelector('#fechaNacimiento');
    if (fechaNacimientoInput) {
        fechaNacimientoInput.value = autor.fechaNacimiento;
    }

    // Llenar el campo de fecha de fallecimiento
    const fechaMuerteInput = divEditarAutor.querySelector('#fechaMuerte');
    if (fechaMuerteInput) {
        fechaMuerteInput.value = autor.fechaMuerte;
    }

    // Llenar el campo de nacionalidad
    const nacionalidadInput = divEditarAutor.querySelector('#nacionalidad input');
    if (nacionalidadInput) {
        nacionalidadInput.value = autor.nacionalidad;
    }

    // Llenar el campo de biografía
    const biografiaTextarea = divEditarAutor.querySelector('#biografia textarea');
    if (biografiaTextarea) {
        biografiaTextarea.value = autor.biografia;
    }
// Llenar el campo de foto
const foto = divEditarAutor.querySelector('#retrato');
if (autor.foto) {
    // Supongamos que tienes una imagen en base64, puedes asignarla al atributo 'src' de un elemento 'img'.
    foto.innerHTML = `<img src="${autor.foto}" alt="Retrato del autor" style='width:100px; height:auto; object-fit:cover; border-radius:5px; margin-bottom:10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);' >`;
}

const nuevoRetratoInput = divEditarAutor.querySelector('#nuevoretrato');
if (nuevoRetratoInput) {
    nuevoRetratoInput.addEventListener('change', function (event) {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgElement = foto.querySelector('img');
                imgElement.src = e.target.result; // Asignar la nueva imagen en base64 al 'src' del elemento 'img'.
            };

            reader.readAsDataURL(file);
        }
    });
}

    
  const enviar =divEditarAutor.querySelector('#submit')
  enviar.onclick = () => {
    const autorData = {
      
      id: divEditarAutor.querySelector('#id').value,
      nombre: divEditarAutor.querySelector('#nombre').value,
      fechaNacimiento: divEditarAutor.querySelector('#fechaNacimiento').value,
      fechaMuerte: divEditarAutor.querySelector('#fechaMuerte').value,
      nacionalidad: divEditarAutor.querySelector('#nacionalidad input').value,
      biografia: divEditarAutor.querySelector('#biografia textarea').value,
      foto: divEditarAutor.querySelector('#retrato img').getAttribute('src'),
      
  };
    this.enviarAutor(autorData);
    controlador.pulsarAutor()
  };
  }

 
 enviarAutor(autor){
  
  this.datos.editarAutor(autor)
 }

}
