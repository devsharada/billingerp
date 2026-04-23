(function() {
  "use strict";
  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
   //* Easy event listener function
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }
  //Easy on scroll event listener 
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
//Navbar links active state on scroll
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)
//Scrolls to an element with header offset
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }
//Toggle .header-scrolled class to #header when page is scrolled
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }
//Back to top button
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
//Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
//Mobile nav dropdowns activate
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)
//Scrool with ofset on links with a class name .scrollto
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)
//Scroll with ofset on page load with hash links in the url
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

//feature slider
  new Swiper('.feature-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 1.5,
         centeredSlides: true,
        spaceBetween: 20
      }
    }
  });
//category slider
  new Swiper('.category-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      }
    }
  });
//invoice slider
  new Swiper('.invoice-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
       320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
       480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
//Blog slider
  new Swiper('.blog-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
//Testimonial slider
new Swiper('.testimonial-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter : true
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});
//Animation on scroll
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });
  //
})();

let k = new Swiper();

console.log('ok - ', k);

//
// const canvas = document.getElementsByTagName('canvas');
// if (canvas.length > 0) {
//     if (typeof (document.getElementById('form_name')) != 'undefined' && document.getElementById('form_name') != null) {
//         form_name = document.getElementById('form_name').value;
//     }
//     initCaptcha(form_name);
// }
// function generateCaptchaText(length = 5) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
//     let captchaText = '';
//     for (let i = 0; i < length; i++) {
//         captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return captchaText;
// }
//
function drawCaptcha(captchaText) {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    //array of text color
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    //
    //Generate random numbers between a given range
    const randomNumber = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '22px Arial';
    ctx.textBaseline = "middle";

    //
    for (let i = 0; i < captchaText.length; i++) {
        //
        const letterSpace = 110 / captchaText.length;
        const xInitialSpace = 7;
        //
        ctx.save();
        // Translate 0,0 to the point you want the text
        ctx.translate(xInitialSpace + i * letterSpace, randomNumber(12, 24));
        // Rotate context by -90 degrees
        if (i % 2 == 0)
            ctx.rotate(-16 * Math.PI / 180);
        else
            ctx.rotate(16 * Math.PI / 180);
        //
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }
//    
}

function initCaptcha(form_name) {
    const canvas = document.getElementsByTagName('canvas');
    if (canvas.length > 0) {
        const captchaText = generateCaptchaText();
        document.getElementById('captchaAns').value = '';
        document.getElementById('captchaValidIcon').classList.add("d-none");
        if (form_name != '') {
            sessionStorage.setItem(form_name, captchaText);
        }
        drawCaptcha(captchaText);
        var sessiondata = {'form_name': form_name, 'captchaText': captchaText};
        $.post('/session_data/index', sessiondata);
//    
    }
}

function checkCaptcha() {
    if (typeof (document.getElementById('form_name')) != 'undefined' && document.getElementById('form_name') != null) {
        form_name = document.getElementById('form_name').value;
    }
    const userInput = document.getElementById('captchaAns');
    var captchaValidIcon = document.getElementById("captchaValidIcon");
    const storedCaptchaText = sessionStorage.getItem(form_name);
    var captchaInvalid = document.getElementById('captchaInvalid');
    if (5 <= userInput.value.length)
    {
//        alert(userInput.value);
//        alert(storedCaptchaText);
        if (userInput.value === storedCaptchaText) {
            captchaValidIcon.classList.remove("d-none");
            captchaInvalid.innerText = '';
            return true;
        } else {
            captchaValidIcon.classList.add("d-none");
            captchaInvalid.innerText = 'Enter Valid Captcha Code';
            initCaptcha(form_name); // Refresh CAPTCHA on failure
            userInput.value = '';
            return false;
        }
    } else {
        captchaValidIcon.classList.add("d-none");
        return false;
    }
}

// Initialize the CAPTCHA on page load

function otpVlidationForm(submit_form_button, formName, controller, changeDivId, hostRoot)
{
    if (submit_form_button == 'verifyOtp')
    {
        if (formName == 'signForm')
        {
            user_otp1 = document.getElementById('otp1').value;
            user_otp2 = document.getElementById('otp2').value;
            user_otp3 = document.getElementById('otp3').value;
            user_otp4 = document.getElementById('otp4').value;
            user_otp_in = user_otp1 + '' + user_otp2 + '' + user_otp3 + '' + user_otp4;
            if (user_otp_in == null || user_otp_in == '')
            {
                invalid_div_id = document.getElementById('otpInvalid');
                document.getElementById('otpoperation').value = 'verifyOtp';
                return invalid_div_id.innerText = "Please Enter Correct OTP", !1;
            }
        } else {
            user_otp_in = document.getElementById('visitor_otp');
            otpInvalid = document.getElementById('otpInvalid');
            document.getElementById('otpoperation').value = 'verifyOtp';
            if (user_otp_in == null || user_otp_in == '')
            {
                invalid_div_id = document.getElementById('otpInvalid');
                document.getElementById('otpoperation').value = 'verifyOtp';
                return invalid_div_id.innerText = "Please Enter Correct OTP", !1;
            }
        }
    } else {
        if (formName == 'signForm')
        {
            user_mobile_in = document.getElementById('visitor_sign_mobile');
        } else {
            user_mobile_in = document.getElementById('visitor_mobile');
        }
        otpMobileInvalid = document.getElementById('otpMobileInvalid');
        if (user_mobile_in.value == null || user_mobile_in.value == '')
        {
            document.getElementById('otpoperation').value = 'resendOtp';
            return otpMobileInvalid.innerText = "Please Enter Mobile No ", !1;
        }
        document.getElementById('otpoperation').value = 'resendOtp';
    }
    if (formName == 'signForm')
    {
        document.getElementById('otpForm').submit();
    } else {
        custPhone = document.getElementById('visitor_mobile').value
        if (submit_form_button == 'verifyOtp')
        {
            var url = hostRoot + '' + controller + '?otpoperation=' + submit_form_button + '&visitor_mobile=' + custPhone + '&visitor_otp=' + user_otp_in.value;
        } else {
            var url = hostRoot + '' + controller + '?otpoperation=' + submit_form_button + '&visitor_mobile=' + custPhone;
        }
        changeDiv(url, changeDivId, custPhone)
    }
}
//

let demoFormAgree = document.getElementById('demo-form-agree');
let demoFormAgreeText = document.getElementById('demo-form-agree-text');

if(demoFormAgree){

  demoFormAgree.addEventListener('click', () => {
    if(demoFormAgree.checked){
      demoFormAgreeText.style.color = '#0E9F16';
    }else{
      demoFormAgreeText.style.color = '#444444';
    }
  })
  
}