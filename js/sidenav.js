document.addEventListener("DOMContentLoaded", (event) => {
  //console.log("doc loaded");

  //Parallax.js
  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene);

  //Create opaque cover for content under sidenav
  var div = document.createElement("div");
  div.setAttribute("class", "opaque");

  //Click on user icon
  var u = document.getElementById("u");
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
  var h = document.getElementById("h");
  h.addEventListener("click", () => {
    openNav();
    //..add help content to sidenav
    if (document.getElementById("help").classList.contains("hide")) {
      document.getElementById("help").classList.remove("hide");
    }
    if(document.getElementById("user")) {
        document.getElementById("user").classList.add("hide");
    }
  });

  //Click on print icon
  var p = document.getElementById("p");
  if(p) {
    p.addEventListener("click", () => {
        window.print();
    });
  }

  //Click on download icon
  var d = document.getElementById("d");
  if(d) {
    d.addEventListener("click", ()=> {
      console.log('clikes on download');
      const doc = new jsPDF();
      const source = window.document.getElementsByClassName("resultlist")[0];
      //doc.text(20,20,'Hello world!');
      doc.fromHTML(source);
      // Save the PDF
      doc.save('pdf/test.pdf');
    });
  }

  //Click on close icon
  var close = document.getElementById("close");
  close.addEventListener("click", () => {
    console.log("klikkis");
    closeNav();
  });

  //Click on color icon
  var color = document.getElementById("color");
  color.addEventListener("click", () => {
    console.log("klikkis");
    document.getElementsByClassName("wrap")[0].classList.toggle("backanim");
  });
  

  function openNav() {
    document.getElementById("sidenav").classList.add("sidenavopen");
    document.body.appendChild(div);
    document
      .getElementsByClassName("opaque")[0]
      .addEventListener("click", function () {
        closeNav();
      });
  }

  function closeNav() {
    document.getElementById("sidenav").classList.remove("sidenavopen");
    if (!!document.getElementsByClassName("opaque")[0]) {
      document.body.removeChild(div);
    }
  }
});
