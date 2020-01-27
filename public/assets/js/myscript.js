function alerta(path) {
    var opcion = confirm("Desea eliminar permanentemente esta lámina?");
    if (opcion == true) {
        location.href = path
    }
}