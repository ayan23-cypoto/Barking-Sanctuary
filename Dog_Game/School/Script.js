
window.addEventListener('scroll', function(){
    const text = document.getElementById('text1');
    let value = window.scrollY;
    text.style.top = 30 + value * -0.5 + '%';
});
