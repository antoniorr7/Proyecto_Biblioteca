import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js'; // Asegúrate de importar el modelo correcto
import { ModeloAutor } from '../models/modeloautor.js'; // Asegúrate de importar el modelo correcto

export class VistaEditarLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.datos = new ModeloObra(); // Asegúrate de instanciar el modelo correcto
  }

  rellenar(libro) {
    // Verificar si el formulario está dentro del div con id 'divEditarLibro'
    const divEditarLibro = document.getElementById('divEditarLibro');
    if (!divEditarLibro) {
      console.error("No se encontró el div 'divEditarLibro'");
      return;
    }

    // Llenar el campo de título
    const tituloInput = divEditarLibro.querySelector('#titulo');
    if (tituloInput) {
      tituloInput.value = libro.titulo;
    }

    // Llenar el campo de autor (puedes modificar este código según tus necesidades)
    const autorSelect = divEditarLibro.querySelector('[name="autor"]');
    if (autorSelect) {
        const modeloAutores = new ModeloAutor(); // Asegúrate de instanciar la clase ModeloAutores adecuada
    
        // Llamada al método mostrarAutores que debería devolver una lista de autores
        modeloAutores.mostrarAutor()
            .then(autores => {
                // Limpiar opciones existentes
                autorSelect.innerHTML = '<option value="prueba">Elige un Autor</option>';
    
                // Llenar el campo de autor con la lista de autores
                autores.forEach(autor => {
                    const option = document.createElement('option');
                    option.value = autor.id; // Asegúrate de ajustar la propiedad id según tu modelo
                    option.textContent = autor.nombre; // Asegúrate de ajustar la propiedad nombre según tu modelo
                    autorSelect.appendChild(option);
                });
    
                // Asignar el valor del libro.id_autor
                autorSelect.value = libro.id_autor;
            })
            .catch(error => {
                console.error('Error al obtener la lista de autores:', error);
            });
    }
    

    // Llenar el campo de fecha de publicación
    const fechaPublicacionInput = divEditarLibro.querySelector('#fecha');
    if (fechaPublicacionInput) {
      fechaPublicacionInput.value = libro.fecha_publicacion;
    }

    // Llenar el campo de descripción
    const descripcionTextarea = divEditarLibro.querySelector('#texto_desc');
    if (descripcionTextarea) {
      descripcionTextarea.value = libro.reseña;
    }



    // Llenar el campo de reseña
    const reseñaInput = divEditarLibro.querySelector('#reseña');
    if (reseñaInput) {
      reseñaInput.value = libro.reseña;
    }

    // Llenar el campo de género
    const generoSelect = divEditarLibro.querySelector('[name="genero"]');
    if (generoSelect) {
      generoSelect.value = libro.genero;
    }
    // Llenar el campo de portada (puedes adaptar esto según tus necesidades)
    const portadaDiv = divEditarLibro.querySelector('#portada');
    if (portadaDiv) {
        // Supongamos que tienes una imagen en base64, puedes asignarla al atributo 'src' de un elemento 'img'.
        portadaDiv.innerHTML = `<img src="${libro.portada}" alt="Portada del libro" style='width:100px; height:auto; margin-bottom:10px;  object-fit:cover; border-radius:5px; margin-bottom:10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);' >`;
    }
    
    // Evento para el botón de enviar
    const enviar = divEditarLibro.querySelector('#submit');
    enviar.onclick = () => {
        const portadaImg = divEditarLibro.querySelector('#portada img');
        const libroData = {
            id: libro.id,
            titulo: divEditarLibro.querySelector('#titulo').value,
            id_autor: divEditarLibro.querySelector('[name="autor"]').value,
            fecha_publicacion: divEditarLibro.querySelector('#fecha').value,
            descripcion: divEditarLibro.querySelector('#texto_desc').value,
            portada: portadaImg ? portadaImg.getAttribute('src') : '', // Obtener el atributo 'src' de la imagen
            reseña: divEditarLibro.querySelector('#reseña').value,
            genero: divEditarLibro.querySelector('[name="genero"]').value,
        };
  
        this.enviarLibro(libroData);
    };
    
  }

  enviarLibro(libro) {
    this.datos.editarObra(libro);
  }
}
