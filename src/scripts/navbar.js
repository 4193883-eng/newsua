export function toggleMenu(){
    document.querySelector('.navbar_hamburger').addEventListener('click', () => {
        document.querySelector('.navbar_menu').classList.toggle('menuActive')
    }) 
}