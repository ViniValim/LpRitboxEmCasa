function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('../svg', true, /\.svg$/));
requireAll(require.context('../images', true, /\.(png|jpe?g|gif)$/i));

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//

// let count = 1;
// document.getElementById("radio1").checked =true;

// setInterval (function (){
//     nextImage();
// }, 2000)

// function nextImage(){
//     count++;
//     if(count>5){
//         count = 1;
//     }
// document.getElementById("radio"+count).checked = true;

// }