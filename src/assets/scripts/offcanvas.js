var container = document.querySelector('.cb-main-warp')
var btn9 = document.querySelector('#btn-9-balls')
var main = document.querySelector('body')
var navMain = false
if (container) {
  function toggleSidebar() {
    // isShowingSidebar() ? hideSidebar() : showSidebar();
    isShowingSidebar() ? hideSidebar() : showSidebar();
  }

  function showSidebar() {
    container.classList.add('show-sidebar')
    main.classList.add('block-scroll');
    if (!navMain) {
      navMain = document.querySelector('body > cb-main-warp > section.main > div.div-inferior > nav > ul')
      console.log(navMain);
      if (navMain) {
        if (navMain.classList.contains('cb-hidden')) {
          // navMain = navMain.outerHTML.removeAttribute('class')
          navMain = navMain.cloneNode(true)          
          navMain.classList.remove('cb-hidden')
          navMain = navMain.outerHTML
        } else {
          navMain = navMain.outerHTML
        }
      }



      if (document.querySelector('.cb-main-warp > div.auxiliar')) {
        var navAux = document.querySelector('body > div.cb-main-wrap > aside.sidebar-cb >div.auxiliar > ul').outerHTML
        document.querySelector('.sidebar-cb > nav.burger').innerHTML = ''
        document.querySelector('.sidebar-cb > nav.burger').innerHTML = navMain;
        document.querySelector('.sidebar-cb > nav.aux').innerHTML = ''
        document.querySelector('.sidebar-cb > nav.aux').innerHTML = navAux;
      }
    }
  }



  function hideSidebar() {
    container.classList.remove('show-sidebar');
    main.classList.remove('block-scroll');
  }

  function isShowingSidebar() {
    return container.classList.contains('show-sidebar');
  }

  document.querySelector('.hamburger').addEventListener('click', toggleSidebar, false);

  document.body.addEventListener('click', function (event) {
    let sideBar = document.querySelector('.sidebar-cb');
    if (isShowingSidebar() && !sideBar.contains(event.target)) {
      event.preventDefault();
      hideSidebar();
    }
  }, true);

  document.querySelector('.close-sidebar-cb').addEventListener('click', hideSidebar, false);
}

if (document.querySelector('.cb-main-wrap > .auxiliar')) {
  let observerNav = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          document.querySelector('.cb-main-warp > section.main').classList.add('cb-fixed-top')
          document.querySelector('body > div.cb-main-warp > section.main.cb-fixed-top > div > div.menu > ul').classList.add('cb-hidden')

          // testar para ver se existe
          // if(!document.querySelector('body > div.cb-main-wrap > nav > div.main > div > div.menu > a.cb')){
          //     let logo = document.querySelector('body > div.cb-main-wrap > header > div > div > a.cb').outerHTML
          //     document.querySelector('body > div.cb-main-wrap > nav > div.main > div > div.menu').insertAdjacentHTML('afterbegin', logo)
          // }else {
          //     document.querySelector('body > div.cb-main-wrap > nav > div.main > div > div.menu > a.cb').classList.remove('cb-hidden')
          // }

        } else {
          document.querySelector('.cb-main-warp > section.main').classList.remove('cb-fixed-top')
          document.querySelector('body > div.cb-main-warp > section.main > div > div.menu > ul').classList.remove('cb-hidden')

          // if(document.querySelector('body > div.cb-main-wrap > nav > div.main > div > div.menu > a.cb')){
          //     document.querySelector('body > div.cb-main-wrap > nav > div.main > div > div.menu > a.cb').classList.add('cb-hidden')
          // }
          // document.querySelector('body > div.cb-main-wrap > nav > div.main.cb-fixed-top > div > div.menu').insertAdjacentHTML('beforeend', logo)
        }
      });
    }
  );

  document.querySelectorAll('header.header').forEach(item => { observerNav.observe(item) });
}


