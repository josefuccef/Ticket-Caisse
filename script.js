JsBarcode(".barcode").init();

let alertMsg = document.querySelector('.alert');

let inputLeble = document.querySelector('.input-leble');
let inputQte = document.querySelector('.input-qte');
let inputPrix = document.querySelector('.input-prix');
let inputGenCode = document.querySelector('.input-gen');
let inputCaisse = document.querySelector('.input-caisse');
let btn = document.querySelector('.btn');

let section = document.querySelector('.section');

let ope = document.querySelector('.ope');

let total = document.querySelector('.total');

let totalShowQte = document.querySelector('.total-show');

let ttc = document.querySelector('.ttc');

let codeTicket = document.querySelector('.code-ticket');



//-------save data to localstorage-------

let dataInfo;

if (window.localStorage.produit != null) {
  dataInfo = JSON.parse(window.localStorage.produit);
} else {
  dataInfo = [];
}

//----------button create product------

btn.onclick = function(e) {
  
  if (inputLeble.value == '' || inputQte.value == '' || inputPrix.value == '' || inputGenCode.value == '' || codeTicket.value == '') {
      
      alertMsg.classList.remove('hide');
    
      e.preventDefault();
    
  }else{
      
  let produitInfo = {
    leble: inputLeble.value,
    qte: inputQte.value,
    prix: inputPrix.value,
    genCode: inputGenCode.value,
    caisse : inputCaisse.value,
    numTicket : codeTicket.value,
   }
  

  dataInfo.push(produitInfo);

  window.localStorage.setItem('produit', JSON.stringify(dataInfo));

  
  showData;

  }
};

//-------create New Data--------

showData();

function showData() {
  for (var i = 0; i < dataInfo.length; i++) {
    // Tab to edit
    section.innerHTML +=`
      <div class="col2 col3 p1 ">
      		<p class="gen">${dataInfo[i].genCode}</p>
      	  <p class="lebl">${dataInfo[i].leble}</p>
      	</div> 
      	<div class = "prix" >
      <p></p> 
      <p class = "Qte-prix-affiche"> ${dataInfo[i].qte} x ${dataInfo[i].prix}.00 DHS </p> 
      <p class = "prix-total"> ${dataInfo[i].qte * dataInfo[i].prix}.00 DHS</p> 
      </div> 
      </div>
    `
    ope.innerHTML = `Opérateur : 682- ${dataInfo[i].caisse}`;
    
    if (dataInfo[i].numTicket != null) {
      JsBarcode(".barcode", dataInfo[i].numTicket);
      codeTicket.value = dataInfo[i].numTicket;
      
    };
    
  }
  
};

//_________loop data array--------``

let totalPrix = [];
let totalQte = [];

for (var i = 0; i < dataInfo.length; i++) {

totalPrix.push(dataInfo[i].qte * dataInfo[i].prix);

let resultTotal =totalPrix.reduce((cur,el)=>{
  return cur + el ;
});

total.innerHTML = `${resultTotal}.00`;
ttc.innerHTML = `${resultTotal}.00`;

totalQte.push(dataInfo[i].qte);

let resultTotalQte = totalQte.reduce((cur, el) => {
  return +cur + +el;
  
});

totalShowQte.innerHTML = `Nb Article(s) : ${resultTotalQte}`;

};

//________scripte Date and time

// الحصول على التاريخ والوقت الحالي
const now = new Date();

// استخراج اليوم والشهر والسنة والوقت بالساعات والدقائق
const day = now.getDate();
const month = now.getMonth() + 1; // الأشهر تبدأ من 0، لذا نضيف 1
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();

// عرض النتيجة

document.querySelector('.date').innerHTML = `${day}/${month}/${year}  ${hours}:${minutes}`;

//_______script alert________

document.querySelector('.Cancel').onclick = (e)=>{
  alertMsg.classList.add('hide');
  
  e.preventDefault();
}

document.querySelector('.ok').onclick = (e) => {
  alertMsg.classList.add('hide');

  e.preventDefault();
};


//______________navBar_________


document.querySelector('.clear-data').onclick = ()=>{
  window.localStorage.clear();
  location.reload();
}

toggle = document.querySelectorAll(".toggle")[0];
nav = document.querySelectorAll("nav")[0];
toggle_open_text = 'Menu';
toggle_close_text = 'Close';

toggle.addEventListener('click', function() {
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    toggle.innerHTML = toggle_close_text;
  } else {
    toggle.innerHTML = toggle_open_text;
  }
}, false);

setTimeout(function() {
  nav.classList.toggle('open');
}, 800);


function printe() {
  // Tab to edit
  window.print();
}

