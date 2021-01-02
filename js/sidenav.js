document.addEventListener("DOMContentLoaded", (event) => {
  //console.log("doc loaded");

  //Parallax.js
  let scene = document.getElementById('scene');
  let parallaxInstance = new Parallax(scene);

  //Create opaque cover for content under sidenav
  let div = document.createElement("div");
  div.setAttribute("class", "opaque");

  //Click on user icon
  let u = document.getElementById("u");
  if (u) {
    u.addEventListener("click", () => {
      openNav();
      //..add user form content to sidenav
      if (document.getElementById("user").classList.contains("hide")) {
        document.getElementById("user").classList.remove("hide");
      }
      document.getElementById("help").classList.add("hide");
    });
  }

  //Click on help icon
  let h = document.getElementById("h");
  h.addEventListener("click", () => {
    openNav();
    //..add help content to sidenav
    if (document.getElementById("help").classList.contains("hide")) {
      document.getElementById("help").classList.remove("hide");
    }
    /* if(document.getElementById("user")) {
        document.getElementById("user").classList.add("hide");
    } */
  });

  //Click on print icon
  let p = document.getElementById("p");
  if(p) {
    p.addEventListener("click", () => {
        window.print();
    });
  }

  //Click on download icon
  let d = document.getElementById("d");
  if(d) {
    d.addEventListener("click", ()=> {
      //console.log('clicks on download');
      const doc = new jsPDF();
      const source = window.document.getElementsByClassName("resultlist")[0];
      doc.fromHTML(source);
      // Save the PDF
      doc.save('pdf/test.pdf');
    });
  }

  //Click on close icon
  let close = document.getElementById("close");
  close.addEventListener("click", () => {
    console.log("klikkis");
    closeNav();
  });

  //Click on color icon
  /* let color = document.getElementById("color");
  color.addEventListener("click", () => {
    console.log("klikkis");
    document.getElementsByClassName("wrap")[0].classList.toggle("backanim");
  }); */

  //Write scores to podium
  let resultlist = document.getElementsByClassName("results");
  if (resultlist.length > 0) {
    for(let i = 0; i < 3; i++) {
      let name = resultlist[i].getElementsByTagName('p')[0].innerHTML.toUpperCase();
      if (i==0) {
        let first = document.getElementById('first');
        first.innerHTML = name;
      } else if (i==1) {
        let second = document.getElementById('second');
        second.innerHTML = name;
      } else if (i==2) {
        let third = document.getElementById('third');
        third.innerHTML = name;
      }
    }
  }
  
  //Check password length
  let pword = document.getElementById('pword');
  let rsubmit = document.getElementById('rsubmit');
  let pword2 = document.getElementById('pword2');
  if(rsubmit) {
    //Cannot send form until password is valid
    rsubmit.disabled = true;    
  }
  if(pword && pword2) {
    let instance = tippy(pword);
    let instance2 = tippy(pword2);
    instance.setContent('Min 8 tähemärki!');
    instance2.setContent('Salasõnad erinevad!');
    instance.setProps({ hideOnClick: false });
    instance2.setProps({ hideOnClick: false });
    pword.addEventListener('change', ()=>{
      instance.setProps({trigger:'click'});
      if (pword.value.length >= 8) {
        pword.classList.remove('redborder');
        instance.disable();
      } else if (pword.value.length < 8) {
        pword.classList.add('redborder');
        instance.enable();
        instance.show();
      }
    });
    //Check if passwords match
    pword2.addEventListener('change', ()=>{
      instance2.setProps({trigger:'click'});
      rsubmit.disabled = true;
      if (pword.value == pword2.value) {
        pword2.classList.remove('redborder');
        instance2.disable();
        if(pword2.value.length >= 8) {
          console.log(pword2.value);
          rsubmit.disabled = false;
        }
      } else {
        pword2.classList.add('redborder');
        instance2.enable();
        instance2.show();
      }
    });
  }
  
  
  

  //Disable 'Tulemused' button, when code hasn't been created
  let rbtn = document.getElementById("resultbtn");
  let cbtn = document.getElementById("createbtn");
  if(rbtn && cbtn) {
    rbtn.removeAttribute('href');
    rbtn.addEventListener('click', ()=>{
      if(cbtn.innerHTML=='<button>Loo kood</button>') {
        rbtn.innerHTML = 'Sa ei ole veel loonud koodi!';
      }
    });
    cbtn.addEventListener('click', ()=>{
      //Code should be generated here and written as cbtn inner HTML:
      cbtn.innerHTML = 'KOOD: 12345';
      rbtn.setAttribute('href', 'tulemused.html');
      rbtn.innerHTML = '<button>Tulemused</button>';
    });
  }
  

  //Open sidenav
  function openNav() {
    document.getElementById("sidenav").classList.add("sidenavopen");
    document.body.appendChild(div);
    document
      .getElementsByClassName("opaque")[0]
      .addEventListener("click", function () {
        closeNav();
      });
  }

  //Close sidenav
  function closeNav() {
    document.getElementById("sidenav").classList.remove("sidenavopen");
    if (!!document.getElementsByClassName("opaque")[0]) {
      document.body.removeChild(div);
    }
  }
});
