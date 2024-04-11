document.getElementById('abririmg').addEventListener('click', function() {
    

    if(document.getElementById('imagemcontainer').style.display == 'block'){
        document.getElementById('imagemcontainer').style.display = 'none';
    }
    else{
        document.getElementById('imagemcontainer').style.display = 'block'
    }
});